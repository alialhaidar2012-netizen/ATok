import{options} from 'categories.js';

const combinations = [];

function collectAllCombinations(){
//goes throw all combinations e.g. fashion.men.shoes fashion.men.shirts

  options.forEach(categoryBlock => {
    const mainCategory = categoryBlock[0][0];
    
    const subLevels = categoryBlock.slice(1); //all subCategories of the next level
    
    if (subLevels.length === 0){
      combinations.push(mainCategory);
    }else{
      buildCombinations(mainCategory, subLevels);
    }
  });
}
