import { auth, db, storage } from "./firebase.mjs";
import { onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";



onAuthStateChanged(auth, async(user) => {
    if (user) {
    //   async  function hello (){

    //         const q2 = query(collection(db, "signup"), where("email", "==", user.email));
    //         const querySnapshot2 = await getDocs(q2);
    //         querySnapshot2.forEach(async (doc1) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc1.id, " => ", doc1.data());
    //             let name1 = doc1.data().first
    //             console.log(name1);
    //             //    document.getElementById("name").innerHTML=`
    //             //    <p class="fw-bold text-light m-3">${name1}</p>`
    //             // console.log(user.uid);
    //             console.log(user.email);
    //         });
    //     }
    //     window.hello=hello
        document.getElementById('inner').innerHTML = `
        <a href="" id="log" onclick='log()'>logout</a>`
        document.getElementById('inner').addEventListener('click', () => {
            signOut(auth).then(() => {
                alert('singout successfully')
                window.location.href="../../html/login/login.html"
            }).catch((error) => {
                console.log(error);
                // An error happened.
            });
        })
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        document.getElementById('public-post').addEventListener('click', async () => {
            console.log('hello world');
            const q1 = query(collection(db, "signup"), where("email", "==", user.email));
            const querySnapshot1 = await getDocs(q1);
            querySnapshot1.forEach(async (doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                let name1 = doc.data().first
           document.getElementById("name").innerHTML=`
           <p class="fw-bold text-light m-3">${name1}</p>`
            let desc = document.getElementById('description');
            let title = document.getElementById('title');
            let img = document.getElementById('image').files;


            const storageRef = ref(storage, user.uid);
            // console.log(storageRef);

            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, img[0]).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(ref(storage, user.uid))
                    .then(async (url) => {
                        console.log(url);
                        let date = new Date().toDateString()
                        let date1 = new Date().toTimeString()
                        let concat = date + "  " + " " + date1.slice(0, 8)
                        console.log(concat);
                        let name = doc.data().first
                        console.log(name);
                        try {
                            const docRef = await addDoc(collection(db, "admin"), {
                                desc: desc.value,
                                title: title.value,
                                img: url,
                                date: concat,
                                email:user.email,
                                name:name
                                
                            }).then(() => {
                                location.reload();
                            })
                            console.log("Document written with ID: ", docRef.id)


                        } catch (e) {
                            console.error("Error adding document: ", e);
                        }
                    })
                    .catch((error) => {
                        // Handle any errors
                        console.log();
                    });
                });

            });
        })

        async function post() {

            // console.log(user.email);
            const q1 = query(collection(db, "signup"), where("email", "==", user.email));
            const querySnapshot1 = await getDocs(q1);
            querySnapshot1.forEach(async (doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data().first);
                let name = doc.data().first
                let id = doc.id
                // console.log(id);

                document.getElementById('name').innerHTML = `
                <p class="fw-bold text-light m-3">${name}</p>`

                const q = query(collection(db, "admin"), where("email","==", user.email));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
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
               <div class="btn d-flex">
                   <button type="button" class="btn  mt-4 mb-3 " style="color: #4834d4; font-weight: 600;" id="public-post" onclick='edit("${doc.id}")' data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                   <button type="button" class="btn mt-4 mb-3 " style="color: #4834d4; font-weight: 600;" id="public-post" onclick='dele("${doc.id}")'>Delete</button>
               </div>
              </div>
            </div>
            </div>`
                });

            });

        }
        post()
        window.post = post
        // ...



        async function edit(e) {
            console.log(e);
            const docRef = doc(db, "admin", e);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                let title1 = document.getElementById('title1').value = docSnap.data().title;
                let desc1 = document.getElementById('desc1').value = docSnap.data().desc;
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
            document.getElementById('btn-change').addEventListener('click', async () => {

                console.log(e);
                const washingtonRef = doc(db, "admin", e);

                // Set the "capital" field of the city 'DC'
                await updateDoc(washingtonRef, {
                    desc: desc1.value,
                    title: title1.value,

                }).then(() => {
                    alert('edit euccessfully');
                })
                location.reload()
            })
        }

        window.edit = edit



        async function dele(e) {
            console.log(e);
            await deleteDoc(doc(db, "admin", e)).then(() => {
                alert('delete successfully')
                location.reload()
            })
        }

        window.dele = dele

        // document.getElementById('inner').innerHTML = `
        // <a href="" id="log">logout</a>`

        
        

    } else {
        window.location.href='../../html/login/login.html'
        // User is signed out
        // ...
    }
});


