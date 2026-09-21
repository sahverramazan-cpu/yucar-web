# YuCar — Sədaqət Sistemi (Vercel + Firebase versiyası)

Bu qovluqda 3 fayl var:
- `index.html` — **Satış paneli** (yalnız sizin üçün, şifrə ilə qorunur)
- `musteri.html` — **Müştəri portalı** (açıq link, hər kəs görə bilər)
- `firebase-config.js` — verilənlər bazası ayarları (bunu özünüz dolduracaqsınız)

Hər iki səhifə **eyni Firebase verilənlər bazasına** baxır. Siz satışa yeni yuma əlavə edəndə, müştərinin öz linkindəki məlumat da (səhifəni yeniləyəndə) avtomatik dəyişir.

---

## 1-ci addım: Firebase layihəsi yaradın (pulsuz, 3 dəqiqə)

1. [console.firebase.google.com](https://console.firebase.google.com) ünvanına daxil olun (Google hesabınızla).
2. **"Add project" / "Layihə əlavə et"** düyməsinə basın.
3. Layihəyə ad verin, məsələn `yucar-sadaqet`. Google Analytics təklif olunsa, "Enable" etməyə ehtiyac yoxdur — söndürə bilərsiniz.
4. Layihə yaranandan sonra, sol menyudan **Build → Firestore Database** seçin.
5. **"Create database"** basın → **"Start in production mode"** seçin → sizə yaxın bir region seçin (məsələn `eur3 (europe-west)`) → Enable.
6. Firestore açıldıqdan sonra yuxarıda **"Rules"** tabına keçin və mövcud mətni silib bunu yapışdırın:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

   **Diqqət:** bu qayda hər kəsə oxumaq/yazmaq icazəsi verir (çünki sadə sistemdə giriş/parol infrastrukturu yoxdur). Satış panelini `STAFF_PASSCODE` şifrəsi qoruyur, amma bu, əsl təhlükəsizlik deyil — kimsə brauzerin developer alətlərindən sizin Firebase açarlarınızı görə bilsə, nəzəri olaraq bazaya yaza bilər. Real biznes üçün böyüyəndə mənə deyin, Firebase Authentication (email+şifrə ilə əsl giriş) əlavə edərik. **"Publish"** basıb dəyişikliyi təsdiqləyin.

7. Sol yuxarıda dişli işarəsinə (⚙️) basın → **"Project settings"**.
8. Aşağı sürüşdürün, **"Your apps"** bölməsində **"</>"** (Web) ikonuna basın.
9. Tətbiqə ad verin (məs. `yucar-web`), **"Register app"** basın.
10. Sizə bir kod parçası göstəriləcək, içində `firebaseConfig = {...}` var. Həmin dəyərləri köçürün.

## 2-ci addım: `firebase-config.js` faylını doldurun

Bu qovluqdakı `firebase-config.js` faylını açın, Firebase-in sizə verdiyi dəyərləri bura yerləşdirin:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

İstəsəniz, eyni faylda `STAFF_PASSCODE` dəyərini də öz şifrənizlə əvəz edin (defolt: `yucar2026`).

## 3-cü addım: Vercel-ə yükləyin (pulsuz, 3 dəqiqə)

**Ən sadə yol (GitHub-sız):**
1. [vercel.com](https://vercel.com) saytına daxil olun, pulsuz hesab yaradın (Google və ya GitHub hesabınızla).
2. Dashboard-da **"Add New" → "Project"** basın.
3. Yuxarıda **"Deploy without Git"** və ya sürüşdürüb-buraxma (drag & drop) seçimi görəcəksiniz — bütün `yucar-web` qovluğunu (3 faylla birlikdə) oraya sürüşdürün.
4. Vercel avtomatik yükləyib sizə bir link verəcək, məsələn: `https://yucar-web.vercel.app`

**Alternativ (GitHub ilə, tövsiyə olunur, gələcəkdə dəyişiklik etmək asan olsun deyə):**
1. Bu 3 faylı yeni bir GitHub repozitoriyasına yükləyin (github.com-da "New repository" → faylları sürüşdürün).
2. Vercel-də **"Add New" → "Project"** → GitHub hesabınızı qoşun → repozitoriyanı seçin → **"Deploy"**.

## 4-cü addım: Linkləri paylaşın

Deploy bitdikdən sonra Vercel sizə bir domen verir, məsələn `https://yucar-web.vercel.app`. Buradan:

- **Satış paneli:** `https://yucar-web.vercel.app/index.html` (və ya sadəcə `https://yucar-web.vercel.app`)
- **Müştəri portalı:** `https://yucar-web.vercel.app/musteri.html`

`musteri.html` linkini müştərilərinizə göndərə bilərsiniz — istəyirsinizsə, öz domeninizi (`yucar.az`) da Vercel-ə qoşub `yucar.az/musteri` kimi qısa bir link edə bilərik (Vercel-in "Domains" bölməsindən, bunun üçün domeninizin DNS ayarlarına girməlisiniz — bunu da istəsəniz addım-addım göstərərəm).

## Necə işləyir?

- Siz `index.html`-də (şifrə ilə) satışı qeydə alırsınız → məlumat Firebase-ə yazılır.
- Müştəri `musteri.html`-ə girib ad+nömrə yazır → sistem Firebase-dən onun məlumatını oxuyur, göstərir: neçə yuma edib, neçə xalı var, 6-cı pulsuz yumaya nə qədər qalıb, bütün tarixçəsi bir sətirdə.
- Hər iki tərəf eyni bazaya baxdığı üçün, siz yeni satış əlavə edəndə, müştəri səhifəni yeniləyən kimi (və ya açıq saxlayıbsa avtomatik) yeni məlumatı görür.

## Sual olsa

Kodun məntiqi (satış, müştərilər, xal, 6-cı pulsuz yuma) əvvəlki Claude alətiylə demək olar eynidir — sadəcə verilənlər bazası Firebase-ə keçib ki, müştəri portalı açıq ola bilsin. Nəsə işləməsə və ya dəyişmək istəsəniz, mənə deyin.
