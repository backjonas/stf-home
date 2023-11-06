;(function () {
	'use strict';

	// iPad and iPhone detection
	var isiPad = function() {
		return (navigator.platform.indexOf("iPad") != -1);
	};
	var isiPhone = function() {
		return (
			(navigator.platform.indexOf("<i></i>Phone") != -1) || (navigator.platform.indexOf("iPod") != -1)
		);
	};

	var fullHeight = function() {
		if ( !isiPad() && !isiPhone() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).on('resize', function() {
				$('.js-fullheight').css('height', $(window).height());
			})
		}
	};

	var sliderMain = function() {
		$('#stf-home .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 4000
		});

		$('#stf-home .flexslider .slides > li').css('height', $(window).height());
		$(window).on('resize', function(){
			$('#stf-home .flexslider .slides > li').css('height', $(window).height());
		});
	};

	// redirect page
	var redirectPage = function(url) {
		window.location = url;
	}

	var scrolledWindow = function() {
		$(window).on('scroll', function() {
			var header = $('#stf-header'),
				scrlTop = $(this).scrollTop();
			if ( scrlTop > 300 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top stf-animated animate__slideInDown');
			} else if ( scrlTop <= 300) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top stf-animated animate__slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top stf-animated animate__slideInDown animate__slideOutUp');
					}, 100 );
				}
			}
			$('#stf-home .flexslider .stf-overlay').css({
				'opacity' : (.5)+(scrlTop/2000)
			});
		});
	};

	// page Nav
	var clickMenu = function() {
		var topVal = ( $(window).width() < 769 ) ? 0 : 58;

		$(window).on('resize', function() {
			topVal = ( $(window).width() < 769 ) ? 0 : 58;
		});

		if ( $(this).attr('href') != "#") {
			$('#stf-main-nav a:not([class="external"])').on('click', function(event) {
				var section = $(this).data('nav-section');

				if ( $('div[data-section="' + section + '"]').length ) {
					$('html, body').animate({
			        	scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
			    	}, 500);
			   }
			   event.preventDefault();
			});
		}
	};

	// reflect scrolling in navigation
	var navActive = function(section) {
		$('#stf-main-nav li').removeClass('active');
		$('#stf-main-nav').find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
	};

	var navigationSection = function() {
		var $section = $('div[data-section]');

		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animate__animated') ) {
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k) {
						var el = $(this);
						setTimeout( function () {
							el.addClass('animate__fadeInUp animate__animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
				}, 100);
			}
		} , { offset: '85%' } );
	};

	// document on load
	$(function() {
		fullHeight(); // full height on stf-home
		sliderMain(); // main page flexslider
		scrolledWindow(); // show menu when scrolled down
		clickMenu(); // menu functions
		navigationSection(); // indicate navigation section
		contentWayPoint(); // text animation
	});
}());
