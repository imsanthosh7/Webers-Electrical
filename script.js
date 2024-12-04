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


        