import{options} from './categories.js';

let meSection;
let takeVideo, selectVideo, settingsForPost, postButton, titleInput;
const contentMe = document.getElementById('content-me');
const categorySelector = document.createElement('select');
let categoryHTML = '<option value="">Please choose</option>';
const optionContainer = document.createElement('div');

export function createHTML (){
  contentMe.innerHTML = '';
  
  meSection = document.createElement('div');
  meSection.id = 'me-section';
  
  takeVideo = document.createElement('button');
  takeVideo.id = 'take-video';
  takeVideo.textContent = 'Take Video';
  takeVideo.onclick = () => window.openCamera(); //arrow function that means it should wait until it starts

  selectVideo = document.createElement('button');
  selectVideo.id = 'select-video';
  selectVideo.textContent = 'Select a video from the galerie';
  selectVideo.onclick = () => window.openGallery();
  
  settingsForPost = document.createElement('div');
  settingsForPost.id = 'settings-for-post';
  
  titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.id = 'title-input';

  postButton = document.createElement('button');
  postButton.id = 'post-button';
  postButton.textContent = 'Post';
  postButton.onclick = () => {
    const category = categorySelector.value;  //is getting the categorie
    
    const subSelects = optionContainer.querySelectorAll('select'); //get all subcategories

    const subCategories = Array.from(subSelects)
      .map(select => select.value)
      .filter(value => value !== "");

  if(window.currentVideoFile){
      window.uploadVideo(window.currentVideoFile, category, subCategories)
    }else{
      alert('Please select or take a Video first');
    }
  }
  window.makeDropdowns();
}

function makeDropdowns() {
  categorySelector.id = 'categorySelector';

  options.forEach(item =>{
    categoryHTML += '<option value="' + item[0][0] + '">' + item[0][0] + '</option>';
  });
  categorySelector.innerHTML = categoryHTML;

  optionContainer.id = 'option-container';
  optionContainer.innerHTML = ''; //delete everything in the Container
  
  categorySelector.addEventListener('change', (event) => {
  const selectedCategory = event.target.value;

  const categoryData = options.find(item => item[0][0] === selectedCategory); //find the right Data in the Array

  if(categoryData && categoryData.length > 1){  //only if there are subCategories build them
    for(let i = 1; i < categoryData.length; i++){
     
     const newSelect = document.createElement('select');
     let subHTML = '<option value="">Please choose</option>';

     categoryData[i].forEach(subName => {
       subHTML += '<option value="'+ subName + '">' + subName + '</option>';
     });

     newSelect.innerHTML = subHTML;
     optionContainer.append(newSelect);
    }
  }
  });
  window.appendHTML();
}
window.makeDropdowns = makeDropdowns;

function appendHTML() {
  settingsForPost.append(categorySelector,titleInput, optionContainer);
  meSection.append(takeVideo, selectVideo, settingsForPost, postButton);
  contentMe.append(meSection);
}
window.appendHTML = appendHTML;


function showVideoPreview(file) {
  window.currentVideoFile = file; //video we will need it when we cancel it so that the video is deleted
  
  //hide the page
  settingsForPost.style.display = 'none';
  takeVideo.style.display = 'none';
  selectVideo.style.display = 'none';
 
  //make a container for preview
  const previewContainer = document.createElement('div');
  previewContainer.id = 'preview-container';
  
  //make video element
  const video = document.createElement('video');
  video.src = URL.createObjectURL(file) //creating a link
  video.controls = true;
  video.style.width = '100%';
  video.style.maxHeight = '400px';

  //for cancelling the post 
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.onclick = () => {
    previewContainer.remove();
    settingsForPost.style.display = 'flex';
    takeVideo.style.display = 'block';
    selectVideo.style.display = 'block';
    window.currentVideoFile = null;
  }
  previewContainer.append(video, cancelButton);
  meSection.append(previewContainer);
}
window.showVideoPreview = showVideoPreview;
