  const tabs = document.querySelectorAll('.nav-tab');
  const contents = document.querySelectorAll('.tab-content');
  const mainContent = document.querySelector('.main-content'); 

function takeActiveAway(tabName) {
  tabs.forEach(tab => tab.classList.remove('active')); //entferne active überall
  contents.forEach(content => content.classList.remove('active'));
  findButtonWithContent(tabName);
}
function findButtonWithContent(targetId) {
  const targetTab = document.getElementById('tab-'+targetId);
  const targetContent = document.getElementById('content-'+targetId);
  addActive(targetTab, targetContent);
}
function addActive(targetTab, targetContent) {
  if(targetTab &&  targetContent){
    targetTab.classList.add('active');
    targetContent.classList.add('active');
  }
}
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.id.replace('tab-', '');
    takeActiveAway(tabName);
  });
});



let touchStartX = 0;
let touchEndX = 0;

let distance = null;
const swipeThreshold = 50;

function findCurrentIndex() {
  const currentTab = document.querySelector('.nav-tab.active');
  const tabNames = ['for-you', 'search', 'abo', 'me'];
  let currentIndex = tabNames.indexOf(currentTab.id.replace('tab-', ''));
  checkLeftOrRight(currentIndex, tabNames);
}
function checkLeftOrRight(currentIndex, tabNames) {
  if (distance > swipeThreshold){
    if(currentIndex < tabNames.length-1){
    takeActiveAway(tabNames[currentIndex+1]); 
  }}
  
  if (distance < -swipeThreshold){
    if(currentIndex > 0){
    takeActiveAway(tabNames[currentIndex-1]); 
  }}
}

mainContent.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
mainContent.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  distance = touchStartX-touchEndX;
  if(distance > swipeThreshold || distance < -swipeThreshold) findCurrentIndex();
});