

document.addEventListener('DOMContentLoaded', () => {

    const typewriterElement = document.querySelector('#typewriter-text');

    if (typewriterElement) {
        const phrases = [
            { prefix: "Hi, I'm ", highlight: "Titas Mal" },
            { prefix: "Hi, I'm an ", highlight: "AI/ML Engineer" },
            { prefix: "Hi, I'm a ", highlight: "Full-Stack Developer" },
            { prefix: "Hi, I'm an ", highlight: "MLOps Specialist" }
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            const fullText = currentPhrase.prefix + currentPhrase.highlight;
            const prefixLen = currentPhrase.prefix.length;

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }


            if (charIndex <= prefixLen) {
                typewriterElement.textContent = fullText.substring(0, charIndex);
            } else {
                const prefixPart = currentPhrase.prefix;
                const highlightPart = currentPhrase.highlight.substring(0, charIndex - prefixLen);
                typewriterElement.innerHTML = `${prefixPart}<span class="typewriter-name">${highlightPart}</span>`;
            }

            let typeSpeed = isDeleting ? 45 : 95;


            if (!isDeleting && charIndex === fullText.length) {
                typeSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 450;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 300);
    }


    const animatedElements = document.querySelectorAll(
        '.fade-top, .fade-bottom, .fade-left, .fade-right, .zoom-in'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {

                    entry.target.classList.remove('show');
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {

        animatedElements.forEach(el => el.classList.add('show'));
    }

    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        });


        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            });
        });


        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            }
        });
    }

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.header nav a');
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const top = window.scrollY;


        if (header) {
            header.classList.toggle('sticky', top > 60);
        }


        sections.forEach(sec => {
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translate(0, 0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.95)';
                    setTimeout(() => {
                        card.classList.add('hide');
                    }, 200);
                }
            });
        });
    });

    const readMoreBtn = document.querySelector('#read-more-btn');
    const readMoreContent = document.querySelector('#about-more-content');
    const readMoreText = document.querySelector('#read-more-text');
    const readMoreIcon = document.querySelector('#read-more-icon');

    if (readMoreBtn && readMoreContent) {
        readMoreBtn.addEventListener('click', () => {
            const isOpen = readMoreContent.classList.toggle('open');

            if (isOpen) {
                readMoreText.textContent = 'Show Less';
                readMoreIcon.classList.add('rotate');

                readMoreContent.querySelectorAll('.fade-left, .fade-bottom, .fade-right').forEach(card => {
                    card.classList.add('show');
                });
            } else {
                readMoreText.textContent = 'Read More';
                readMoreIcon.classList.remove('rotate');
            }
        });
    }

});
