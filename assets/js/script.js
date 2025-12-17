/* ==================================================
   COCEL JS - INTERATIVIDADE E PERFORMANCE
   (Revisado para melhor UX, performance e correção de ScrollSpy)
   ================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const HEADER_OFFSET = 80;

    // 1. Header (Sticky & Scroll Effect)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (header) {
            // Adiciona a classe 'scrolled' para mudar a sombra/fundo no CSS
            header.classList.toggle('scrolled', window.pageYOffset > 5);
        }
    });

    // 2. Menu Mobile Toggle (Com animação do ícone)
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');

    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Animação simples (hamburguer -> X)
            const spans = mobileBtn.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Fechar menu ao clicar em link (UX Mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                // Fechar se for um link âncora ou navegar para a página principal
                if (link.getAttribute('href').startsWith('#') || link.getAttribute('href').includes('index.html')) {
                    nav.classList.remove('active');
                    // Reseta ícone
                    const spans = mobileBtn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // 3. Smooth Scroll e ScrollSpy (UX Aprimorada)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ScrollSpy: Adiciona classe 'active' ao link de navegação
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + HEADER_OFFSET + 20;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            // Remove a classe 'active' de todos os links de âncora
            if (link.getAttribute('href').startsWith('#')) {
                link.classList.remove('active');
            }
            
            // Adiciona a classe 'active' ao link correto
            // Verifica se a seção atual faz parte da URL do link (para links como index.html#analise)
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // 4. Animação de Entrada (Fade-in-up) com Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Lista completa de elementos a animar
    const elementsToAnimate = document.querySelectorAll(
        '.diferencial-card, .module-card, .timeline-item, .kpi-card, .risco-card, .tco-table, .intangible-card, .visual-callout-content h3, .visual-callout-content p, .visual-callout-content a, .realization-card, .section-title, .section-subtitle'
    );

    // Garante o estilo inicial para evitar o "Flash of unstyled content" (FOUC)
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });


    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplica o delay se ele existir no atributo data-delay
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.transitionDelay = `${delay}s`;

                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // 5. Parallax Suave no Hero (Aplica Parallax na imagem do Hero)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3; 
            hero.style.backgroundPositionY = `${-parallax}px`;
        });
    }

});