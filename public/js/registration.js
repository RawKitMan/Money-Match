$(document).ready(function () {

    //Clicking the button will add the new player to our Players database
    $('#findMatches').click(function (event) {
        event.preventDefault();
        var name = $('#firstname').val() + ' ' + $('#lastname').val();
        var email = $('#email').val();
        var username = $('#username').val();
        var password = $('#password').val();
        var maingame = $('.select-game').val();
        var dbPlayers = {
            name: name,
            email: email,
            username: username,
            password: password,
            mainGame: maingame,
        }

        $.ajax({
            method: "POST",
            url: "/api/players",
            data: dbPlayers
        }).then(function () {
            window.location = "/login"
        });
    });

    //If a player already has an account, sign-in

    $('#logIn').submit(function (e) {

        e.preventDefault();
        $.ajax({
            url: '/api/players/login',
            type: 'post',
            data: {
                email: $("#email").val().trim(),
                password: $("#password").val().trim()
            },
            dataType: 'json',
            success: function (data) {
                //Once logged in, go to the challenges page. Otherwise, the app automatically goes to the login screen
                if (data.success) {
                    window.location = "/challenges"
                } else {
                    window.location = "/login"
                };
            }
        });

    });
});