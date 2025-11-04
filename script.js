document.addEventListener('DOMContentLoaded', function () {
    // ========== PRIMERA PARTE: Funcionalidad de galería y popups ==========

    // Sample data for gallery items and variants
    const galleryData = {
        comunicaciones: [
            {
                id: 1,
                title: "Titulo",
                description: "texto",
                image: "imagenes/galeria/comunicacion.jpg",
                variants: [
                    "https://picsum.photos/seed/cuarto1-1/800/600",
                    "https://picsum.photos/seed/cuarto1-1/800/600",
                    "https://picsum.photos/seed/cuarto1-1/800/600",
                    "https://picsum.photos/seed/cuarto1-1/800/600",

                ]
            },
            {
                id: 2,
                title: "Titulo",
                description: "texto",
                image: "https://picsum.photos/seed/cuarto1-1/800/600",
                variants: [
                    "https://picsum.photos/seed/cuarto1-1/800/600",
                    "https://picsum.photos/seed/cuarto1-1/800/600",

                ]
            },
            {
                id: 3,
                title: "Titulo",
                description: "texto",
                image: "https://picsum.photos/seed/cuarto1-1/800/600",
                variants: [
                    "https://picsum.photos/seed/cuarto1-1/800/600",
                    "https://picsum.photos/seed/cuarto1-1/800/600",
                    "imagenes/galeria/cocinas/11.jpg",

                ]
            },
            {
                id: 4,
                title: "Titulo",
                description: "texto",
                image: "https://picsum.photos/seed/cuarto1-1/800/600",
                variants: [
                    "imagenes/galeria/cocinas/12.jpg",


                ]
            }
        ],
        Marketing: [
            {
                id: 1,
                title: "Titulo",
                description: "texto",
                image: "imagenes/galeria/marketing.jpg",
                variants: [
                    "https://picsum.photos/seed/cuarto1-1/800/600",
                    "https://picsum.photos/seed/cuarto1-2/800/600",
                    "https://picsum.photos/seed/cuarto1-3/800/600"
                ]
            },
            {
                id: 2,
                title: "Titulo",
                description: "texto",
                image: "https://picsum.photos/seed/cuarto2/600/400",
                variants: [
                    "https://picsum.photos/seed/cuarto2-1/800/600",
                    "https://picsum.photos/seed/cuarto2-2/800/600"
                ]
            }
        ],
        Tegnología: [
            {
                id: 1,
                title: "Titulo",
                description: "texto",
                image: "imagenes/galeria/desarrollo.jpg",
                variants: [
                    "https://picsum.photos/seed/baño1-1/800/600",
                    "https://picsum.photos/seed/baño1-2/800/600",
                    "https://picsum.photos/seed/baño1-3/800/600"
                ]
            }
        ],
        Activaciones: [
            {
                id: 1,
                title: "Titulo",
                description: "texto",
                image: "imagenes/galeria/activaciones.jpg",
                variants: [
                    "https://picsum.photos/seed/sala1-1/800/600",
                    "https://picsum.photos/seed/sala1-2/800/600",
                    "https://picsum.photos/seed/sala1-3/800/600"
                ]
            }
        ]
    };

    // DOM Elements for gallery functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    const categoryPopup = document.querySelector('.category-popup');
    const categoryTitle = document.getElementById('category-title');
    const categoryGallery = document.querySelector('.category-gallery');
    const closeCategory = document.querySelector('.close-category');
    const variantsPopup = document.querySelector('.variants-popup');
    const variantsTitle = document.querySelector('.variants-title');
    const variantsDescription = document.querySelector('.variants-description');
    const variantsCarousel = document.querySelector('.variants-carousel');
    const variantsIndicators = document.querySelector('.variants-indicators');
    const closeVariants = document.querySelector('.close-variants');
    const quoteBtn = document.querySelector('.quote-btn');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');

    // Variables for carousel functionality
    let currentVariants = [];
    let currentVariantIndex = 0;
    let currentCategory = '';
    let currentItem = null;

    // Open category gallery
    viewButtons.forEach(button => {
        button.addEventListener('click', function () {
            currentCategory = this.getAttribute('data-category');
            openCategoryPopup(currentCategory);
        });
    });

    function openCategoryPopup(category) {
        const categoryData = galleryData[category] || [];

        // Set category title
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

        // Clear previous gallery items
        categoryGallery.innerHTML = '';

        // Add gallery items
        categoryData.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-item-overlay">
                    <button class="view-plus-btn" data-id="${item.id}">
                        <i class="fas fa-plus"></i> Ver +
                    </button>
                </div>
            `;
            categoryGallery.appendChild(galleryItem);
        });

        // Add event listeners to view buttons
        document.querySelectorAll('.view-plus-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const itemId = parseInt(this.getAttribute('data-id'));
                const item = categoryData.find(i => i.id === itemId);
                if (item) {
                    openVariantsPopup(item);
                }
            });
        });

        // Show popup
        categoryPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Open variants popup
    function openVariantsPopup(item) {
        currentItem = item;
        currentVariants = item.variants;
        currentVariantIndex = 0;

        // Set title and description
        variantsTitle.textContent = item.title;
        variantsDescription.textContent = item.description;

        // Clear carousel and indicators
        variantsCarousel.innerHTML = '';
        variantsIndicators.innerHTML = '';

        // Add variant slides
        currentVariants.forEach((variant, index) => {
            const slide = document.createElement('div');
            slide.className = 'variant-slide';
            slide.innerHTML = `<img src="${variant}" alt="Variante ${index + 1}">`;
            variantsCarousel.appendChild(slide);

            // Add indicator
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => {
                goToVariant(index);
            });
            variantsIndicators.appendChild(indicator);
        });

        // Show popup
        variantsPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCarousel();
    }

    // Close category popup
    closeCategory.addEventListener('click', function () {
        categoryPopup.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close variants popup
    closeVariants.addEventListener('click', function () {
        variantsPopup.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Quote button functionality
    quoteBtn.addEventListener('click', function () {
        const message = `Estoy interesado en: ${currentItem.title} - ${currentItem.description}`;
        const whatsappUrl = `https://wa.me/573002246384?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Carousel navigation
    carouselPrev.addEventListener('click', function () {
        if (currentVariantIndex > 0) {
            currentVariantIndex--;
            updateCarousel();
        }
    });

    carouselNext.addEventListener('click', function () {
        if (currentVariantIndex < currentVariants.length - 1) {
            currentVariantIndex++;
            updateCarousel();
        }
    });

    // Go to specific variant
    function goToVariant(index) {
        currentVariantIndex = index;
        updateCarousel();
    }

    // Update carousel position and indicators
    function updateCarousel() {
        variantsCarousel.style.transform = `translateX(-${currentVariantIndex * 100}%)`;

        // Update indicators
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            if (index === currentVariantIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Keyboard navigation for variants
    document.addEventListener('keydown', function (e) {
        if (variantsPopup.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                if (currentVariantIndex > 0) {
                    currentVariantIndex--;
                    updateCarousel();
                }
            } else if (e.key === 'ArrowRight') {
                if (currentVariantIndex < currentVariants.length - 1) {
                    currentVariantIndex++;
                    updateCarousel();
                }
            } else if (e.key === 'Escape') {
                variantsPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Touch swipe for carousel
    let carouselTouchStartX = 0;
    let carouselTouchEndX = 0;

    variantsCarousel.addEventListener('touchstart', function (e) {
        carouselTouchStartX = e.changedTouches[0].screenX;
    });

    variantsCarousel.addEventListener('touchend', function (e) {
        carouselTouchEndX = e.changedTouches[0].screenX;
        handleCarouselSwipe();
    });

    function handleCarouselSwipe() {
        if (carouselTouchStartX - carouselTouchEndX > 50) {
            // Swipe left - next
            if (currentVariantIndex < currentVariants.length - 1) {
                currentVariantIndex++;
                updateCarousel();
            }
        } else if (carouselTouchEndX - carouselTouchStartX > 50) {
            // Swipe right - previous
            if (currentVariantIndex > 0) {
                currentVariantIndex--;
                updateCarousel();
            }
        }
    }

    // ========== SEGUNDA PARTE: Funcionalidad del resto de la página ==========

    // Header Scroll Effect
    const header = document.querySelector('header');
    const logoImg = document.querySelector('.logo img');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            logoImg.src = "imagenes/logo/logo-header.png";
        } else {
            header.classList.remove('scrolled');
            logoImg.src = "imagenes/logo/logo-header-2.png";
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = 0;

            const content = slide.querySelector('.slide-content');
            if (content) {
                content.querySelector('.subtitle').style.animation = '';
                content.querySelector('.title-rectangle').style.animation = '';
                content.querySelector('h1').style.animation = '';
                content.querySelector('.btn').style.animation = '';
            }
        });

        currentSlide = (n + slides.length) % slides.length;
        const activeSlide = slides[currentSlide];

        activeSlide.classList.add('active');
        activeSlide.style.opacity = 1;

        void activeSlide.offsetWidth;

        const activeContent = activeSlide.querySelector('.slide-content');
        if (activeContent) {
            activeContent.querySelector('.subtitle').style.animation = 'fadeInUp 0.8s ease forwards';
            activeContent.querySelector('.title-rectangle').style.animation = 'fadeIn 1s ease forwards 0.3s';
            activeContent.querySelector('h1').style.animation = 'fadeInUp 0.8s ease forwards 0.4s';
            activeContent.querySelector('.btn').style.animation = 'fadeInUp 0.8s ease forwards 0.6s';
        }

        const activeBg = activeSlide.querySelector('.slide-bg');
        if (activeBg) {
            activeBg.style.transition = 'none';
            activeBg.style.transform = 'scale(1)';
            void activeBg.offsetWidth;
            activeBg.style.transition = 'transform 5s linear';
            activeBg.style.transform = 'scale(1.1)';
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startSlideShow();
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        clearInterval(slideInterval);
        nextSlide();
        startSlideShow();
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        clearInterval(slideInterval);
        prevSlide();
        startSlideShow();
    });

    // Touch events for slider
    let sliderTouchStartX = 0;
    let sliderTouchEndX = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        sliderTouchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        sliderTouchEndX = e.changedTouches[0].screenX;
        handleSliderSwipe();
    });

    function handleSliderSwipe() {
        if (sliderTouchStartX - sliderTouchEndX > 50) {
            // Swipe left
            clearInterval(slideInterval);
            nextSlide();
            startSlideShow();
        } else if (sliderTouchEndX - sliderTouchStartX > 50) {
            // Swipe right
            clearInterval(slideInterval);
            prevSlide();
            startSlideShow();
        }
    }

    // Initialize slider
    showSlide(0);
    startSlideShow();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Products Implementation - 2 líneas de productos
    const productsContainer = document.querySelector('.products-container');
    const products = [];

    // Crear productos
    for (let i = 1; i <= 1; i++) {
        products.push({
            id: i,
            title: `Comunicacion empresarial`,
            subtitle: `• Estrategias de comunicación interna y externa <br>• Alcance nacional y regional en medios masivos <br> • Generación de noticias, artículos, contenidos de valor y ruedas de prensa <br>• Posicionamiento de marca en prensa.`,
            img: `imagenes/servicios/comunicacion.gif`,
            staticImg: `imagenes/servicios/comunicacion.png` // Necesitas crear esta imagen
        });
    }
    for (let i = 2; i <= 2; i++) {
        products.push({
            id: i,
            title: `Marketing, planes y diseño`,
            subtitle: `• Diseño digital y branding<br>• Lanzamiento de campañas<br>• Videos y cápsulas digitales<br>• Marketing Redes Sociales<br>• Influencer marketing / UGC<br>• Marketing interno<br>• Planes de fidelización de clientes y beneficios para equipos de trabajo.`,
            img: `imagenes/servicios/marketing.gif`,
            staticImg: `imagenes/servicios/marketing.png`
        });
    }
    for (let i = 3; i <= 3; i++) {
        products.push({
            id: i,
            title: `Tecnología y desarrollo`,
            subtitle: `• Páginas web con IA integrada<br>• Desarrollo de aplicaciones, plataformas tecnológicas y educativas.<br>• Creación e Integración de Chatbots<br>• Entrenamientos con VR en oratoria, crísis corporativa y ventas.`,
            img: `imagenes/servicios/desarrollo.gif`,
            staticImg: `imagenes/servicios/desarrollo.png`
        });
    }
    for (let i = 4; i <= 4; i++) {
        products.push({
            id: i,
            title: `Activaciones y eventos`,
            subtitle: `• Activaciones de marca en punto<br>• Integraciones, talleres creativos y dinámicos para ejecutivos y clientes.<br>• Conferencias y coaching ejecutivo.<br><br><br>`,
            img: `imagenes/servicios/activaciones.gif`,
            staticImg: `imagenes/servicios/activaciones.png`
        });
    }

    // Renderizar productos en 2 filas
    function renderProducts() {
        productsContainer.innerHTML = '';

        // Primera fila
        const row1 = document.createElement('div');
        row1.className = 'product-row';

        products.slice(0, 4).forEach(product => {
            const productItem = createProductItem(product);
            row1.appendChild(productItem);
        });

        productsContainer.appendChild(row1);

        // Segunda fila
        const row2 = document.createElement('div');
        row2.className = 'product-row';

        products.slice(4, 8).forEach(product => {
            const productItem = createProductItem(product);
            row2.appendChild(productItem);
        });

        productsContainer.appendChild(row2);
    }

    // Crear elemento de producto
    function createProductItem(product) {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
        <div class="product-image">
            <img src="${product.staticImg}" class="static-img" alt="${product.title}">
            <img src="${product.img}" class="gif-img" alt="${product.title}" style="display: none;">
        </div>
        <div class="product-info">
            <h3>${product.title}</h3>
            <p class="subtitle">${product.subtitle}</p>
            <a href="https://wa.me/+573002246384?text=Estoy%20interesado%20en%20${encodeURIComponent(product.title)}" class="buy-btn" target="_blank">
                <i class="fab fa-whatsapp"></i> Comprar
            </a>
        </div>
    `;

        // Agregar eventos de hover
        productItem.addEventListener('mouseenter', function () {
            const staticImg = this.querySelector('.static-img');
            const gifImg = this.querySelector('.gif-img');
            staticImg.style.display = 'none';
            gifImg.style.display = 'block';
        });

        productItem.addEventListener('mouseleave', function () {
            const staticImg = this.querySelector('.static-img');
            const gifImg = this.querySelector('.gif-img');
            gifImg.style.display = 'none';
            staticImg.style.display = 'block';
        });

        return productItem;
    }

    // Inicializar productos
    renderProducts();

    // Testimonials Carousel With Left Panel
    const testimonialsCarousel = document.querySelector('.testimonials-carousel .carousel-inner');
    const testimonialsPrev = document.querySelector('.testimonials-carousel .carousel-prev');
    const testimonialsNext = document.querySelector('.testimonials-carousel .carousel-next');
    const testimonials = [];
    let testimonialsPosition = 0;
    let testimonialsPerView = 2;

    // Ajustar número de testimonios visibles según el ancho de pantalla
    function updateTestimonialsPerView() {
        if (window.innerWidth < 768) {
            testimonialsPerView = 1;
        } else {
            testimonialsPerView = 2;
        }
    }

    // Crear testimonios
    for (let i = 1; i <= 6; i++) {
        testimonials.push({
            id: i,
            content: `"Excelente servicio, muy satisfecho con el producto. Atención rápida y profesional. El diseño superó mis expectativas y la calidad es excepcional. ¡Lo recomiendo!"`,
            author: `Cliente ${i}`,
            position: `Usuario frecuente`,
            avatar: `imagenes/icon/avatar.png`
        });
    }

    // Renderizar testimonios
    function renderTestimonials() {
        testimonialsCarousel.innerHTML = '';

        updateTestimonialsPerView();

        // Calcular número de slides necesarios
        const slidesCount = Math.ceil(testimonials.length / testimonialsPerView);

        for (let i = 0; i < slidesCount; i++) {
            const slide = document.createElement('div');
            slide.className = 'testimonial-slide';

            const testimonialsInSlide = testimonials.slice(i * testimonialsPerView, (i + 1) * testimonialsPerView);

            testimonialsInSlide.forEach(testimonial => {
                const testimonialItem = document.createElement('div');
                testimonialItem.className = 'testimonial-item';
                testimonialItem.innerHTML = `
                    <div class="testimonial-content">
                        <p>${testimonial.content}</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <img src="${testimonial.avatar}" alt="${testimonial.author}">
                        </div>
                        <div class="author-info">
                            <h4>${testimonial.author}</h4>
                            <p>${testimonial.position}</p>
                        </div>
                    </div>
                `;
                slide.appendChild(testimonialItem);
            });

            testimonialsCarousel.appendChild(slide);
        }

        updateTestimonialsCarousel();
    }

    // Navegación del carrusel
    testimonialsPrev.addEventListener('click', () => {
        const slidesCount = Math.ceil(testimonials.length / testimonialsPerView);
        if (testimonialsPosition > 0) {
            testimonialsPosition--;
            updateTestimonialsCarousel();
        }
    });

    testimonialsNext.addEventListener('click', () => {
        const slidesCount = Math.ceil(testimonials.length / testimonialsPerView);
        if (testimonialsPosition < slidesCount - 1) {
            testimonialsPosition++;
            updateTestimonialsCarousel();
        }
    });

    function updateTestimonialsCarousel() {
        const slideWidth = 100 / Math.ceil(testimonials.length / testimonialsPerView);
        testimonialsCarousel.style.transform = `translateX(-${testimonialsPosition * slideWidth}%)`;
    }

    // Actualizar en redimensionamiento de ventana
    window.addEventListener('resize', () => {
        renderTestimonials();
    });

    // Inicializar testimonios
    renderTestimonials();

    // Clients Logos Carousel
    const logosCarousel = document.querySelector('.logos-carousel .carousel-inner');
    const logosPrev = document.querySelector('.logos-carousel .carousel-prev');
    const logosNext = document.querySelector('.logos-carousel .carousel-next');
    const logos = [];
    let logosPosition = 0;

    // Crear logos
    for (let i = 1; i <= 12; i++) {
        logos.push({
            id: i,
            name: `Cliente ${i}`,
            img: `https://picsum.photos/seed/logo-${i}/150/80`
        });
    }

    // Renderizar logos
    function renderLogos() {
        logosCarousel.innerHTML = '';

        // Crear slides (4 logos por slide)
        const slidesCount = Math.ceil(logos.length / 4);

        for (let i = 0; i < slidesCount; i++) {
            const slide = document.createElement('div');
            slide.className = 'logo-slide';

            const logosInSlide = logos.slice(i * 4, (i + 1) * 4);

            logosInSlide.forEach(logo => {
                const logoItem = document.createElement('div');
                logoItem.className = 'logo-item';
                logoItem.innerHTML = `
                    <img src="${logo.img}" alt="${logo.name}">
                `;
                slide.appendChild(logoItem);
            });

            logosCarousel.appendChild(slide);
        }
    }

    // Navegación del carrusel de logos
    logosPrev.addEventListener('click', () => {
        if (logosPosition > 0) {
            logosPosition--;
            updateLogosCarousel();
        }
    });

    logosNext.addEventListener('click', () => {
        const slidesCount = Math.ceil(logos.length / 4);
        if (logosPosition < slidesCount - 1) {
            logosPosition++;
            updateLogosCarousel();
        }
    });

    function updateLogosCarousel() {
        logosCarousel.style.transform = `translateX(-${logosPosition * 100}%)`;
    }

    // Inicializar logos
    renderLogos();

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
    }

    // Browser compatibility fixes
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Polyfill for smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - 80;
                    window.scrollTo(0, targetPosition);
                }
            });
        });
    }
});

// Sesion nosotros//

// Tab functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding panel
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});
