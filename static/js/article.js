
    function add_article(id){
    alert(id);
    $.ajax({
        url: '/article',
        type: 'POST',
        data: {a:'b',c:'d'},
        success: function(result) {
            alert('add'+result);
        },
        error: function(result) {
            alert('add2'+result);
        },
    });
    }
    function delete_article(url, id){
        function del(){
            var $li = $('li[_id='+id+']');
            $li.animate({padding:'0 0 0 90px;', height:"0px"},function(){
                $li.remove();
            })
        };  
        //.remove();
        //.animate({height:"0px"});
        //return;
        var self = this;
        $.ajax({
            url: '/'+url+'/' + id,
            type: 'DELETE',
            data: {a:'b',c:'d'},
            success: function(result) {
                del();
                // $('li[_id='+id+']').remove();
                // alert('del'+id+ result);
            },
            error: function(result) {
                alert('del2'+id + result);
            },
        });
    }
    function put_article(id){
    alert(id);
    $.ajax({
        url: '/article/' + id,
        type: 'PUT',
        data: {a:'b',c:'d'},
        success: function(result) {
            alert('del'+id);
        },
        error: function(result) {
            alert('del2'+id);
        },
    });
    }