// Für Storage (Datei hochladen)
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';
// Für Firestore (URL speichern)
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

function openCamera() {
  const videoInput = document.createElement('input')
  videoInput.type ='file';
  videoInput.accept = 'video/*, image/*' // nur Fotos und Videos
  videoInput.capture = 'environment'; //rückkamera öffnen
  
  videoInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) showVideoPreview(file);
  };
  videoInput.click();
}
function openGallery() {
  const videoInput = document.createElement('input')
  videoInput.type = 'file';
  videoInput.accept = 'video/*, image/*' // nur Fotos und Videos
  
  videoInput.onchange = (e) => {
    const file = e.target.files[0]; //nimm nur das erste
    if(file) showVideoPreview(file);
  };
  videoInput.click();
}

function showVideoPreview(file) {
  //Container leeren
  const meSection = document.getElementById('content-me');
  meSection.innerHTML = '';
  
  //Das video Element erstellen
  const video = document.createElement('video');
  video.src = URL.createObjectURL(file) //erstellt Link
  video.controls = true;
  video.style.width = '100%';
  video.style.maxHeight = '400px';
  
  //post Button erstellen
  postButton = document.createElement('button');
  postButton.textContent = 'Post'
  postButton.id = 'post-button';
  
  //get Category 
  const selectedCategory = categorySelector ? categorySelector.value : 'others';
  const selectedSubCategory = categorySubSelector ? categorySubSelector.value: "";
  
  //onclick
  postButton.onclick = () => postVideo(file, selectedCategory, selectedSubCategory); // arrow function wird erst ausgeführ wenn der Nutzer auf den Button klickt

  //in container einfügen
  meSection.append(video, postButton);
}
async function postVideo(file, category, subCategory){
  const storage = getStorage();
  const db = getFirestore(); // db steht für database
  
  try{
    //Datei in den Storage hochladen
    const storageRef = ref(storage, ˋvideos/${category}/${subCategory/${Date.now()}_${file.name}ˋ);    //upload
    await uploadBytes(storageRef, file); //get URL
    
    //den Link holen
    const downloadURL = await getDownloadURL(storageRef);
    
    //Nur den Link in Firestore zum sparen von Speicherplatz
    await addDoc(collection(db, 'videos'), {
      url: downloadURL,
      createdAt: Date.now(),
      category: category,
      subCategory: subCategory
    });
    
    alert('Video posted!');
    
  }catch(error){
    alert('Something went wrong' + error.message);
  }
}