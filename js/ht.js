(function($) {
	"use strict";
	var HAINTHEMES = HAINTHEMES || {};

	/* Ultilities class
	-------------------------------------------------------------------------*/
	// Check if element exist
	$.fn.exists = function(callback) {
		var args = [].slice.call(arguments, 1);
		if (this.length) {
			callback.call(this, args);
		}
		return this;
	};

	/* Preload
	-------------------------------------------------------------------------*/
	HAINTHEMES.preload = function() {
		$("#ht-preload").slideUp(1000,'easeInOutExpo',function(){
			$(this).remove();
		});
	}

	/* Basic Initialize
	-------------------------------------------------------------------------*/
	HAINTHEMES.basicInit = function() {
		// Images
		$('img').addClass('img-responsive');
		// Placeholder
		$('input, textarea').exists(function(){
			$('input, textarea').placeholder();
		});
	};

	/* Back to top
	-------------------------------------------------------------------------*/
	HAINTHEMES.backToTop = function() {
		$('a#back-to-top').on('click', function(){
			$("html, body").animate({scrollTop : 0}, 1000 ,"easeInOutExpo");
			return false;
		});
		$('#ht-footer').find('.bottom').onScreen({
			doIn: function() {
				$(this).find('#back-to-top').addClass('relative');
			},
			doOut: function() {
				$(this).find('#back-to-top').removeClass('relative');
			}
		})
	};

	/* NavBar
	-------------------------------------------------------------------------*/
	HAINTHEMES.navBar = function() {
		
		
		$('#ht-header').sticky();
		$('#ht-header').on({
			'sticky-start' : function() {
				$(this).addClass('sticky');
				$('#back-to-top').addClass('visible');
				$('#ht-site-brand').addClass('logo');
			},
			'sticky-end' : function() {
				$(this).removeClass('sticky');
				$('#back-to-top').removeClass('visible');
				$('#ht-site-brand').removeClass('logo');
			}
		});
		// One page navbar
		$('#ht-navigation ul').onePageNav({
			currentClass: 'active',
			changeHash: true,
			scrollSpeed: 750,
			scrollThreshold: 1,
			filter: '',
			easing: 'easeInOutExpo',
		});
		// Sub nav toggle
		$('.ht-dropdown-toggle').on('click', function(){
			$(this).parent().find('.ht-dropdown-list').toggle(200);
		});
		// Animation sub-menu
		$("#ht-navigation li.ht-dropdown").on({
			mouseenter: function(e) {
				if($(window).width() >= 992) {
					$(this).find(".ht-dropdown-list")
						.css({display:"block"})
						.stop()
						.animate(
							{
								opacity: 1,
								top: '100%'
							},
							{
								duration: 300
							}
					);
				}
			},
			mouseleave: function(e) {
				if($(window).width() >= 992) {
					$(this).find(".ht-dropdown-list")
					.stop()
					.animate(
						{
							opacity: 0,
							top: '130%'
						},
						{
							duration: 300,
							complete : function() {
								$(this).css({display:"none"});
							}
						}
					);
				}
			}
		});
	};

	/* Reply comment
	-------------------------------------------------------------------------*/
	HAINTHEMES.commentReply = function() {
		$('.comment .content .reply-toggle').on('click', function() {
			if($(this).parent().find('form').length == 0) {
				$(this).parent().append('<form class="ht-form reply-form" method="post" action=""><input type="text" name="name" placeholder="Name" /><input type="text" name="email" placeholder="Email" /><textarea placeholder="Message"></textarea><input type="submit" name="submit" value="Submit" /></form>');
			}
			$('.comment .content .reply-toggle').html('&larr; Reply');
			$(this).parents().find('.reply-form').slideUp('fast');
			var state = $(this).parent().find('.reply-form').css('display');
			if (state === "block") {
				$(this).parent().find('.reply-form').slideUp({ duration: 500, easing: "easeOutBounce" });
				$(this).html('&larr; Reply');
			} else if (state != "block"){
				$(this).parent().find('.reply-form').slideDown({ duration: 500, easing: "easeOutBounce" });
				$(this).html('Cancel');
			}
		});
	}

	/* Brands
	-------------------------------------------------------------------------*/
	HAINTHEMES.brands = function() {
		$('.brands').exists(function(){
			$(".brands .entry img").each(function() {
				var title = $(this).attr("alt");
				$(this).parent().append('<span>'+title+'</span>');
			});
			$(window).load(function(){
				$(".brands .entry").each(function(){
					var imgHeight = $(this).children('img').height();
					if(imgHeight < $(this).height()) {
						var marginTop = ($(this).height() - imgHeight)/2;
						$(this).children('img').css('margin-top',marginTop)
					}
				});
			});
		});
		// Brands tooltip
		$(".brands .entry").bind({
			mouseenter: function(e) {
				$(this).find("span")
					.css({display:"block"})
					.stop()
					.animate(
						{
							opacity: 1,
							top: 120
						},
						{
							duration: 300
						}
				);
			},
			mouseleave: function(e) {
				$(this).find("span")
				.stop()
				.animate(
					{
						opacity: 0,
						top: 170
					},
					{
						duration: 300,
						complete : function() {
							$(this).css({display:"none"});
						}
					}
				);
			}
		});
	};

	/* Search bar
	-------------------------------------------------------------------------*/
	HAINTHEMES.searchBar = function() {
		// Search
		$("#ht-navigation li.search [data-st-toggle]").on("click", function(e) {
			var target = $(this).attr('data-st-toggle');
			var stage = $(target).css('display');
			if (stage === "none") {
				$(target).css({
					"display":"block",
					"left" : "+=67px"
				});
				$(target).animate({
					opacity: 1,
					left: "-167px"
				},
					300,
					function() {
						$(target).find("input").focus();
					}
				)
				$(this).parent().addClass("active");
			} else {
				$(target).animate({
					opacity: 0,
					left: "-67px"
				},
					300,
					function(){
						$(target).css({
							"display" : "none",
							"left" : "-67px"
						});
					}
				)
				$(this).parent().removeClass("active");
			}
			e.stopPropagation();
			e.preventDefault();
		});
		$("#ht-navigation li.search").on('click', function(e){
			e.stopPropagation();
		});
		$(document).on('click', function() {
			if($("#st-search").css("display") === "block") {
			   $("#st-search").animate({
						opacity: 0,
						left: "+=100"
					},
						300,
						function(){
							$("#st-search").css("display","none");
						}
					)
			   $("#ht-navigation li.search").removeClass("active");
			}
		});
	};

	/* Parallax
	-------------------------------------------------------------------------*/
	HAINTHEMES.parallaxGen = function() {
		$('[data-ht-parallax]').exists(function(){
			$('[data-ht-parallax]').each(function() {
				var dataMove = $(this).attr("data-ht-parallax");
				var dataAttrFrom, dataFrom, dataAttrTo, dataTo;
				if($(this).is('#ht-top-area')) {
					var height = $(this).outerHeight();
					dataAttrFrom = 'data-0';
					dataFrom = 'background-position:0px 0px';
					dataAttrTo = 'data-' + height;
					dataTo = 'background-position: 0px ' + dataMove + 'px';
				} else {
					dataAttrFrom = 'data-bottom-top';
					dataFrom = 'background-position: 0px -' + dataMove + 'px';
					dataAttrTo = 'data-top-bottom';
					dataTo = 'background-position:0px 0px';
				}
				$(this).attr(dataAttrFrom,dataFrom).attr(dataAttrTo,dataTo);
			});
		});
	};
	HAINTHEMES.parallaxInit = function() {
		var vW = $(window).width();
		if( vW >= 768) {
			var smooth;
			if ( $.browser.chrome || $.browser.opera) {
				smooth = false;
			} else {
				smooth = true;
			}
			var s = skrollr.init({
				forceHeight: false,
				smoothScrolling: smooth
			});
		} else {
			var s = skrollr.init();
			s.destroy();
		}
		if(Modernizr.touch) {
			var s = skrollr.init();
			s.destroy();
		}
	}

	// Reinvoke parallax in case document's height change
	var parallaxReInit = function() {
		skrollr.init().destroy();
		HAINTHEMES.parallaxInit();
	}

	/* Smooth anchor link scroll
	-------------------------------------------------------------------------*/
	HAINTHEMES.smoothScrollTo = function() {
		$('a[href*=#]:not([href=#])').on('click', function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname && $(this).hasClass('scroll-to')) {
				var target = $(this.hash);
				console.log(target);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
					  scrollTop: target.offset().top - 60
					}, 1000, "easeInOutExpo", function(){
						$(this).stop();
					});
					return false;
				}
			}
		});
	};

	/* Collapse Target Element
	-------------------------------------------------------------------------*/
	HAINTHEMES.collapseTarget = function() {
		$('.ht-navbar-toggle').on('click', function(){
			var target = $(this).attr('data-target');
			$(this).parents().find(target).toggle(200);
		});
	};

	/* Collapse Target Element
	-------------------------------------------------------------------------*/
	HAINTHEMES.invokeIsotope = function() {
		$('#filter-container').exists(function(){
			$('#filter-container').isotope({
				itemSelector: '.portfolio-item',
				layoutMode: 'fitRows',
				transitionDuration: '1s'
			});
			$('#filter-controller a').on( 'click', function() {
				var filterValue = $(this).attr('data-filter');
				$('#filter-container').isotope({
					filter: filterValue,
					transitionDuration: '1s'
				});
				return false;
			});
		});
	};

	/* Slider
	-------------------------------------------------------------------------*/
	HAINTHEMES.slider = function() {
		$('#ht-top-area').each(function(){
			var $this = $(this);
			$this.find('.flexslider').flexslider({
				animation		:	$this.data('effect'),
				direction		:	$this.data('direction'),
				controlNav		:	$this.data('pager'),
				directionNav	:	$this.data('navi'),
				slideshow		:	$this.data('auto'),
				easing			:  "easeInOutExpo",
				useCSS			:  false,
				pauseOnHover	:	true,
				animationSpeed	:	1000,
				slideshowSpeed	:	5000,
				smoothHeight	:	true,
				prevText		:	'<span class ="glyphicon glyphicon-chevron-left"></span>',
				nextText		:	'<span class ="glyphicon glyphicon-chevron-right"></span>',
			});
		});
		$('.ht-flexslider.basic').exists(function(){
			$('.ht-flexslider.basic').each(function(){
				var $this = $(this);
				$this.flexslider({
					animation		:	$this.data('effect'),
					direction		:	$this.data('direction'),
					easing			:  "easeInOutExpo",
					useCSS			:  false,
					pauseOnHover	:	true,
					// animationSpeed	:	800,
					slideshowSpeed	:	5000,
					controlNav		:	$this.data('pager'),
					directionNav	:	$this.data('navi'),
					slideshow		:	$this.data('auto'),
					smoothHeight	:	true,
					prevText		:	'<span class ="glyphicon glyphicon-chevron-left"></span>',
					nextText		:	'<span class ="glyphicon glyphicon-chevron-right"></span>',
				});
			});
		});

		$('.ht-flexslider-carousel').exists(function(){
			$('.ht-flexslider-carousel').each(function(){
				var $slider = $(this).find('#slider');
				var $carousel = $(this).find('#carousel');
				// Carousel must be initialize before slider
				$carousel.flexslider({
					asNavFor			:  '#slider',
					animation		:	"slide",
					directionNav	:	$carousel.data('navi'),
					itemWidth		:  $carousel.data('item-width'),
					controlNav		:	false,
					animationLoop	:  false,
					itemMargin		:  0,
					prevText		:	'<span class ="glyphicon glyphicon-chevron-left"></span>',
					nextText		:	'<span class ="glyphicon glyphicon-chevron-right"></span>',
				});
				$slider.flexslider({
					sync				: 	'#carousel',
					animation		:	$slider.data('effect'),
					controlNav		:	$slider.data('pager'),
					directionNav	:	$slider.data('navi'),
					slideshow		:	$slider.data('auto'),
					animationLoop	:  false,
					easing			:  "easeInOutExpo",
					useCSS			:  false,
					pauseOnHover	:	true,
					animationSpeed	:	800,
					slideshowSpeed	:	5000,
					smoothHeight	:	true,
					prevText		:	'<span class ="glyphicon glyphicon-chevron-left"></span>',
					nextText		:	'<span class ="glyphicon glyphicon-chevron-right"></span>',
				});
			});
		});

		$(".ht-owl-carousel").exists(function(){
			$(".ht-owl-carousel").each(function(){
				var item = $(this).data('item');
				if($(this).data('navi-color') === 'light') {
					$(this).addClass('light');
				} else if($(this).data('navi-color') === 'dark') {
					$(this).addClass('dark');
				}
				$(this).owlCarousel({
					// Most important owl features
					items : item[0],
					itemsCustom : false,
					itemsDesktop : [1199,item[1]],
					itemsDesktopSmall : [991,item[2]],
					itemsTablet: [767,item[3]],
					itemsTabletSmall: false,
					itemsMobile : [479,item[4]],
					singleItem : false,
					itemsScaleUp : true,
					//Basic Speeds
					slideSpeed : 1000,
					paginationSpeed : 1000,
					rewindSpeed : 500,
					//Autoplay
					autoPlay : 5000,
					stopOnHover : true,
					// Navigation
					navigation : $(this).data('navi'),
					navigationText : [
						'<span class ="glyphicon glyphicon-chevron-left"></span>',
						'<span class ="glyphicon glyphicon-chevron-right"></span>'
					],
					rewindNav : true,
					scrollPerPage : false,
					//Pagination
					pagination : $(this).data('pager'),
					paginationNumbers: false,
					// Responsive
					responsive: true,
					responsiveRefreshRate : 100,
					responsiveBaseWidth: window,
					// CSS Styles
					baseClass : "owl-carousel",
					theme : "owl-theme",
					//Lazy load
					lazyLoad : true,
					lazyFollow : true,
					lazyEffect : "fade",
					//Auto height
					autoHeight : $(this).data('auto-height'),
					//Mouse Events
					dragBeforeAnimFinish : true,
					mouseDrag : $(this).data['mouse-drag'],
					touchDrag : $(this).data['touch-drag'],
					//Transitions
					transitionStyle : "fadeUp",
					// Other
					addClassActive : false,
				});
			});
		});

	};

	/* Masonry layout
	-------------------------------------------------------------------------*/
	HAINTHEMES.masonryLayout = function() {
		$('.masonry-layout').exists(function(){
			$('.masonry-layout').each(function(){
				$(this).isotope({
					layoutMode: 'masonry'
				});
			});
		});
	};

	/* Star Rating
	-------------------------------------------------------------------------*/
	HAINTHEMES.starRating = function() {
		$('.ht-rating').each(function(){
			if($(this).hasClass('rated')) {
				$(this).find('.rating-input').click(false);
				$(this).find('input:eq(' + (5 - $(this).data("rated")) + ')').attr('checked','');
			}
		});
		$('.ht-rating .rating-input').on('click', function(){
			$(this)
				.parent().find('.rating-input').click(false)
				.parent().addClass('rated');
		});
	}

	/* String Limy
	-------------------------------------------------------------------------*/
	HAINTHEMES.stringLimit = function() {
		var strLimit = function($object, len) {
			$object.exists(function(){
				$(this).each(function(){
					if($(this).text().length > len) {
						$(this).text($(this).text().substr(0, len - 2));
						$(this).append('...');
					}
				});
			});
		}
		strLimit($('.heading-area h2 span'), 11);
	}

	/* Shortcode
	-------------------------------------------------------------------------*/
	HAINTHEMES.shortcode = function() {
		// Toggle & Accordion
		$('.ht-toggle .tgl-entry').each(function(){
			if($(this).hasClass('open')) {
				$(this).find('.tgl-title span').html("-");
			}
		})
		$('.ht-toggle .tgl-title').on('click', function() {
			var $root = $(this).parent().parent();
			if($root.hasClass('ht-accordion')) {
				$root.find('.tgl-title span').html('+');
				$root.find('.tgl-content').slideUp({ duration: 500, easing: "easeInOutExpo" });
				console.log("accordion");
			}
			var state = $(this).parent().find('.tgl-content').css('display');
			if (state === "block") {
				$(this).parent().find('.tgl-content').slideUp({ duration: 500, easing: "easeInOutExpo" });
				$(this).children('span').html('+');
			} else if (state != "block"){
				$(this).parent().find('.tgl-content').slideDown({ duration: 500, easing: "easeInOutExpo" });
				$(this).children('span').html('-');
			}
		});
		// Circular progress
		$('.ht-circular-progress').exists(function(){
			$(this)
			.each(function(){
				$(this).find('.percent').css({
					'line-height':$(this).data('size') + 'px'
				});
				$(this).easyPieChart({
					animate   : ({ duration: 2000, enabled: true }),
					barColor  : $(this).data('color'),
					trackColor: 'rgba(0,0,0,0.1)',
					scaleColor: false,
					lineCap   : 'round', // Possible values are: butt, round and square.
					lineWidth : $(this).data('line-width'),
					size      : $(this).data('size'),
					onStep: function(from, to, percent) {
						$(this.el).find('.percent .number').text(Math.round(percent));
					}
				});
			})
			.onScreen({
				doIn: function() {
					$(this).each(function(){
						$(this).data('easyPieChart').update($(this).data('percent'));
					});
				}
			});
		});

		// Bar progress
		$(".skillbar").exists(function(){
			$(this).onScreen({
				doIn: function() {
					$('.skillbar').each(function(){
						var percent = $(this).attr('data-percent');
						$(this).find('.skillbar-bar').animate(
							{ width: percent },
							2000,
							"easeOutExpo"
						);
						$(this).find('.skill-bar-percent').text(percent);
					});
				},
				doOut: function() {
					$('.skillbar').each(function(){
						$(this).find('.skillbar-bar').stop();
					});
				}
			});
		});

		// Columns text
		$('.ht-column-text').each(function(){
			$(this).columnize({
				columns: $(this).data('column'),
				lastNeverTallest : true,
				cssClassPrefix : ""
			});
		});

		// List style
		$('.ht-list.ht-fa').each(function(){
			$(this).find('li').prepend('<i class="' + $(this).data('fa') + '"></i>');
		});

		// Lightbox Gallery
		$('.ht-lightbox-gallery').exists(function(){
			var idCounter = 1;
			$('.ht-lightbox-gallery').each(function(){
				var galleryId = 'ht-lightbox-gallery' + idCounter;
				idCounter++;
				$(this)
					// .attr('id',galleryId)
					.find('li').each(function(){
						$(this).append('<a data-lightbox-gallery="' + galleryId + '" href="' + $(this).find('img').attr('src') + '" title="' + $(this).find('img').attr('alt') + '" class="fa fa-search nivo-lightbox"></a>')
					})
					.find('img').each(function(){
						$(this).wrap('<a class="overlay"></a>');
					});
			});
		});
	}

	/* Animation
	-------------------------------------------------------------------------*/
	HAINTHEMES.animation = function() {
		$('[data-animation]').addClass('invisible');
		$('[data-animation]').exists(function(){
			$('[data-animation]').onScreen({
				doIn: function() {
					var animationData = 'animated-2s ' + $(this).data('animation');
					$(this).addClass(animationData).removeClass('invisible');
				}
			});
		});
	};

	/* Google-Map
	-------------------------------------------------------------------------*/
	HAINTHEMES.googleMapAPI = function() {
		$('.ht-map').exists(function(){
			var mapCounter = 1;
			$('.ht-map').each(function(){
				$(this).attr('id','ht-map-'+ mapCounter);
				mapCounter++;
				var coor = $(this).data('coor');
				var id = $(this).attr('id');
				var zooming = $(this).data('zoom');
				var mapType = $(this).data('map-type');
				var controlUI = $(this).data('control-ui') ? false : true;
				var scrollWheel = $(this).data('scroll-wheel');
				var marker = $(this).data('marker');

				$(this).css('height',$(this).data('height'));

				function initialize() {
					var map_canvas = document.getElementById(id);
					var myLatlng = new google.maps.LatLng(coor[0],coor[1]);
					var map_options = {
						center: myLatlng,
						zoom: zooming,
						mapTypeId: mapType,
						disableDefaultUI: controlUI,
						scrollwheel: scrollWheel
					}
					var map = new google.maps.Map(map_canvas, map_options);
					var marker = new google.maps.Marker({
						position: myLatlng,
						map: map,
						title: marker
					});
				}
				google.maps.event.addDomListener(window, 'load', initialize);
			});
		});
	};

	/* Other plugin
	-------------------------------------------------------------------------*/
	HAINTHEMES.otherPlugin = function() {
		$('.video-background').each(function(){
			var id = $(this).attr('data-video-id');
			var $this = $(this).find('#video-background');
			$this.tubular({
				ratio: 16/9,
				videoId: id,
				mute: $(this).data('mute'),
				repeat: $(this).data('repeat'),
				width: $(window).width(),
				wrapperZIndex: 1,
				playButtonClass: 'tubular-play',
				pauseButtonClass: 'tubular-pause',
				muteButtonClass: 'tubular-mute',
				volumeUpClass: 'tubular-volume-up',
				volumeDownClass: 'tubular-volume-down',
				increaseVolumeBy: 10,
				start: $(this).data('start')
			});
		});
		$('a.nivo-lightbox').nivoLightbox({
			effect: 'fadeScale',
			theme: 'default',
			keyboardNav: true,
			clickOverlayToClose: true,
			onInit: function(){},
			beforeShowLightbox: function(){},
			afterShowLightbox: function(lightbox){},
			beforeHideLightbox: function(){},
			afterHideLightbox: function(){},
			onPrev: function(element){},
			onNext: function(element){},
			errorMessage: 'The requested content cannot be loaded. Please try again later.'
		});
		$('.ht-counter').counterUp({
			delay: 10,
			time: 1000
		});
		$('.bigtext').each(function(){
			$(this).bigtext();
		});
		$('#ht-top-area .social-icon a').on({
			mouseenter: function() {
				$(this).find('i.fa')
				.addClass('swing')
				.delay(1000).queue(function() {
					$(this).removeClass('swing').dequeue();
				});
			}
		});
	};

	/* Demo portfolio ajax
	-----------------------------------------------------------------------------*/
	HAINTHEMES.demoAjaxPortfolio = function() {
		var demoTime = 1000;
		// Get all portfolio item
		var portItems = [];
		var portCount = 1;
		$('#section-portfolio .portfolio-grid .portfolio-item a').each(function(){
			var portId = "port-item-" + portCount;
			$(this).attr('id',portId);
			portItems.push(portId);
			portCount++;
		})
		// Ajax loading portfolio item
		$('#section-portfolio .portfolio-grid a').on('click', function(e) {
			var portId = $(this).attr('id');
			$("html, body").animate({scrollTop : $('#section-portfolio div.portfolio-single').offset().top - 60}, 500);
			$('#section-portfolio div.portfolio-single').addClass('is-loading');
			$('#section-portfolio .portfolio-grid div.inner').removeClass('active');
			$(this).parent().addClass('active');
			$('#section-portfolio .portfolio-single div.port-loading').fadeIn(800);
			$.ajax({
				url : $(this).attr('href'),
				success : function(result) {
					var insert = function() {
						$("#section-portfolio .portfolio-single div.port-content").html(result);
						$("#section-portfolio .portfolio-single").attr('id',portId).addClass('has-content');
						HAINTHEMES.basicInit();
						HAINTHEMES.slider();
						$('#section-portfolio .portfolio-single div.port-loading').fadeOut(200, function() {
							$("#section-portfolio .portfolio-single").removeClass('is-loading');
						});
					}
					setTimeout(insert, demoTime);
					setTimeout(parallaxReInit, demoTime+200);
				}
			});
			e.preventDefault();
		});
		// Next & Previous button
		$('#section-portfolio .portfolio-single .port-control .port-direction a').on('click', function(e) {
			var currentPortIndex = portItems.indexOf($('#section-portfolio .portfolio-single').attr('id'));
			if($(this).hasClass('prev')) {
				var incomingIndex;
				if(currentPortIndex == 0) {
					incomingIndex = portItems.length - 1;
				} else {
					incomingIndex = currentPortIndex - 1;
				}
				$('#section-portfolio .portfolio-grid .inner').removeClass('active');
				$('#section-portfolio .portfolio-grid a#' + portItems[incomingIndex]).trigger('click').parent().addClass('active');
			} else if ($(this).hasClass('next')) {
				var incomingIndex;
				if(currentPortIndex == portItems.length - 1) {
					incomingIndex = 0;
				} else {
					incomingIndex = currentPortIndex + 1;
				}
				$('#section-portfolio .portfolio-grid .inner').removeClass('active');
				$('#section-portfolio .portfolio-grid a#' + portItems[incomingIndex]).trigger('click').parent().addClass('active');
			}
			e.preventDefault();
		})
		// Close Button
		$('#section-portfolio .portfolio-single .port-control a.port-close').on('click', function() {
			$(this).parent().parent().parent().removeClass('has-content');
			$('#section-portfolio .portfolio-grid div.inner').removeClass('active');
			parallaxReInit();
			e.preventDefault();
		})
	}

	HAINTHEMES.fullHeightTopArea = function() {
		var vh = $(window).height();
		$('#ht-top-area.full-height').css({
			height: vh
		});
	}

	/* Style switcher
	-------------------------------------------------------------------------*/
	HAINTHEMES.styleSwitcher = function() {
		$('#ht-style-switcher').exists(function(){
			$('#ht-style-switcher .toggle').on('click', function(){
				$(this).toggleClass('active');
				$('#ht-style-switcher').toggleClass('active');
			});
			$('#ht-style-switcher .change-nav li').on('click', function(){
				$('#ht-header').removeClass('dark-navigation').addClass($(this).data('nav'));
			})
			$('#ht-style-switcher .change-color li').on('click', function(){
				$('#preview-color').attr('href',$(this).data('theme'));
				$('#ht-site-brand img').attr('src', $(this).data('logo'));
				var colorCode = $(this).attr('class').substr(6,7);
				$('#section-portfolio .portfolio-single .port-loading img').exists(function(){
					$(this).attr('src', 'images/ajax-loading-' + colorCode + '.gif');
				})
			})
		});
	};

	/* Init Functions
	-------------------------------------------------------------------------*/
	$(document).ready(function() {
		HAINTHEMES.basicInit();
		HAINTHEMES.searchBar();
		HAINTHEMES.backToTop();
		HAINTHEMES.navBar();
		HAINTHEMES.commentReply();
		HAINTHEMES.smoothScrollTo();
		HAINTHEMES.collapseTarget();
		HAINTHEMES.invokeIsotope();
		HAINTHEMES.shortcode();
		HAINTHEMES.googleMapAPI();
		HAINTHEMES.otherPlugin();
		HAINTHEMES.masonryLayout();
		HAINTHEMES.starRating();
		HAINTHEMES.styleSwitcher();
		HAINTHEMES.stringLimit();
		HAINTHEMES.animation();
		HAINTHEMES.slider();
		HAINTHEMES.demoAjaxPortfolio();
		HAINTHEMES.fullHeightTopArea();
		HAINTHEMES.parallaxGen();
	});

	$(window).load(function(){
		setTimeout(HAINTHEMES.parallaxInit, 100);
		HAINTHEMES.brands();
		HAINTHEMES.preload();
	});

	$(window).on('resize', function(){
		HAINTHEMES.parallaxInit();
		HAINTHEMES.masonryLayout();
		HAINTHEMES.fullHeightTopArea();
	});

})(jQuery); // EOF