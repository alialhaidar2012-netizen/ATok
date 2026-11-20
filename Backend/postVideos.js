// Storage (upload videos)
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';
//Firestore (save URL)
import { getFirestore, collection, addDoc, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

import{auth} from './firebase.js';

function openCamera() {
  const videoInput = document.createElement('input')
  videoInput.type ='file';
  videoInput.accept = 'video/*, image/*' //only photos and videos
  videoInput.capture = 'environment'; //open backcamera
  
  videoInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) showVideoPreview(file);
  };
  videoInput.click();
}
window.openCamera = openCamera;

function openGallery() {
  const videoInput = document.createElement('input')
  videoInput.type = 'file';
  videoInput.accept = 'video/*, image/*' //only photos and videos
  
  videoInput.onchange = (e) => {
    const file = e.target.files[0]; //takes only the first
    if(file) showVideoPreview(file);
  };
  videoInput.click();
}
window.openGallery = openGallery;

async function uploadVideo(file, category, subSelects){
  const currentUser = auth.currentUser;

  //stops the function if you arent logged in 
  if(!currentUser){
    meSection.append(loginForm); 
    return;                     
  } 
  
  const storage = getStorage();
  const db = getFirestore(); // db means database

  try{
    //get username from the firestore
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    let username = "anonym";
    if(userDocSnap.exists()){
      username = userDocSnap.data().username;
    }
    
    //upload video in the storage
    const path = 'videos/' + category + '/' + subCategory+ Date.now() + '_'+ file.name;
    const storageRef = ref(storage, path);  //upload
    
    await uploadBytes(storageRef, file); //get URL
    //get the link
    const downloadURL = await getDownloadURL(storageRef);
    
    //only the link to save storage space
    await addDoc(collection(db, 'videos'), {
      name : file.name,
      url: downloadURL,
      createdAt: Date.now(),
      category: category,
      subCategory: subCategory,
      username: username,
      userId: currentUser.uid //UID for maybe other features
    });
    
    alert('Video posted!');
    window.createHTML();
    
  }catch(error){
    alert('Something went wrong' + error.message);
  }
}
window.uploadVideo = uploadVideo;
