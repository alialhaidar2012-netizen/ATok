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
let categorySelector, subCategorySelector;
const contentMe = document.getElementById('content-me');

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
  window.appendHTML();
}
window.createHTML = createHTML;

function appendHTML() {
  settingsForPost.append(categorySelector,subCategorySelector);
  meSection.append(takeVideo, selectVideo, settingsForPost);
  contentMe.append(meSection);
  window.makeFirstDropdown();
}
window.appendHTML = appendHTML;

function makeFirstDropdown() {
  options.forEach(item => {
    const categoryName = item[0][0]; // fängt bei sports an
    
    const option = document.createElement('option');
    option.value = categoryName;
    option.textContent = categoryName;
    
    categorySelector.append(option);
  }); 
  window.makeSecondDropdown();
}
window.makeFirstDropdown = makeFirstDropdown;

function makeSecondDropdown() {
  categorySelector.addEventListener('change', (event) => {
    const selectedCategory = event.target.value; //search selected Category
    
    subCategorySelector.innerHTML = '<option>Please choose a subcategory...</option>';
    
    let categoryData = options.find(item => item[0][0] === selectedCategory); //search the right subcategory
    if (categoryData && categoryData.length > 1){  //are there any subcategories?

    for(let i=1; i< categoryData.length; i++){
    const subcategories = categoryData[i]; // die Array in den anderen Array z.B. ["soccer", "badminton"]
      
      subcategories.forEach(subName => {
        const subOption = document.createElement('option');
        subOption.value = subName;
        subOption.textContent = subName;
        subCategorySelector.append(subOption);
      });
    }
      subCategorySelector.disabled = false; //activate it so that you can click
    }else{
      subCategorySelector.disabled = true; // if there arent any subcategories like fishing
    }
  });
}
window.makeSecondDropdown = makeSecondDropdown;

function makeThirdDropdown(){
    subCategorySelector.addEventListener('change', (event) => {
    const selectedSubCategory = event.target.value; //search selected subCategory
    
    subSubCategorySelector.innerHTML = '<option>Please choose another subcategory...</option>';
    
    let categoryData = options.find(item => item[0][0] === selectedSubCategory); //search the right subsubcategory
    if (categoryData && categoryData.length > 1){  //are there any subcategories?

    for(let i=2; i< categoryData.length; i++){
    const subcategories = categoryData[i]; //the array in the others e.g. ["soccer", "badminton"]
      
      subSubcategories.forEach(subName => {
        const subSubOption = document.createElement('option');
        subSubOption.value = subSubName;
        subSubOption.textContent = subSubName;
        subSubCategorySelector.append(subSubOption);
      });
    }
      subSubCategorySelector.disabled = false; //activate it so that you can click
    }else{
      subSubCategorySelector.disabled = true; // if there arent any subcategories like fishing
    }
  });
}
}
window.makeThirdDropdown = makeThirdDropdown;
