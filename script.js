document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-custom'));
    this.classList.add('active-custom');
  });
});


document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2400,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});



// Counter function to animate numbers
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 200; // Control the speed by dividing by a larger or smaller number

    function updateCounter() {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCounter, 90); // Adjust timeout for smooth animation
      } else {
        counter.innerText = target;
      }
    }

    updateCounter();
  });
}

// Trigger the counter animation when the section is in view
window.addEventListener('scroll', () => {
  const section = document.querySelector('.counter-section');
  const sectionPosition = section.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.2;

  if (sectionPosition < screenPosition) {
    animateCounters();
    window.removeEventListener('scroll', arguments.callee); // Remove listener after first activation
  }
});




window.onload = function () {
  const preloader = document.getElementById('preloader');
 setTimeout(()=>{
  preloader.classList.add('hidden'); 
 },1200)
};

