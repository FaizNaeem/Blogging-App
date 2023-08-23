  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getAuth , } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
  import { getFirestore  }  from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
  import { getStorage  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDO_Nztzc6cAybb_U5WGraRDeqKs2lAGGY",
    authDomain: "hakathon-61e0d.firebaseapp.com",
    projectId: "hakathon-61e0d",
    storageBucket: "hakathon-61e0d.appspot.com",
    messagingSenderId: "778708771920",
    appId: "1:778708771920:web:532ce69382f83ac9a39d55",
    measurementId: "G-VG0B4HVV46"
  };

export  const app = initializeApp(firebaseConfig);
export  const analytics = getAnalytics(app);
export  const db = getFirestore(app);
export  const storage = getStorage(app);
export  const auth = getAuth(app);
