
$(document).ready(function(){
  $('#currencyReceive').text('Loading..');
  function get_currency_receive(){
    var currencyId = $('.currencyPer1').attr('currencyId')
    $.ajax({
        url: '/currencyReceive',
        method: 'POST',
        dataType: 'json',
        data: {
          currencyId: currencyId
        },
        success: function(data){
            var html = '';
            if(data[0].data.length > 0){
                for(var i=0; i<data[0].data.length; i++){
                    html +='<li class="list-group-item">'+data[0].data[i].currencyId
                    html +=  '<span class="float-right">'+data[0].data[i].balance+' USD</span>';
                    html +='</li>';
                }
                $('#currencyReceive').html(html);
            }else{
                $('#currencyReceive').text(data[0].message + ' '+ data[0].data);
            }
        }
    })
  }
  $('#currencyAvailable').text('Loading...');
  function get_available_currency(){
      var html = '';
      $.ajax({
          url: '/currencyAvailable',
          method: 'post',
          dataType: 'json',
          success: function(data){
            if(data[0].data.length > 0){
                for(var i=0; i<data[0].data.length; i++){
                    html +='<li class="list-group-item">'+data[0].data[i].currencyId;
                    html +=  '<span class="float-right">'+data[0].data[i].balance+' USD</span>';
                    html +='</li>';
                }
                $('#currencyAvailable').html(html);
            }else{
                $('#currencyAvailable').text(data[0].message + ' '+ data[0].data);
            }
          }
      })
  }
  $('#buy-sell-rate').text('Loading...');
  function get_buy_sell_rate(){
      var html = '';
      $.ajax({
          url: '/currencyBuySell',
          method: 'post',
          dataType: 'json',
          success: function(data){
              if(data[0].data.length > 0){
                  for(var i=0; i<data[0].data.length; i++){
                      html += '<tr>';
                      html +=   '<td>'+data[0].data[i].currencyId+'</td>';
                      html +=   '<td>'+data[0].data[i].sellPrice+' USD</td>';
                      html +=   '<td>'+data[0].data[i].buyPrice+' USD</td>';
                      html += '</tr>';
                  }
                  $('#buy-sell-rate').html(html)
              }else{
                  $('#buy-sell-rate').text(data[0].message+' '+data[0].data)
              }
          }
      })
  }
  $('#currency-exchange').text('Loading...');
  function get_currency_exchange(){
      var html = '';
      $.ajax({
          url: '/currencyExchange',
          method: 'post',
          dataType: 'json',
          success: function(data){
              if(data[0].data.length > 0){
                  for(var i=0; i<data[0].data.length; i++){
                      html += '<tr>';
                      html +=   '<td>'+data[0].data[i].send+'</td>';
                      html +=   '<td>'+data[0].data[i].receive+'</td>';
                      html +=   '<td>'+data[0].data[i].amount+' USD</td>';
                      if(data[0].data[i].status == 0){
                          html +=   '<td> <span class="badge bg-blue"><i class="fas fa-spinner"></i> Pending</span> </td>';
                      }else if(data[0].data[i].status == 1){
                        html +=   '<td> <span class="badge bg-green">Complete</span> </td>';
                      }else if(data[0].data[i].status == 5){
                        html +=   '<td><span class="badge bg-red">Timeout</span></td>';
                      }
                      html +=   '<td>'+data[0].data[i].date+'</td>';
                      html += '</tr>';
                  }
                  $('#currency-exchange').html(html)
              }else{
                  $('#currency-exchange').text(data[0].message+' '+data[0].data)
              }
          }
      })
  }
  get_currency_receive();
  get_available_currency();
  get_buy_sell_rate();
  get_currency_exchange();
  $('.currencyPer').click(function(){
      $('.currencyPer').removeClass('bg-primary')
      $(this).addClass('bg-primary')
      var currencyId = $(this).attr('currencyId');
      $('#currencyReceive').text('Loading..');
      $.ajax({
          url: '/currencyReceive',
          method: 'POST',
          dataType: 'json',
          data: {
            currencyId: currencyId
          },
          success: function(data){
            var html = '';
            if(data[0].data.length > 0){
                for(var i=0; i<data[0].data.length; i++){
                    html +='<li class="list-group-item">'+data[0].data[i].currencyId
                    html +=  '<span class="float-right">'+data[0].data[i].balance+' USD</span>';
                    html +='</li>';
                }
                $('#currencyReceive').html(html);
            }else{
                $('#currencyReceive').text(data[0].message + ' '+ data[0].data);
            }
          }
      })
  })
})
