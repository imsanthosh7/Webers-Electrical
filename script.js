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



// const ScrollRevealOptions = {
//   distance: "50px",
//   origin: "left",
//   duration: 1200,
// }

// const ScrollRevealOptions_1 = {
//   distance: "50px",
//   origin: "right",
//   duration: 1200,
// }

// const ScrollRevealOption = {
//   distance: "50px",
//   origin: "bottom",
//   duration: 1300,
// }

// ScrollReveal().reveal(".right", {
//   ...ScrollRevealOptions_1
// })

// ScrollReveal().reveal(".left", {
//   ...ScrollRevealOptions
// })

// ScrollReveal().reveal(".up", {
//   ...ScrollRevealOption,
//   interval: 100,
// })


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
      delay: 2800,
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

// animation number Counter
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const animationDuration = 2000; // Total duration for the animation in milliseconds

  counters.forEach(counter => {
    const targetValue = parseInt(counter.getAttribute('data-target'), 10);
    const startValue = 0;
    const frameRate = 60; 
    const totalFrames = Math.round((animationDuration / 1000) * frameRate);
    const increment = targetValue / totalFrames;

    let currentValue = startValue;
    let frame = 0;

    const updateCounter = () => {
      frame++;
      currentValue = Math.min(currentValue + increment, targetValue);
      counter.textContent = Math.floor(currentValue);

      if (frame < totalFrames) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = targetValue; 
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
  const animatedTexts = document.querySelectorAll('.text-slide'); 

  setTimeout(() => {
    preloader.classList.add('hidden'); 

    // Trigger the animation after the preloader is hidden
    animatedTexts.forEach((text, index) => {
      setTimeout(() => {
        text.classList.add('start-animation');
      }, index * 20); // Optional delay for staggered effect
    });
  }, 1200); // Match preloader display duration
};



// project image popUp

const lightbox = document.getElementById('lightbox');
const lightboxGroup = document.getElementById('lightbox-group');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentGroup = [];
let currentIndex = 0;

// Predefined groups of images
const groups = {
  1: ['images/industrial-2.jpg', 'images/industrial-1.jpg', 'images/industrial-3.jpg',
    'images/industrial-4.jpg', 'images/industrial-5.jpg', 'images/industrial-6.jpg',
    'images/industrial-7.jpg', 'images/industrial-8.jpg', 'images/industrial-9.jpg',
    'images/industrial-10.jpg',
  ],
  2: ['images/residential-1.jpg', 'images/residential-2.jpg', 'images/residential-3.jpg',
    'images/residential-4.jpg', 'images/residential-5.jpg', 'images/residential-6.jpg',
    'images/residential-7.jpg', 'images/residential-8.jpg', 'images/residential-9.jpg',
    'images/residential-10.jpg', 'images/residential-11.jpg', 'images/residential-12.jpg',
  ],
  3: ['images/commercial-1.jpg', 'images/commercial-2.jpg', 'images/commercial-3.jpg',
    'images/commercial-4.jpg', 'images/commercial-5.jpg', 'images/commercial-6.jpg',
    'images/commercial-7.jpg', 'images/commercial-8.jpg', 'images/commercial-9.jpg',
    'images/commercial-10.jpg', 'images/commercial-11.jpg', 'images/commercial-1.jpg',
    'images/commercial-12.jpg', 'images/commercial-13.jpg', 'images/commercial-14.jpg',
    'images/commercial-15.jpg', 'images/commercial-16.jpg', 'images/commercial-17.jpg',
    'images/commercial-18.jpg'
  ],
};

// Open lightbox on image click
galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const groupId = item.getAttribute('data-group');
    currentGroup = groups[groupId];
    currentIndex = 0; // Start with the first image of the group
    showCurrentImage();
    lightbox.style.display = 'flex';
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    lightbox.style.display = 'none';
  }
})


// Show the current image with spinner using async/await
async function showCurrentImage() {
  lightboxGroup.innerHTML = '';

  const spinner = document.createElement('div');
  spinner.classList.add('loader');
  spinner.style.display = 'inline-block';
  lightboxGroup.appendChild(spinner);

  // Create the image
  const img = document.createElement('img');
  img.src = currentGroup[currentIndex];
  img.alt = `Image ${currentIndex + 1}`;
  img.classList.add('lightbox-image');
  img.style.display = 'none';

  try {
    await loadImage(img);
    spinner.remove();
    img.style.display = 'block';
  } catch (error) {
    console.error('Error loading image:', error);
    spinner.textContent = 'Failed to load image';
  }

  lightboxGroup.appendChild(img);
}

// Helper function to load the image
function loadImage(image) {
  return new Promise((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('Image failed to load'));
  });
}



// Show next image
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentGroup.length;
  showCurrentImage();
});


document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % currentGroup.length;
    showCurrentImage();
  }
})

// Show previous image
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
  showCurrentImage();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    showCurrentImage();
  }
})



// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});


// JavaScript Example to Toggle Lightbox
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    lightbox.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});


// project swiper 
const cardContainer = document.getElementById("cardContainer");
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");

// Scroll step size
const scrollAmount = 300;

// Scroll left function
scrollLeftBtn.addEventListener("click", () => {
  cardContainer.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});

// Scroll right function
scrollRightBtn.addEventListener("click", () => {
  cardContainer.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});



