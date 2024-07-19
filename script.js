document.addEventListener('DOMContentLoaded', () => {
    initializeButtons();
    initializeThemeToggle();
    loadInitialContent('featured.html');
    initializeSlider(); 
});

function initializeButtons() {
    const buttons = document.querySelectorAll('.button');
    const contentDiv = document.getElementById('content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const contentUrl = button.getAttribute('data-content');
            if (contentUrl) {
                loadContent(contentUrl);
                setActiveButton(button);
            }
        });
    });
}

function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

function loadInitialContent(url) {
    loadContent(url);
    const featuredButton = document.querySelector(`.button[data-content="${url}"]`);
    if (featuredButton) {
        setActiveButton(featuredButton);
    }
}

function loadContent(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;
            initializeSlideMenu(); 
            initializeSlider(); 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('content').innerHTML = '<p>Sorry, an error occurred while loading the content.</p>';
        });
}

function setActiveButton(activeButton) {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

function initializeSlideMenu() {
    const magnifyingGlass = document.getElementById('magnifying-glass');
    const closeButton = document.getElementById('close-btn');
    const slideMenu = document.getElementById('sliding-page');

    if (magnifyingGlass && closeButton && slideMenu) {
        magnifyingGlass.addEventListener('click', () => {
            slideMenu.classList.add('open');
        });

        closeButton.addEventListener('click', () => {
            slideMenu.classList.remove('open');
        });

        document.addEventListener('click', (event) => {
            if (!slideMenu.contains(event.target) && !magnifyingGlass.contains(event.target)) {
                slideMenu.classList.remove('open');
            }
        });
    }
}

function initializeSlider() {
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function startSlideShow() {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % dots.length;
            showSlide(currentIndex);
        }, 6000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideShow();
            currentIndex = index;
            showSlide(currentIndex);
            startSlideShow();
        });
    });

    startSlideShow(); 
}


