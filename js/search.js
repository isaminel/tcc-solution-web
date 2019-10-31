$(document).ready(function () {
    $("#search").click(function (e) { 
        $("#records_table tr").remove();
        //console.log("olaaaaa");
            var radioValue = $("input[name='type']:checked").val();
            var searchValue = $('#searchField').val();
            $.ajax({
                type: 'GET',
                url: 'http://localhost/tcc-solution-api-master/api/v1/idea' + '?' + radioValue + '=' + searchValue,
                success: function(response) {
                     if (response.success) {
                        $.each(response.idea, function(i, item) {
                            var $tr = $('<tr>').append(
                                $('<td>').text(item.title),
                                $('<td>').text(item.description),
                                $('<td>').text(item.category_name)
                            ).appendTo('#records_table');
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