// Initialise FlexSlider for Carousel
$(window).load(function() {
    $('.flexslider').flexslider({
    animation: "fade",
    animationLoop: true,
    //controlNav: "thumbnails",
    //directionNav: true,
    useCSS : false,
    smoothHeight: true, 
    initDelay: 2000,
    slideshow: true,
    slideshowSpeed: 2000,
    animationSpeed: 600,
    easing: "swing",
    direction: "horizontal",
    touch: true
    });
});