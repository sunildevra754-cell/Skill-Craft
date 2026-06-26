const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
 
// change navbar style once user scrolls past the hero a bit
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
 
// mobile hamburger menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
 
// close mobile menu after a link is clicked, and update the active link
const links = document.querySelectorAll('.nav-link');
 
links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    navLinks.classList.remove('open');
  });
});
 