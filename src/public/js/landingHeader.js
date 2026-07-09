// Get the button and menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

hamburgerBtn.addEventListener('click', function() {
  navMenu.classList.toggle('active');
});

document.addEventListener('click',(event) =>{
  const isClickInside = event.target.closest('.masthead');
  if (!isClickInside) {
    navMenu.classList.remove('active');
  }
});
window.addEventListener('resize', ()=> {
  if (window.innerWidth > 900) {
    navMenu.classList.remove('active');
  }
});
