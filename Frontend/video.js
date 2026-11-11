import{importVideoFromFirebase}.from ../Backend/getVideos.js
//get Elements
const videoContainer = document.getElementById("videoContainer");

//Listeners
videoContainer.addEventListener('scroll', () => {
  showNextVideo();
}, false);

async function showNextVideo() {
 const video = await importVideoFromFirebase();
 
 videoContainer.innerHTML=""; //leeren
 videoContainer.appendChild(video);
 try{
   await video.play();
 }catch(error){
   videoContainer.textContent = "Video not available";
 }
}
