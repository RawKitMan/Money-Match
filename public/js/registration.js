$(document).ready(function () {

    //Sign-up
    // $('.error').hide();
    $('#findMatches').click(function (event) {
        event.preventDefault();
        var name = $('#firstname').val() + ' ' + $('#lastname').val();
        var email = $('#email').val();
        var username = $('#username').val();
        var password = $('#password').val();
        var maingame = document.getElementById("#mainGame");
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
        })



    });

    //Sign-In

    $('#logIn').submit(function (e) {

        e.preventDefault();
        var login = $('#email').val();
        // var password = $('.password').val();
        //GET request for user credentials to compare
        $.ajax({
            url: '/api/players/login',
            type: 'post',
            data: {
                email: $("#email").val().trim(),
                password: $("#password").val().trim()
            },
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    window.location = "/challenges"
                } else {
                    window.location = "/login"
                }
            }
        })

    })
});