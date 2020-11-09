/*
Copyright (c) 2017 
------------------------------------------------------------------
[Master Javascript]

Project:	Responsive Video Theme Template

-------------------------------------------------------------------*/
(function($) {
    "use strict";
    var landingpage = {
        initialised: false,
        version: 1.0,
        mobile: false,
        init: function() {

            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }

            /*-------------- Video Theme Functions Calling ---------------------------------------------------
            ------------------------------------------------------------------------------------------------*/
            this.MailFunction();
            this.Magnific_popup();
            this.Category_slider();
            this.Video_slider();
            this.mob_menu();
            this.Thumb_slider();
            this.Custom_tab();

        },

        /*-------------- Video Theme html definition ---------------------------------------------------
        ---------------------------------------------------------------------------------------------------*/

        //Help mail function	
        MailFunction: function() {
$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var number = $("#number").val();
    var subject = $("#subject").val();
    var message = $("#message").val();

    $.ajax({
        type: "POST",
        url: "contactmail.php",
        data: "name=" + name + "&email=" + email + "&number=" + number + "&subject=" +  subject +"&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);   
            }
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(){
    $("#contactForm").removeClass().addClass('animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
		},

		
		//Magnific_popup
        Magnific_popup: function() {
            if ($(".play_video").length > 0) {
                $(".play_video").magnificPopup({
                    type: 'iframe'
                });
            }
            if ($(".video_popup").length > 0) {
                $(".video_popup").magnificPopup({
                    type: 'inline'
                });
            }
        },

		// Category slider	
        Category_slider: function() {
            var swiper = new Swiper('.post_category_slider .swiper-container', {
                nextButton: '.category-one-next',
                prevButton: '.category-one-prev',
                slidesPerView: 4,
                paginationClickable: true,
                spaceBetween: 15,
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    480: {
                        slidesPerView: 2,
                        // spaceBetween: 75,
                    },
                    375: {
                        slidesPerView: 1,
                    }
                }
            });
        },
		//Video Slider

        Video_slider: function() {
            var swiper = new Swiper('.vt_video_slider .swiper-container', {
                nextButton: '.video-button-next',
                prevButton: '.video-button-prev',
                slidesPerView: 4,
                paginationClickable: true,
                spaceBetween: 0,
                grabCursor: true,
                breakpoints: {
                    1024: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    480: {
                        slidesPerView: 1,
                    },
                    375: {
                        slidesPerView: 1,
                    }
                }
            });


        },

        //Mobile menu
        mob_menu: function() {
            $(".vt_menu_btn").click(function() {
                $(".vt_menu_section").addClass('open_menu');
            });
            $(".vt_menu_close").click(function() {
                $(".vt_menu_section").removeClass('open_menu');
            });
        },
        //Main Slider
        Thumb_slider: function() {
            var galleryTop = new Swiper('.thumb_banner_slider .gallery-top', {
                spaceBetween: 10,
                loop: true,
                parallax: true,
                speed: 600,
                autoplay: false,
                effect: 'fade',
            });
            $('.thumb_banner_slider .gallery-top .play_button').click(function(event) {
                event.preventDefault();
                $('.swiper-slide-active .vt_slide_wrapper').removeClass("active");
                var target = $(this).closest('.vt_slide_wrapper');
                target.addClass("active");
                var sourse = target.find('.vt_slide_iframe iframe').attr('src');

                if ($(this).hasClass('play')) {
                    $(this).removeClass("play").addClass('pause');
                    target.find('.vt_slide_iframe iframe').attr('src', sourse.split('?')[0] + "?rel=0&controls=0&showinfo=0&rel=0&autoplay=1");
                } else {
                    $(this).removeClass("pause").addClass('play');
                    target.find('.vt_slide_iframe iframe').attr('src', sourse.split('?')[0] + "?rel=0&controls=0&showinfo=0&rel=0");
                }


            });



        },
		//Tabs
        Custom_tab: function() {
            $("[data-toggle='tab']").click(function() {
                var tabs = $(this).attr('data-tabs');
                var tab = $(this).attr("data-tab");
                $(tabs).find(".vt_tab_content").removeClass("active");
                $(tabs).find(tab).addClass("active");
            });
            $('.vt_tab_content .play_button').click(function(event) {
                event.preventDefault();
                $(this).addClass("hide");
                $('.vt_tab_content.active .vt_post_img').addClass("active");
            })
        },

    };

    $(document).ready(function() {
        landingpage.init();
    });

    // Load Event

    $(window).on('load', function() {
        jQuery(".loader").fadeOut();
        jQuery(".loader").delay(600).fadeOut("slow");


    });


    //On scroll fixed menu
    $(window).scroll(function() {
        var wh = window.innerWidth;
        if (wh > 767) {
            var h = window.innerHeight;
            var window_top = $(window).scrollTop() + 1;
            if (window_top > 100) {
                $('.vt_header_section ').addClass('vt_fixed');
            } else {
                $('.vt_header_section ').removeClass('vt_fixed');
            }
        }

    });

})(jQuery);