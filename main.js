/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();



// languages
function changeLanguage(lang) {
    // 1. تغيير النصوص
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        el.textContent = translations[lang][key];
    });

    // 2. تغيير اتجاه الصفحة (مهم بزاف للعربية)
    document.documentElement.dir = translations[lang].dir;
    document.documentElement.lang = lang;
    

    // --- الجزء الجديد الخاص بتأثير الكتابة (Typed Effect) ---

    // 3. البحث عن عنصر تأثير الكتابة
    const typedElement = document.querySelector('.typed');

    if (typedElement) {
        // 4. الحصول على الكلمات المترجمة من كائن translations
        const translatedItems = translations[lang]["typed_items"];

        if (translatedItems) {
            // 5. تحديث خاصية data-typed-items في الـ HTML
            typedElement.setAttribute('data-typed-items', translatedItems);

            // 6. إعادة تشغيل تأثير الكتابة (هذا الجزء يعتمد على مكتبة Typed.js)
            
            if (window.typed) {
              window.typed.destroy(); // توقيف التأثير القديم
            }
          

            // قراءة الكلمات الجديدة من خاصية data-typed-items
          //   let typed_strings = typedElement.getAttribute('data-typed-items');
          // typed_strings = typed_strings.split(','); // تحويل الجملة إلى مصفوفة كلمات
          
          let typed_strings = translatedItems.split(",");

              typedElement.textContent = "";

            // إعادة إنشاء التأثير من جديد بالكلمات المترجمة
            window.typed = new Typed('.typed', {
              strings: typed_strings,
              loop: true,
              typeSpeed: 80,
              backSpeed: 40,
              smartBackspace: true,
              backDelay: 2000
            });
          
          if (typedElement) {
    typedElement.textContent = ''; // هذا السطر يمسح أي نص عالق
    // ... بقية الكود الخاص بـ new Typed
}
          
          // 3. حفظ الاختيار في المتصفح باش إلا دار ريفريش تبقى اللغة هي هي
    localStorage.setItem('preferredLang', lang);
}

// كود باش الصفحة تفتح باللغة اللي كانت محفوظة قبل
window.onload = () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    changeLanguage(savedLang);
};
        }
    }

    

const translations = {
    en: {
        chaymae_messouki_text: "Chaymae Messouki",
        home_text: "Home",
        summary_text: "Summary",
        about_me_text: "About Me",
        skills_text: "Skills",
        projects_text: "Projects Gallery",
        cv_text: "CV",
        languages_text: "Languages",
        contact_text: "Contact",
        im_text: "I'm",
        frontend_text: "Frontend Developer",
        creative_text: "Creative Wep Designer",
        ui_ux_text: "UI/UX Enthusiast",
        problem_solver_text: "Problem Solver",
        passionate_coder_text: "Passionate Coder",
        dir: "ltr" // للإتجاه من اليسار لليمين
    },
    fr: {
        chaymae_messouki_text: "Chaymae Messouki",
        home_text: "Accueil",
        summary_text: "Résumé",
        about_me_text: "À Propos ",
        skills_text: "Compétences",
        projects_text: "Galerie de Projets",
        cv_text: "CV",
        languages_text: "Les langues",
        contact_text: "Contact",
        im_fixed_text: "je suis",
        typed_items: "Programmeuse, développeuse, designeuse",
        dir: "ltr"
    },
    ar: {
       chaymae_messouki_text: "شيماء المسوكي",
        home_text: "الرئيسية",
        summary_text: "الملخص",
        about_me_text: "نبذة عني ",
        skills_text: "المهارات",
        projects_text: "معرض المشاريع",
        cv_text: "السيرة الذاتية",
        languages_text: "اللغات",
        contact_text: "للتواصل",
        im_fixed_text: "أنا",
        typed_items: "مبرمجة، مطورة، مصممة،",
        dir: "rtl" // للإتجاه من اليمين لليسار (مهم جدا)
    }
};
