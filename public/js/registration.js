$(document).ready(function() {

    //Sign-up
    // $('.error').hide();
    $('#findMatches').click(function(event) {
        event.preventDefault();
        var name = $('.name').val();
        var email = $('.email').val();
        var username = $('.username').val();
        var password = $('.password').val();
        var dbPlayers = {
            name: name,
            username: username,
            password: password,
            mainGame: 'smash bros',
            age: '12'
        }

        // if(name == '' || email == '' || username == '' || password == '') {
        //     $('.name', '.email', '.username', '.password').next().show();
        //     return false;
        // }
        // if(IsEmail(email)==false){
        //     $('invalid_email').show();
        //     return false;
        // } else {
                $.ajax({
                    method: "POST",
                    url: "/api/players",
                    data: dbPlayers
                }).then()     
        // }


    });


//Verify Email
// function IsEmail(email) {
//     var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//     if(!regex.test(email)) {
//         return false;
//     } else {
//         return true;
//     }
// };

//Sign-In
    // $('.error').hide();
    $('#LogIn').click(function() {
        
        var login = $('.email').val();
        var password = $('.password').val();
        //GET request for user credentials to compare
        $.ajax({
            url: '/api/players/' + username,
            type: 'get',
            dataType: 'json',
            success: function(req, res) {
                if (login == dbPlayer.username) {
                    window.location = "/find-challenge"
                } else {
                    window.location = "/404"
                }
            }
        })
        //if match go to the next page
        //else clear the form 
        //error message.
    })
});