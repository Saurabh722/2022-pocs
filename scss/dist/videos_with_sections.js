var lbrand = {
  isMobile: true,
  isTablet: false
}

$(function() {
  jQuery.fn.extend({
    navViews: function (defaultSection) { // defaultSection is hash value of JS location object.
      var $self = $(this),
        $window = $(window),
        $document = $(document),
        windowHeight = $window.height(),
        $sections = $self.find('.section-view'), // Contain list of sections.
        $navContainer = $self.find('.nav-container'), // Container ofr nav tabs.
        $banner = $('.main_banner'), // Page main-top banner.
        $tabs = $navContainer.find('li'), // Contain list of tabs
        noOfSec = $sections.length, // Number of Sections
        sectionTop = $sections.first().offset().top, // First Sections vertical margin from window-top.
        device = {},
        $currentSection = null, // Seclected Section.
        currentIndex = -1,
        sections = [],
        scrollPos = 0,
        enablePoint = 0,
        motion = -1,
        enableNav = true,
        enableScroll = true,
        isScrollDown = true,
        isMobileReset = false;


        // default config for difference devices
        function setDeviceConfig() {
          if (lbrand.isMobile) {
            device = {
              animatePoint: 0,
              navTop: $navContainer.offset().top - 75,
              scrollPoint: $sections.first().offset().top - 500,
              headerMargin: 180,
              navAnimation: navAnimation,
              animationPos: function(y){ return ( y - ($currentSection.top - 262))/3;}
            };
          } else {
            device = {
                animatePoint: 400,
                navTop: ($navContainer.offset().top + $navContainer.height()) - windowHeight,
                scrollPoint: sectionTop - 500,
                headerMargin: 120,
                navAnimation: function(){},
                animationPos: function(y){ return ( y - ($currentSection.top - 262))/3; }
              }
            if (lbrand.isTablet) {
              device.animatePoint = 200;

              if(isPortrait()) {
                device.animatePoint = 0;
                animationPos = function(y){ return (y + 700 - $currentSection.top)/3; };
              }
            }
        }
      };

      function isPortrait() {
        return lbrand.isTablet && (window.innerHeight > window.innerWidth);
      }

      // Section Class
      function Section (section, index) {
        this.self = section;
        this.top = section.offset().top - device.headerMargin;
        this.height = section.height();
        this.imgPanel = section.find('.image-panel');
        this.images = this.imgPanel.find('img');
        this.textPanel = section.find('.text-panel');
        this.textImg = section.find('.text-img');
        this.video = section.find('.video_panel');
      }

      // this will adjust parent element height according to child element.
      function setHeight($parent, $child) {
        $child = $child ? $child : $parent.children('img');
        var newHeight = $child.height();

        if (newHeight > 10) $parent.height(newHeight);

        $child.on('load', function() {
          newHeight = $(this).height();
          if (newHeight > 10) $parent.height(newHeight);
        });
      }

      function bindBehaviour() {
        $navContainer.find('.section_tabs').click(function(e){
          e.preventDefault();
          if(!enableNav) return;
          var $self = $(this);
          var locationHash = $self.attr('href');
          currentIndex = parseInt($self.data('index'));
          enableNav = false;
          $currentSection = sections[currentIndex];
          var newIndex = currentIndex;

          resetTab(newIndex);

          $('html, body').stop().animate({
            scrollTop: $currentSection.top + 50
          }, 1000, function() {
            enableNav = true;
            setActiveSection(newIndex);
            location.hash = locationHash;
          });
        });

        if(defaultSection) {// will scroll-page direct to given section-hash value in url.
          enableNav = true;
          $('[href="' + defaultSection + '"]').click();
        }
      }

      //method will handle section animation while scrolling while m1 nad m2 are two diff range values
      // m1 = (1 ... 100) & m2 = ( 100...200 )
      function animateView(m1, m2) {
        var l1_img = $currentSection.images.first(),
          l2_img = $currentSection.images.last(),
          max = 30,
          mpx = m1 + 'px';

        if(l2_img) {
          var transform = m1 - max;

          if ( 0 < transform && max > transform) {
            l1_img.css({ opacity: (max - transform)/max });
            l2_img.css({ transform: 'translate( '+ transform + 'px , '+ transform + 'px)', opacity: (transform - 2)/max });
          }
        }

        if(m1 > 96) { // this will hide 1st hero-image and show next one while scrolling down.
          l1_img.css({ opacity: 0});
          l2_img.css({ opacity: 1});
        }

        if(m1 == 0) {  // this will hide 2st hero-image and show 1st one while scrolling up.
          l1_img.css({ opacity: 1});
          l2_img.css({ opacity: 0});
        }

        $currentSection.textPanel.find('h1').first().css({ transform: 'translateX(-' + mpx + ')' });
        $currentSection.textPanel.find('h1').last().css({ transform: 'translateX(' + (2 * m1) + 'px)' });
        $currentSection.textPanel.css({ right: mpx });
        $currentSection.imgPanel.css({ left: mpx });
        $currentSection.video.css({ right: mpx });
        $currentSection.textImg.css({ left: mpx });
      }

      //return +ve value based on range and scrollmove
      function getMove(m, n) {
        if(isScrollDown) {
          if (m < 0) return n;
          return (m < n) ? n - m : 0;
        } else {
          if (m > n) return 0;
          return (m > 0) ? n - m : n;
        }
      }

      // used only for mobile to auto focus nav-tab while scrolling and switching sections.
      function navAnimation(x) {
        if (!enableNav) return;
        var winWidth = $window.width(),
          tabWidth = $tabs.first().width(),
          scrollMove = (tabWidth * x) - ((winWidth - tabWidth) / 2);

        $navContainer.find('ul').stop().animate({
          scrollLeft: scrollMove
        }, 300);
      }

      function scrollAnimation(num) {
        var m = parseInt(num),
        m1 = getMove(m, 100),
        m2 = getMove(m, 200);

        if (motion !== m2) {
          motion = m2;
          animateView(m1, m2);
          clearTimeout($.data(this, 'scrollTimer'));
          $.data(this, 'scrollTimer', setTimeout(function() {
            animateView(m1, m2);
          }, 250));
        }
      }

      function getSectionObj() {
        var count = 0;
        $sections.each(function() {
          sections.push(new Section($(this), count));
          count++;
        });
        $currentSection = sections[0]; // setting 1st section as default focus section.
      }

      function resetTab(newIndex) {
        $tabs.removeClass('active');
        $($tabs[currentIndex]).addClass('active');
      }

      function setActiveSection(newIndex) {
        currentIndex = newIndex;
        $currentSection = sections[currentIndex];

        if(enableNav) {
          resetTab(newIndex);
        }

        device.navAnimation(currentIndex);
      }

      // setting currentSection based on scrolling.
      function setIndex() {
        var idx_floor = Math.floor((scrollPos - device.animatePoint)/$currentSection.height);
        var idx_round = Math.round((scrollPos - device.animatePoint)/$currentSection.height);

        if(idx_floor !== idx_round) return; //difference should be Integer and equal.

        if(currentIndex !== idx_round && noOfSec > idx_round && idx_round > -1) {
          console.log(idx_round);
          setActiveSection(idx_round);
        }
      }

      function singlepage() {
        device.navTop = device.navTop > 0 ? device.navTop : 0;

        if (scrollPos > device.scrollPoint) {
          setIndex();
          scrollAnimation(device.animationPos(scrollPos));
        }

        if (isPortrait()) return;

        if(scrollPos > device.navTop) { //switch nav-tab postion top/bottom based on scrolling
          $navContainer.addClass('fixed-bottom');
          $('.section_container').addClass('set-top');
        } else {
          $navContainer.removeClass('fixed-bottom');
          $('.section_container').removeClass('set-top');
        }
      }

      function initBehaviour() {
        getSectionObj();
        bindBehaviour();
      }

      $self.scrollControl = function() {

        if(!lbrand.isMobile) {
          initBehaviour();

          if( isPortrait()) {
            $navContainer.addClass('fixed-bottom');
            scrollAnimation((700 - sectionTop)/3);
          }
        }

        setHeight($navContainer, $tabs.first().find('.onhover'));

        $window.scroll(function() {
          var scrollY = $document.scrollTop();
          if(scrollY > scrollPos) {
            if (!isMobileReset) {
              initBehaviour();
              isMobileReset = true;
            }
            isScrollDown = true;
          } else {
            isScrollDown = false;
          }
          scrollPos = scrollY;

          if ($currentSection) {
            singlepage();
          }
        });

        if(lbrand.isMobile) {
          $window.scrollTop(1);
        }
      }

      function resetSection() {
        sections.forEach(function(e) {
          e.top = $(e.self).offset().top - 120;
          e.height = $(e.self).height();
        });
        $currentSection = sections[0];
      }

      // method will handle device orientationchange
      function reset() {
        $window.scrollTop(0);
        windowHeight = $window.height();
        noOfSec = $sections.length;
        $currentSection = null;
        currentIndex = -1;
        sectionTop = $sections.first().offset().top;
        scrollPos = 0;
        enablePoint = 0;
        motion = -1;
        enableScroll = true;
        isScrollDown = true;
        isMobileReset = false;

        setDeviceConfig();

        if( isPortrait()) {
          $navContainer.addClass('fixed-bottom');
        }

        resetSection();

        setTimeout(function() {
          $navContainer.css({width: '100%', height: 'auto'});
          setHeight($navContainer, $tabs.first().find('.onhover'));
        }, 200);
      }

      $window.bind('orientationchange', function() {
        $window.scrollTop(0);
        $('.image-panel, .image-panel img, .text-panel, .text-panel h1, .text-img, .video_panel').attr('style', '');
        setTimeout(reset, 200);
      });

      var resizeTimer;

      // $window.on('resize', function(e) {
      //   clearTimeout(resizeTimer);
      //     resizeTimer = setTimeout(function() {
      //       if($window.width() < 500 && !lbrand.isMobile) {
      //         lbrand.isMobile = true;
      //         $(window).scrollTop(0);
      //         reset();
      //       }
      //   }, 250);
      // });

      // this will auto adjust height according to nav images loaded.
      setHeight($navContainer, $tabs.first().find('.onhover'));
      setDeviceConfig();
      $self.scrollControl();
    }
  });
});

document.addEventListener("DOMContentLoaded", function(event) {
  history.scrollRestoration = 'manual';
  if(jQuery) {
    var $trendCapsule = $('#trend_capsule'),
      hashTag = location.hash.toLowerCase().replace(/ /g, '-');

    if($trendCapsule.length) {
      $('html, body').css({overflow: 'hidden'});

      setTimeout(function() {
        $('#trend_loading').fadeOut();
        $('html, body').css({overflow: 'auto'});
        $(window).scrollTop(0);
        $trendCapsule.navViews(hashTag);
      });
    }
  }
});
