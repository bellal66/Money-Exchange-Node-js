$('.account-det').click(function(){
    $('.account-side').removeClass('bg-info');
    $('.account-side').removeClass('card');
    $('.account-side').css('padding','0px 0px');
    $(this).css('padding','10px 10px');
    $(this).addClass('bg-info');
    $(this).addClass('card');
    $('.account-detail-0').show();
    $('.account-detail-1').hide();
})
$('.account-verification').click(function(){
    var verify = $(this).attr('verify');
    //alert(verify);
    $('.account-side').removeClass('bg-info');
    $('.account-side').removeClass('card');
    $('.account-side').css('padding','0px 0px');
    $(this).css('padding','10px 10px');
    $(this).addClass('bg-info');
    $(this).addClass('card');
    $('.account-detail-0').hide();
    $('.account-detail-1').show();
    var accountVerification = 0;
    $.ajax({
        method: 'post',
        url: '/account_verification',
        dataType: 'json',
        data: {
            accountVerification: accountVerification,
            verify: verify
        },
        success: function(data){
            $('.account-detail-1').html(data[0].result);
        }
    })
    
})
$('.account-level').click(function(){
    $('.account-side').removeClass('bg-info');
    $('.account-side').removeClass('card');
    $('.account-side').css('padding','0px 0px');
    $(this).css('padding','10px 10px');
    $(this).addClass('bg-info');
    $(this).addClass('card');
    $('.account-detail-0').hide();
    $('.account-detail-1').show();
})