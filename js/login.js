    var auth2;

    function renderButton() {
        gapi.signin2.render('meu-botao', {
            'scope': 'email profile https://www.googleapis.com/auth/plus.login', // solicitando acesso ao profile e ao e-mail do usuário
            'width': 250,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
    }

    function signOut() {
        auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
         console.log('User signed out.');
        });

        $('#form_container').hide();
      }

    function checkLogin() {
        auth2 = gapi.auth2.getAuthInstance();

        if (auth2.isSignedIn.get()) {
            var profile = auth2.currentUser.get().getBasicProfile();

            $('#nome').val(profile.getName());
            $('#email').val(profile.getEmail());

            $('#form_container').show();
          } else {
              console.log("não logado");
          }
    }

    function onSuccess(googleUser) {
        // Recuperando o profile do usuário
        var profile = googleUser.getBasicProfile();
        // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        // console.log("Name: " + profile.getName());
        // console.log("Image URL: " + profile.getImageUrl());
        // console.log("Email: " + profile.getEmail());

        // Recuperando o token do usuario. Essa informação você necessita passar para seu backend
        var id_token = googleUser.getAuthResponse().id_token;
        // console.log("ID Token: " + id_token);

        checkLogin();
    }
    
    function onFailure(error) {
        console.log(error);
    }

    

    $("#signOutLink").on("click", signOut);

    renderButton();
    checkLogin();