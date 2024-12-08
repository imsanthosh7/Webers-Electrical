// Go to Top button
const goToTopButton = document.getElementById('go-to-top');


window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        goToTopButton.style.display = 'flex';
    } else {
        goToTopButton.style.display = 'none';
    }
});

goToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});


// navlink active 

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-custom'));
    this.classList.add('active-custom');
  });
});


// swiper 

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


// animateCounters function 

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const animationDuration = 2000;

  counters.forEach(counter => {
    const targetValue = parseInt(counter.getAttribute('data-target'), 10);
    const increment = Math.ceil(targetValue / (animationDuration / 16));

    let currentValue = 0;

    const updateCounter = () => {
      currentValue += increment;

      if (currentValue >= targetValue) {
        counter.textContent = targetValue;
      } else {
        counter.textContent = currentValue;
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  });
}


// Scroll event listener for triggering animation
function handleScroll() {
  const section = document.querySelector('.counter-section');
  if (!section) return;

  const sectionPosition = section.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.2;

  if (sectionPosition < screenPosition) {
    animateCounters();
    window.removeEventListener('scroll', handleScroll);
  }

}
window.addEventListener('scroll', handleScroll);



// preloder 
window.onload = function () {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1200)
};



// servicePage image popup

const popup = document.querySelector('.image-popup');
const popupImage = document.querySelector('#popup-image');
const closePopup = document.querySelector('.close-popup');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const images = document.querySelectorAll('.clickable-image');
let currentIndex = 0;

// Open popup with the clicked image
images.forEach((image, index) => {
  image.addEventListener('click', () => {
    currentIndex = index;
    showImage(currentIndex);
    popup.style.display = 'flex';
  });
});

// Close the popup
closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
});


// Close popup on clicking outside the image
popup.addEventListener('click', (e) => {
  if (e.target !== popupImage && !e.target.classList.contains('navigation')) {
    popup.style.display = 'none';
  }
});

// Show the image based on the current index
function showImage(index) {
  popupImage.src = images[index].src;
}

// Navigate to the previous image
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

// Navigate to the next image
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});


// Open popup with the clicked image
images.forEach((image, index) => {
  image.addEventListener('click', () => {
    currentIndex = index;
    showImage(currentIndex);
    popup.classList.add('show');
  });
});

// Close the popup
closePopup.addEventListener('click', () => {
  popup.classList.remove('show');
});





