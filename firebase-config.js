// ============================================================
// FIREBASE KONFİQURASİYASI
// Bu dəyərləri öz Firebase layihənizdən götürüb bura yapışdırın.
// (Firebase Console → Project settings → General → "Your apps" → Config)
// README.md faylında addım-addım izah var.
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyAituy2R9fxbhELVSEb-ak4sr3I-gRonuc",
  authDomain: "yucar-loyallity.firebaseapp.com",
  projectId: "yucar-loyallity",
  storageBucket: "yucar-loyallity.firebasestorage.app",
  messagingSenderId: "591621932418",
  appId: "1:591621932418:web:7e95e6bf2c5835d5e87b9b",
};

// Sadə giriş şifrəsi — YALNIZ satış panelini (index.html) təsadüfi keçənlərdən qorumaq üçündür.
// Real təhlükəsizlik deyil (kodun içində göründüyü üçün), amma link tapan hər kəsin
// birbaşa panelə girməsinin qarşısını alır. İstəsəniz dəyişin.
const STAFF_PASSCODE = "yucar2026";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
