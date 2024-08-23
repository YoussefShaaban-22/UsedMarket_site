
(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>" :
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /*====== SidebarSearch ======*/
  function sidebarSearch() {
    var searchTrigger = $('.search-active'),
      endTriggersearch = $('.search-close'),
      container = $('.main-search-active');
    searchTrigger.on('click', function (e) {
      e.preventDefault();
      container.addClass('search-visible');
    });
    endTriggersearch.on('click', function () {
      container.removeClass('search-visible');
    });
  };
  sidebarSearch();
  /*====== Sidebar menu Active ======*/
  function mobileHeaderActive() {
    var navbarTrigger = $('.burger-icon'),
      endTrigger = $('.mobile-menu-close'),
      container = $('.mobile-header-active'),
      wrapper4 = $('body');

    wrapper4.prepend('<div class="body-overlay-1"></div>');

    navbarTrigger.on('click', function (e) {
      e.preventDefault();
      container.addClass('sidebar-visible');
      wrapper4.addClass('mobile-menu-active');
    });

    endTrigger.on('click', function () {
      container.removeClass('sidebar-visible');
      wrapper4.removeClass('mobile-menu-active');
    });

    $('.body-overlay-1').on('click', function () {
      container.removeClass('sidebar-visible');
      wrapper4.removeClass('mobile-menu-active');
    });
  };
  mobileHeaderActive();
  /*---------------------
      Mobile menu active
  ------------------------ */


  /**
   * Initiate clients lightbox
   */
  const clientsLightbox = GLightbox({
    selector: '.clients-lightbox'
  });

  new PureCounter();
  // Page loading
  $(window).on('load', function () {
    $('#preloader-active').delay(450).fadeOut('slow');
    $('body').delay(450).css({
      'overflow': 'visible'
    });
    $("#onloadModal").modal('show');
  });
  /*-----------------
    Menu Stick
  -----------------*/
  var header = $('.sticky-bar');
  var win = $(window);
  win.on('scroll', function () {
    var scroll = win.scrollTop();
    if (scroll < 200) {
      header.removeClass('stick');
      $('.header-style-2 .categori-dropdown-active-large').removeClass('open');
      $('.header-style-2 .categori-button-active').removeClass('open');
    } else {
      header.addClass('stick');
    }
  });

  /*------ ScrollUp -------- */
  $.scrollUp({
    scrollText: '<i class="fi-rs-arrow-up"></i>',
    easingType: 'linear',
    scrollSpeed: 900,
    animation: 'fade'
  });


  //sidebar sticky
  if ($('.sticky-sidebar').length) {
    $('.sticky-sidebar').theiaStickySidebar();
  }

  // Slider Range JS
  if ($("#slider-range").length) {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 500,
      values: [130, 250],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
      " - $" + $("#slider-range").slider("values", 1));
  }

  /*----------------------------
    Category toggle function
  ------------------------------*/
  var searchToggle = $('.categori-button-active');
  searchToggle.on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $(this).siblings('.categori-dropdown-active-large').removeClass('open');
    } else {
      $(this).addClass('open');
      $(this).siblings('.categori-dropdown-active-large').addClass('open');
    }
  })


  /*-------------------------------
    Sort by active
  -----------------------------------*/
  if ($('.sort-by-product-area').length) {
    var $body = $('body'),
      $cartWrap = $('.sort-by-product-area'),
      $cartContent = $cartWrap.find('.sort-by-dropdown');
    $cartWrap.on('click', '.sort-by-product-wrap', function (e) {
      e.preventDefault();
      var $this = $(this);
      if (!$this.parent().hasClass('show')) {
        $this.siblings('.sort-by-dropdown').addClass('show').parent().addClass('show');
      } else {
        $this.siblings('.sort-by-dropdown').removeClass('show').parent().removeClass('show');
      }
    });
    /*Close When Click Outside*/
    $body.on('click', function (e) {
      var $target = e.target;
      if (!$($target).is('.sort-by-product-area') && !$($target).parents().is('.sort-by-product-area') && $cartWrap.hasClass('show')) {
        $cartWrap.removeClass('show');
        $cartContent.removeClass('show');
      }
    });
  }

  /*-----------------------
    Shop filter active
  ------------------------- */
  $('.shop-filter-toogle').on('click', function (e) {
    e.preventDefault();
    $('.shop-product-fillter-header').slideToggle();
  })
  var shopFiltericon = $('.shop-filter-toogle');
  shopFiltericon.on('click', function () {
    $('.shop-filter-toogle').toggleClass('active');
  })


  /*====== SidebarSearch ======*/
  function sidebarSearch() {
    var searchTrigger = $('.search-active'),
      endTriggersearch = $('.search-close'),
      container = $('.main-search-active');

    searchTrigger.on('click', function (e) {
      e.preventDefault();
      container.addClass('search-visible');
    });

    endTriggersearch.on('click', function () {
      container.removeClass('search-visible');
    });

  };
  sidebarSearch();

  /*====== Sidebar menu Active ======*/
  function mobileHeaderActive() {
    var navbarTrigger = $('.burger-icon'),
      endTrigger = $('.mobile-menu-close'),
      container = $('.mobile-header-active'),
      wrapper4 = $('body');

    wrapper4.prepend('<div class="body-overlay-1"></div>');

    navbarTrigger.on('click', function (e) {
      e.preventDefault();
      container.addClass('sidebar-visible');
      wrapper4.addClass('mobile-menu-active');
    });

    endTrigger.on('click', function () {
      container.removeClass('sidebar-visible');
      wrapper4.removeClass('mobile-menu-active');
    });

    $('.body-overlay-1').on('click', function () {
      container.removeClass('sidebar-visible');
      wrapper4.removeClass('mobile-menu-active');
    });
  };
  mobileHeaderActive();


  /*---------------------
    Mobile menu active
  ------------------------ */


  /*--- language currency active ----*/
  $('.mobile-language-active').on('click', function (e) {
    e.preventDefault();
    $('.lang-dropdown-active').slideToggle(900);
  });

  /*--- Categori-button-active-2 ----*/
  $('.categori-button-active-2').on('click', function (e) {
    e.preventDefault();
    $('.categori-dropdown-active-small').slideToggle(900);
  });

  /*--- Mobile demo active ----*/
  var demo = $('.tm-demo-options-wrapper');
  $('.view-demo-btn-active').on('click', function (e) {
    e.preventDefault();
    demo.toggleClass('demo-open');
  });

  /*-----More Menu Open----*/
  $('.more_slide_open').slideUp();
  $('.more_categories').on('click', function () {
    $(this).toggleClass('show');
    $('.more_slide_open').slideToggle();
  });

  /*-----Modal----*/

  // $('.modal').on('shown.bs.modal', function (e) {
  //   $('.product-image-slider').slick('setPosition');
  //   $('.slider-nav-thumbnails').slick('setPosition');

  //   $('.product-image-slider .slick-active img').elevateZoom({
  //       zoomType: "inner",
  //       cursor: "crosshair",
  //       zoomWindowFadeIn: 500,
  //       zoomWindowFadeOut: 750
  //   });
  // })

})()
