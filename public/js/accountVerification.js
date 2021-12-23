$('.account-verification').click(function(){
    var verify = $(this).attr('verify');
    //alert(verify);
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
$('.phone-verification').click(function(){
    var verify = '+88' + $('#phone-verification-num').val();
    //alert(verify);
    $('.notice').html('Loading...');
    var phoneVerification = 0;
    $.ajax({
        method: 'post',
        url: '/phone_verification_num',
        dataType: 'json',
        data: {
            phoneVerification: phoneVerification,
            verify: verify
        },
        success: function(data){
            $('.notice').html(data[0].result);
        }
    })
    
})
$('.email-verification').click(function(){
    var verify = $('#email-verification').val();
    //alert(verify);
    $('.notice').html('Loading...');
    var emailVerification = 0;
    $.ajax({
        method: 'post',
        url: '/email_verification',
        dataType: 'json',
        data: {
            emailVerification: emailVerification,
            verify: verify
        },
        success: function(data){
            $('.notice').html(data[0].result);
            if(data[0].message == 'Yes of course'){
                $('.emailpin').removeClass('d-none');
            }
        }
    })
    
})
$('.document-verification').click(function(){
    var verify = $('#accountNid').files[0]; 
    alert(verify);
    $('.notice').html('Loading...');
    var documentVerification = 0;
    $.ajax({
        method: 'post',
        url: '/document_verification',
        dataType: 'json',
        data: {
            documentVerification: documentVerification,
            verify: verify
        },
        success: function(data){
            $('.notice').html(data[0].result);
            if(data[0].message == 'Yes of course'){
                $('.emailpin').removeClass('d-none');
            }
        }
    })
    
})