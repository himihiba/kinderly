// header shadow
const shadowHeader = () =>{
    const header = document.querySelector('.header');
    this.scrollY>=50 ? header.classList.add('shadow-header'): header.classList.remove('shadow-header');
}
window.addEventListener('scroll',shadowHeader);

// slider scroll buttons
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const cardWrapper = document.querySelector('.card__wraper');
const scrollAmount = 200;

nextButton.addEventListener('click', () => {
    cardWrapper.scrollBy({
        left: scrollAmount, 
        behavior: 'smooth' 
    });
});

prevButton.addEventListener('click', () => {
    cardWrapper.scrollBy({
        left: -scrollAmount, 
        behavior: 'smooth' 
    });
});