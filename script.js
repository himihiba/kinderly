const shadowHeader = () =>{
    const header = document.querySelector('.header');
    this.scrollY>=50 ? header.classList.add('shadow-header'): header.classList.remove('shadow-header');
}
window.addEventListener('scroll',shadowHeader);