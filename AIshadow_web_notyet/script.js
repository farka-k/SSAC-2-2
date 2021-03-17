
//  임시 코드
jquary(document).ready(function(){

    $('h img')
    .mouseover(function(){
        $(this).find('.square').stop().slidedown(500);
    });

    $(function(){ 
        $('.circle').click(function() {
            $('#modal').addClass('active').slblings().removeClass('active');
            return false;
        });
    });


});