$(document).ready(function () {
    $("#search").click(function (e) { 
        $("#container").html("");
        //console.log("olaaaaa");
            var radioValue = $("input[name='type']:checked").val();
            var url = 'http://localhost/tcc-solution-api-master/api/v1/idea';
            var searchValue = $('#searchField').val();
            console.log(searchValue);
            if (radioValue && searchValue) {
                url = url + '?' + radioValue + '=' + searchValue;
            } else if (searchValue) {
                url = url + '?title=' + searchValue + '&category=' + searchValue + '&user=' + searchValue;
            } else {
                url = url + '?title=' + searchValue + '&category=' + searchValue + '&user=' + searchValue;
            }
            
            $.ajax({
                type: 'GET',
                url: url,
                success: function(response) {
                     if (response.success) {
                        $.each(response.idea, function(i, item) {
                            var $tr = $('<div>').addClass('result').append(
                                $('<a>', {
                                    text: item.title,
                                    href: '#'
                                }).text(item.title),                              
                                $('<p>').text(item.user_name),
                                $('<a>', {
                                    text: item.category_name,
                                    href: '#'
                                }),
                                $('<p>').text(item.description),    
                            ).appendTo('#container');
                        });
                        console.log(response.idea);
                     }
                },
                error: function(response) {
                    console.log(response);
                    var code = response.code;
                    if (code == 404) {
                    }
                }
            })
    });
});