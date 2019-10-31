$(document).ready(function () {
    $("#enviar").click(function (e) { 
        //console.log("olaaa");
            var fields = $('form').serializeArray();
            var ideaObj = objectifyForm(fields);
            console.log(ideaObj);        
            $.ajax({
                type: 'POST',
                url: 'http://localhost/tcc-solution-api-master/api/v1/idea', 
                data: ideaObj,
                success: function(response) {
                    var msg = response.message;
                     if (response.success) {
                        alert("Sucesso!");
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

function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
  }  