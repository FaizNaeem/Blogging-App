import { auth, db, storage } from "./firebase.mjs";
import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";



onAuthStateChanged(auth, async(user) => {
    if (user) {
        console.log(user.uid);
        console.log(user.email);
        const uid = user.uid;

        document.getElementById('inner').innerHTML = `
        <a href="" id="log" onclick='log()'>logout</a>`
// console.log(use);
let email= user.email
        async function post() {

            console.log(user.email);
            const q1 = query(collection(db, "signup"),  );

            const querySnapshot1 = await getDocs(q1);
            querySnapshot1.forEach(async (doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data().first);
                let name1 = doc.data().first
       
                document.getElementById('name').innerHTML = `
                <div class="btn-group dropend">
                <button type="button" class="btn">
                  ${name1}
                </button>
                <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="visually-hidden">Toggle Dropright</span>
                </button>
                <ul class="dropdown-menu">
                  Dropdown menu links 
                </ul>
              </div>`

                const q = query(collection(db, "admin"), );

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                   let name = doc.data().name;
                    document.getElementById('root').innerHTML += `
                <div class="container mt-5">
                <div class="row">
                <div class="col-lg-10 blog">
               <div class="img d-flex">
                   <img src="${doc.data().img}" alt="">
                   <div class="text">
                       <h5 class="fw-bold">${doc.data().title}</h5>
                       <p>${name} <span>${doc.data().date}</span></p>
                   </div>
                   </div>
               <p class="mt-3 line">${doc.data().desc}</p>
              </div>
            </div>
            </div>`
                });

            });

        }
        post()
        window.post = post
        // ...
    } 
    else if (!user) {
        let us = user
        // console.log(us);
        const q1 = query(collection(db, "signup"), );

        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().first);
            // let name = doc.data().first

            // document.getElementById('name').innerHTML = `
            // <p class="fw-bold text-light m-3">${name}</p>`

            const q = query(collection(db, "admin"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let name = doc.data().name;
                document.getElementById('root').innerHTML += `
                
                <div class="container mt-5">
                <div class="row">
                <div class="col-lg-10 blog">
                <div class="img d-flex">
                <a href="./hi">
                <img src="${doc.data().img}" alt="">
                </a>
                <div class="text">
                <h5 class="fw-bold">${doc.data().title}</h5>
                <p>${name} <span>${doc.data().date}</span></p>
                </div>
                </div>
                <p class="mt-3 line">${doc.data().desc}</p>
                </div>
                </div>
                </div>
               
                `
            });

        });

        // User is signed out
        // ...
    }
});

function log(){
    signOut(auth).then(() => {
               alert('singout successfully')
            }).catch((error) => {
                // An error happened.
            });
}
window.log = log
let day = document.querySelector("#good")

function getGreeting() {
    const currentTime = new Date();
    const currentHour =currentTime.getHours()
console.log(currentHour);
    let greeting;

    if (currentHour <= 6 || currentHour>=17 ) {
        greeting = 'Good night ! 😴';
    } else if (currentHour>= 6 &&currentHour <= 11) {
        greeting = 'Good morning 🥱!';
    } else {
        greeting = 'Good afternoon 😊!';
    }

    return greeting;
}

const greeting = getGreeting();
day.innerText = greeting 