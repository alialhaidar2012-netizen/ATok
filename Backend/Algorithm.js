import{options} from 'categories.js';

const combinations = [];

function collectAllCombinations(){
//goes throw all combinations e.g. fashion.men.shoes fashion.men.shirts

  options.forEach(categoryBlock => {
    const mainCategory = categoryBlock[0][0];
    
    const subLevels = categoryBlock.slice(1);
    
    if (subLevels.length === 0){
      combinations.push(mainCategory);
    }else{
      buildCombinations(mainCategory, subLevels);
    }
  });
}

//recursion every time prefix gets larger first fashion then fashion.men, ...
function buildCombinations(prefix, levels){
  if (levels.length > 0){
  const currentLevel = levels[0];
  const remainingLevels = levels.slice(1); //go to the next section

  currentLevel.forEach(option => {
    buildCombinations(prefix+'.'+ option, remainingLevels) //write the paths
  });
  }else{
    combinations.push(prefix);
    return;
  }
}

collectAllCombinations();
console.log(combinations);
