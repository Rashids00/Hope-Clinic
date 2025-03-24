
    $(document).ready(function() {
        $('.accordion-header').click(function() {
            
            $(this).toggleClass('active');
            
            var content = $(this).next('.accordion-content');
            
            if ($(this).hasClass('active')) {
                content.addClass('active');
                content.css('max-height', content.prop('scrollHeight') + "px");
                
            } else {
                content.removeClass('active');
                content.css('max-height', 0);        
            }
        });
    });
