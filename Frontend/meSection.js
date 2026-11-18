import{options} from './Backend/categories.js';

let meSection;
let takeVideo, selectVideo, settingsForPost, postButton, titleInput;
const contentMe = document.getElementById('content-me');
const categorySelector = document.createElement('select');
let categoryHTML = '<option value="">Please choose</option>';
const optionContainer = document.createElement('div');
const contentMe = document.getElementById('content-me');

function createHTML (){
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
  postButton.onclick = () => window.postButton();
  
  window.makeDropdowns();
}
window.createHTML = createHTML;

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
