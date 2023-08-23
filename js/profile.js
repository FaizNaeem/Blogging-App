import { auth, db, storage } from "./firebase.mjs";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";





onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user.uid);
        console.log(user.email);
        const uid = user.uid;
  
            

        document.getElementById('inner').innerHTML = `
        <a href="" id="log">logout</a>`

        console.log(user.email);
        const q1 = query(collection(db, "signup"), where("email", "==", user.email));

        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let name = doc.data().first
            let last = doc.data().last
            let image = doc.data().url1
           
document.getElementById("userImage").src=image


            document.getElementById('name').innerHTML = `
                <p class="fw-bold text-light m-3">${name} </p>`

            document.getElementById('inza').innerHTML = `
                ${name + " " +last}`

            document.getElementById('change').innerHTML = `
                <input type="password" id="old" placeholder="Old password"><br>
                <input type="password" id="New" placeholder="New password"><br>
                <input type="password" id="Repeat" placeholder="Repeat password"><br>
                <button id="Update" onclick='udp("${doc.id}")'>Update password</button>
                `

            let password = doc.data().password;
            console.log(password);
          

            
            
            async function udp(e) {
                let old = document.getElementById('old');
                let New = document.getElementById('New');
                let Repeat = document.getElementById('Repeat');
                if (password == old.value) {
                    console.log('akjfjehjfej');
                    if (New.value == Repeat.value) {
                        console.log('hi');
                        alert('update successfully')
                        location.reload()
                                        }
                }
                else {
                    console.log('akhajhj');
                }
                console.log(e);
            }

            window.udp = udp
        
        })
        // ...
    } else {
        // User is signed out
        // ...
    }
});

document.getElementById('log').addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('singout successfully')
    }).catch((error) => {
        // An error happened.
    });
})