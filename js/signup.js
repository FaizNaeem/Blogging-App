import {auth,db,storage} from './firebase.mjs'
import { collection, addDoc ,getDocs ,doc,query, where}  from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { ref,getDownloadURL,uploadBytes } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

document.getElementById("btn").addEventListener("click",()=>{

let fname =document.getElementById("fname").value
let lname =document.getElementById("lname").value
let password =document.getElementById("pass").value
let email =document.getElementById("email").value
let rpass =document.getElementById("rpass").value
let file =document.getElementById("file").files[0]
// console.log(fname);
// const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
// Signed in 
.then(async(userCredential) => {
  if(fname.length <= 3||lname==''||password==''||email==''||rpass==''){
    
    
    alert("please maninum 3 value")
    
  }
  else if(password==rpass){
  
    const user = userCredential.user;
    // const storage = getStorage();
        const storageRef = ref(storage, user.uid);
    
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    setTimeout(()=>{

      getDownloadURL(ref(storage, user.uid))
    .then(async(url) => {
      url=url
     
      // const img = document.getElementById('myimg');
      // img.setAttribute('src', url);
  
   
    let data={
      first:fname,
      last:lname,
      password:password,
      email:email,
      repeat:rpass,
       url1: url
    }
  
  
      try {
          const docRef = await addDoc(collection(db, "signup"), {
  
            // url1:url1,
         ...data
         
          });
          // console.log("Document written with ID: ", docRef.id);
          Swal.fire({
              title: 'Singup Succes',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
          })
  //         setTimeout(()=>{
  // window.location.href="../login/login.html"
  //         },2000)
      } catch (e) {
          console.error("Error adding document: ", e);
      }
    })
    .catch((error) => {
    console.log(error);
      
    });
    },5000)
}
else{
    // alert("hi")
    document.getElementById("rpass").style.background="red"
}
    // ...
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
    // ..

  });
    
})