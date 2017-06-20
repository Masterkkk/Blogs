$('.fenlei ul a').click(function(){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var name = $(this).find('li').text();
    console.log(name);
    $.ajax({
        url: '/home/' + name,
        type: 'get',
        data: {name: name},
        success: function(res){
            console.log('分类请求成功');
            var html = res;
            $('main').html(html);
        },
        
        error: function(err){
            console.dir(err);
        }
    });
});
