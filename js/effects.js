var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

jQuery(document).ready(function () {

	// get current user agent
	var userAgent = navigator.userAgent.toLowerCase();
	// if android exits index > -1 will be returned
	var isAndroid = userAgent.indexOf("android") > -1;
	// if isAndroid == true then our double tab script will be executed
	if (isAndroid === true && navigator.maxTouchPoints > 0) {
		Common.doubleTapToGo("#mobilecm_mobile_navigation li:has(ul)");
	}

	//Find last Navigation point in a row
	function markRowLastItem() {
		// Offset des ersten Elements
		var li = document.querySelector('.navigation_wrapper ul li');
		var initialOffsetTop = (li ? li.offsetTop : 0);

		// Letztes Element welches diesen Offset noch hat markieren 
		var firstItemNextRow = Array.from(document.querySelectorAll('.navigation_wrapper > ul > li')).find(function (e) { return e.offsetTop !== initialOffsetTop; });

		if (firstItemNextRow) {
			firstItemNextRow.previousSibling.classList.add('row-last-item');
		}
	}

	markRowLastItem();

	window.addEventListener('resize', function () {
		// Entfernen der alten Marker
		Array.from(document.querySelectorAll('.navigation_wrapper ul li')).forEach(function (e) { e.classList.remove('row-last-item'); });
		markRowLastItem();
	});


	var navigation = document.querySelector('.nav_wrapper');
	if(navigation) {
		navigation.addEventListener('dragenter', function() {
			if (navigation.classList.contains('sticky_nav')) {
				if (window.Draggables && window.Draggables.onDragEnd) {
					navigation.style.pointerEvents = 'none';
					window.Draggables.onDragEnd(function() {
						navigation.style.pointerEvents = '';
					});
				}
			}
		});
	}

	// fade navigation after X px in and change color with CSS
	window.addEventListener('scroll', function () {
		try {
			if (window.pageYOffset >= navigation.offsetHeight && window.innerWidth >= 1250) {
				navigation.classList.add('nav_transparent');
				if (window.pageYOffset >= navigation.offsetHeight + 200) {
					navigation.classList.add('sticky_nav');
				}
			} else {
				navigation.classList.remove('sticky_nav');
				navigation.classList.remove('nav_transparent');
			}
		}
		catch (e) {
			console.log('Keyvisual was not found or user is not in desktop mode')
		}
	});

	//if the user is in ie11 we deactivate the parallax
	function msieversion() {

		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");

		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
		{
			/*document.querySelector('html').style.overflow = 'hidden';
			document.querySelector('html').style.height = '100%';
			document.querySelector('body').style.overflowY = 'auto';
			document.querySelector('body').style.height = '100%';*/

			// Setting the background Attachment back to default to prevent scrolling issue in ie11
			document.querySelector('#keyvisual').style.backgroundAttachment = 'scroll';
		}
		return false;
	}

	msieversion();


	//methode to deactivate the smooth scrolling in ie11
	/*if(navigator.userAgent.match(/Trident\/7\./)) {
		document.body.addEventListener("mousewheel", function() {
		  event.preventDefault();
		  var wd = event.wheelDelta;
		  var csp = window.pageYOffset;
		  window.scrollTo(0, csp - wd);
		});
	  }*/



	//Change color after 100vh of the burger button to content text color
	function selectorSearch(hamburger, selector) {
		[].forEach.call(hamburger, function (div) {
			// do whatever
			div.style.backgroundColor = window.getComputedStyle(selector).getPropertyValue('color');
		});
	}

	function toggleNavigationColor(selector, element) {
		try {
			var toggleNavigation = selector;
			if (element === 'style') {
				toggleNavigation.removeAttribute("style");
			} else {
				toggleNavigation.style.backgroundColor = window.getComputedStyle(element).getPropertyValue('background-color');
				toggleNavigation.style.opacity = '0.75';
			}
		} catch (e) {
			//instruction
		}

	}

	function calculateElmentHeight(element) {
		return parseInt(window.getComputedStyle(element).height) + element.offsetTop + parseInt(window.getComputedStyle(element).getPropertyValue('padding-bottom')) + parseInt(window.getComputedStyle(element).getPropertyValue('padding-top'));
	}

	function changeBurgerColor() {
		var contentSelector = document.querySelector('.content_wrapper'),
			keyvisualSelector = document.querySelector('.header_wrapper'),
			sidebarSelector = document.querySelector('.sidebar_wrapper'),
			footerSelector = document.querySelector('.footer_wrapper'),
			hamburgerContainer = document.querySelector('.toggle_wrapper--contain'),
			hamburgerLines = document.querySelectorAll('.toggle_wrapper > div'),
			websiteSelector = document.body,
			scrollPosition = window.pageYOffset;

		const BREAKPOINT = 1250;

		if (window.innerWidth <= BREAKPOINT) {

			if (keyvisualSelector.offsetTop > 0) {
				console.log('test');
				if (scrollPosition >= keyvisualSelector.offsetTop && scrollPosition <= calculateElmentHeight(keyvisualSelector)) {
					[].forEach.call(hamburgerLines, function (div) {
						// do whatever

						div.removeAttribute("style");
					});
					toggleNavigationColor(hamburgerContainer, keyvisualSelector);
				}
			}

			if (contentSelector.offsetTop > 0) {
				if (scrollPosition >= contentSelector.offsetTop && scrollPosition <= calculateElmentHeight(contentSelector)) {
					[].forEach.call(hamburgerLines, function (div) {
						// do whatever

						div.style.backgroundColor = window.getComputedStyle(contentSelector).getPropertyValue('color');
					});
					toggleNavigationColor(hamburgerContainer, contentSelector);
				}
			}

			if (sidebarSelector.offsetTop > 0) {
				if (scrollPosition >= sidebarSelector.offsetTop && scrollPosition <= calculateElmentHeight(sidebarSelector)) {
					[].forEach.call(hamburgerLines, function (div) {
						// do whatever

						div.style.backgroundColor = window.getComputedStyle(sidebarSelector).getPropertyValue('color');
					});
					toggleNavigationColor(hamburgerContainer, websiteSelector);
				}
			}

			if (footerSelector.offsetTop > 0) {
				if (scrollPosition >= footerSelector.offsetTop && scrollPosition <= calculateElmentHeight(footerSelector)) {
					[].forEach.call(hamburgerLines, function (div) {
						// do whatever

						div.style.backgroundColor = window.getComputedStyle(footerSelector).getPropertyValue('color');
					});
					toggleNavigationColor(hamburgerContainer, footerSelector);
				}
			}


			if (parseInt(window.getComputedStyle(keyvisualSelector).height) > 0) {
				var removeSelectorClasses = keyvisualSelector;
			}

			if (scrollPosition <= (removeSelectorClasses.offsetTop + parseInt(window.getComputedStyle(removeSelectorClasses).height))) {
				toggleNavigationColor(hamburgerContainer, keyvisualSelector);
				[].forEach.call(hamburgerLines, function (div) {
					// do whatever
					div.removeAttribute("style");
				});
			}
		} // if Breakpoint 
	} // function

	window.addEventListener('scroll', function (e) {
		changeBurgerColor();
	});
	window.addEventListener('resize', function (e) {
		changeBurgerColor();
	});

	setTimeout(function () {
		changeBurgerColor();
	}, 100);



});


(function ($) {
	$(window).load(function () {

		// SET PSEUDO ARROW FOR SUBNAVI
		$(".navigation_wrapper > ul > li.cm_has_subnavigation > a").each(function () {
			$(this).append(" <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i>");
		});

		$(".navigation_wrapper > ul > li.cm_has_subnavigation ul > li.cm_has_subnavigation > a").each(function () {
			$(this).append(" <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>");
		});

		$("#mobilecm_mobile_navigation > ul > li.cm_has_subnavigation > a").each(function () {
			$(this).append(" <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i>");
		});

		$("#mobilecm_mobile_navigation > ul > li.cm_has_subnavigation ul > li.cm_has_subnavigation > a").each(function () {
			$(this).append(" <i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i>");
		});


		function hasClass(element, className) {
			return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
		}
		var mobileNavigation = document.querySelector(".cm-template-navigation__mobil"),
			hamburgerButton = document.querySelector(".toggle_wrapper");

		hamburgerButton.onclick = function () {
			if (hasClass(mobileNavigation, 'open_navigation')) {
				mobileNavigation.classList.add('closed_navigation');
				mobileNavigation.classList.remove('open_navigation');
				hamburgerButton.classList.remove('change_hamburger');
				document.querySelector('.toggle_wrapper--contain').removeAttribute("style");
				document.querySelector('.device-desktop').removeAttribute("style");
			} else {
				mobileNavigation.classList.add('open_navigation');
				hamburgerButton.classList.add('change_hamburger');
				mobileNavigation.classList.remove('closed_navigation');
				document.querySelector('.toggle_wrapper--contain').removeAttribute("style");
				document.querySelector('.device-desktop').setAttribute("style", "overflow: hidden");
			}
		};


		//Scroll down to Content
		$('.scroll_down').click(function () {
			goToByScroll('#content_main');
		});


		// Change color of burgerbutton - only bigger at 651px
		var breite = jQuery(window).width();
		$(window).resize(function () {
			breite = jQuery(window).width();
		});
		var textcolor = $('.content_wrapper').css("color");
		var sidebarcolor = $('.footer_wrapper').css("color");
		var burgercolor = $('.burger_wrapper > div').css("background-color");

		$(window).scroll(function () {
			var y = $(this).scrollTop();
			if (breite >= 651) {
				if (y >= Math.round($(window).height() + $('.content_wrapper').height() + 310)) {
					$('.burger_wrapper > div').css("background-color", sidebarcolor);
				} else if (y >= $(window).height() - 40) {
					$('.burger_wrapper > div').css("background-color", textcolor);
				} else {
					$('.burger_wrapper > div').css("background-color", burgercolor);
				}
			}
		});

		// Fixing Burgerbutton in mobile
		$(function () {
			var position = $(window).scrollTop();
			$(window).scroll(function () {
				if ($(window).scrollTop() > $('.header_wrapper').height() && breite <= 650) {
					var scroll = $(window).scrollTop();
					if (scroll > position) {
						$('body').removeClass('fixed');
						$('body').addClass('scrolling');
					} else {
						$('body').removeClass('scrolling');
						$('body').addClass('fixed');
					}
					position = scroll;
				} else {
					$('body').removeClass('scrolling');
					$('body').removeClass('fixed');
				}
			});
		});


		// Navigation Title for mobile
		var str_mobile = jQuery('.cm_current:last > a').html();
		jQuery('.nav_name').html(str_mobile);

		function setCmEmptyForElements(element, hiddenElement) {
			if (jQuery(element).hasClass('cm_empty')) {
				if (hiddenElement == undefined) {
					jQuery(element).addClass('cm-templates-empty');
				} else {
					jQuery(hiddenElement).addClass('cm-templates-empty');
				}
			}
		}


		setTimeout(function () {

			// CM-EMPTY 
			setCmEmptyForElements('.cm-templates-footer');
			setCmEmptyForElements('#widgetbar_page_4');
			setCmEmptyForElements('#widgetbar_site_4');
			setCmEmptyForElements('.cm-templates-sidebar-container');
			setCmEmptyForElements('#title');
			setCmEmptyForElements('#subtitle');
			setCmEmptyForElements('.cm-templates-title-container');
			setCmEmptyForElements('#logo');
			setCmEmptyForElements('#widgetbar_page_1');
			setCmEmptyForElements('#widgetbar_page_2');
			setCmEmptyForElements('#widgetbar_site_1');
			setCmEmptyForElements('#widgetbar_site_2');
			setCmEmptyForElements('.footer_wrapper');

			if (jQuery('#logo').hasClass('cm_empty') && jQuery('#keyvisual').hasClass('cm_empty')) {
				if (jQuery('.title_wrapper').hasClass('cm_empty')) {
					jQuery('.header_wrapper').addClass('cm-templates-mobile-two');
				} else {
					jQuery('.header_wrapper').css('height', '50vh');
					jQuery('.header_wrapper').addClass('cm-templates-mobile-one');
				}
			}

			if (jQuery('#keyvisual').hasClass('cm_empty')) {
				jQuery('.scroll_down').addClass('cm-templates-empty');
			}

			if (jQuery('#keyvisual').hasClass('cm_empty') && jQuery('#logo').hasClass('cm_empty')) {
				jQuery('.title_wrapper').addClass('cm-template-title-wrapper__cm_empty');
			}

			if (jQuery('#widgetbar_site_1').hasClass('cm_empty') && jQuery('#widgetbar_page_1').hasClass('cm_empty')) {
				jQuery('.cm-templates-sidebar-two').addClass('cm-templates-empty');
			}

			if (jQuery('#widgetbar_page_2').hasClass('cm_empty') && jQuery('#widgetbar_site_2').hasClass('cm_empty')) {
				jQuery('.cm-templates-sidebar-one').addClass('cm-templates-empty');
			}

			if (jQuery('#title').hasClass('cm_empty')) {
				jQuery('#subtitle').addClass('cm-template-subtitle__mobil-only-available');
				jQuery('#subtitle').removeClass('cm-template-subtitle__mobil');
			} else if (jQuery('#subtitle').hasClass('cm_empty')) {
				jQuery('#title').addClass('cm-template-title__mobil-only-available');
				jQuery('#title').removeClass('cm-template-title__mobil');
			} else {
				jQuery('#title').addClass('cm-template-title__mobil');
				jQuery('#subtitle').addClass('cm-template-subtitle__mobil');
				jQuery('#title').removeClass('m-template-title__mobil-only-available');
				jQuery('#subtitle').removeClass('m-template-subtitle__mobil-only-available');
			}

		}, 100);

	});
})(jQuery);

function goToByScroll(id) {
	jQuery('html,body').animate({ scrollTop: jQuery(id).offset().top }, 'slow');
}


}
/*
     FILE ARCHIVED ON 12:49:08 Jul 28, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:02:31 Sep 23, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 8306.331
  exclusion.robots: 0.428
  exclusion.robots.policy: 0.17
  cdx.remote: 0.06
  esindex: 0.008
  LoadShardBlock: 66.51 (3)
  PetaboxLoader3.datanode: 102.063 (5)
  load_resource: 352.448 (2)
  PetaboxLoader3.resolve: 278.588 (2)
*/