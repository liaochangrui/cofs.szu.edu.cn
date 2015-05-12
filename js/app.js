// Initialise FlexSlider for Carousel
$(window).load(function() {
    $('.flexslider').flexslider({
    animation: "fade",
    animationLoop: true,
    //controlNav: "thumbnails",
    //directionNav: true,
    useCSS : false,
    smoothHeight: true,
    initDelay: 1000,
    slideshow: true,
    slideshowSpeed: 5000,
    animationSpeed: 600,
    easing: "swing",
    direction: "horizontal",
    controlNav: true,
    directionNav: false,
    touch: true
    });
});