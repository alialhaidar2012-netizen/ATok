const options = [
  [["sports"], ["soccer", "football", "rugby", "boxing", "karate", "judo", "handball", "basketball", "tennis", "tabletennis", "badminton", "dancing", "yoga", "swimming", "gymnastics", "gym", "others"]],
  [["beauty"], ["men", "woman", "both"], ["hair", "skin", "nails", "others"]],
  [["fashion"], ["men", "woman", "both"], ["shirts", "shoes", "jackets", "sweaters", "socks", "hats", "others"]],
  [["life-hacks"], ["food", "clothes", "others"]],
  [["cooking"], ["breakfast", "lunch", "diner", "snack", "party meal", "big meal", "others"], ["fast-food", "asian-food", "oriental-food", "african-food", "aboriginal-food", "native american food", "arctic-food", "french-food", "indian-food", "italian-food", "german-food", "european-food", "latin-american-food", "mexican-food", "meat", "barbeque", "others"]],
  [["comedy"], ["Ai", "real"], ["immitations", "Plays", "differences between different Cultures", "differences between boys and girls", "about children", "about wives", "about husbands", "about friends", "about other cultures", "cats", "dogs", "birds", "fish", "other animals", "others"]],
  [["animals"], ["Ai", "real"], ["birds", "cats", "dogs", "monkeys", "hamsters", "guinea pigs", "fish", "others"]],
  [["fishing"]],
  [["hunting"]],
  [["celebrities"], ["musicians", "dancers", "gamers", "actors", "painters", "athletes", "Ronaldo", "Messi", "Lamine Jamal", "Mbappe", "Neymar", "Taylor Swift", "others"]],
  [["challenges"], ["food", "clothes", "sports", "others"]],
  [["tutorials"], ["coding", "crafts", "renovating", "others"]],
  [["music"], ["classic", "rock", "rap", "others"]],
  [["dancing"], ["flamenco", "freestyle", "hiphop", "ballett", "others"]],
  [["opinion"], ["politics", "religions", "celebrities", "others"]],
  [["others"]]
];

let meSection;
let takeVideo, selectVideo, settingsForPost, postButton, titleInput;
const contentMe = document.getElementById('content-me');
const categorySelector = document.createElement('select');
let categoryHTML = '<option value="">Please choose</option>';

function createHTML (){ 
  meSection = document.createElement('div');
  meSection.id = 'me-section';
  
  takeVideo = document.createElement('button');
  takeVideo.id = 'take-video';
  takeVideo.onclick = '';

  selectVideo = document.createElement('button');
  selectVideo.id = 'select-video';
  selectVideo.onclick = '';
  
  settingsForPost = document.createElement('div');
  settingsForPost.id = 'settings-for-post';
  
  titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.id = 'title-input';

  categorySelector = document.createElement('select');
  categorySelector.id = 'cagtegorySelector';
  
  subCategorySelector = document.createElement('select');
  subCategorySelector.id = "sub-category-selector";
  subCategorySelector.disabled = true; //zuerst ausschalten bis erste Kategorie gewählt wurde

  postButton = document.createElement('button');
  postButton.id = 'post-button';
  postButton.onclick = '';
  
  window.appendHTML();
}
window.createHTML = createHTML;

function makeDropdowns() {
  categorySelector.id = 'categorySelector';

  options.forEach(item =>{
    categoryHTML += ˋ<option value="${item[0][0]}">${item[0][0]}</option>ˋ;
  });
  categorySelector.innerHTML = categoryHTML;

  const optionContainer = document.createElement('div');
  optionContainer.id = 'option-container';
  optionConatiner.innerHTML = ''; //delete everything in the Container
  
  categorySelector.addEventListener('change', (event) => {
  const selectedCategory = event.target.value;

  const categoryData = options.find(item => item[0][0] === selectedCategory); //find the right Data in the Array

  if(categoryData && categoryData.length > 1){  //only if there are subCategories build them
    for(let i = 1; i < categoryData.length; i++){
     
     const newSelect = document.createElement('select');
     let subHTML = '<option value="">Please choose</option>';

     categoryData[i].forEach(subName => {
       subHTML += ˋ<option value='${subName}'>${subName}</option>ˋ;
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
  meSection.append(takeVideo, selectVideo, postButton, settingsForPost);
  contentMe.append(meSection);
}
window.appendHTML = appendHTML;
