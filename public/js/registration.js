$(document).ready(function() {

    //Sign-up
    $('.error').hide();
    $('#signUp').click(function() {
        var name = $('.name').val();
        var email = $('.email').val();
        var password = $('.password').val();

        if(name == '' || email == '' || password == '') {
            $('.name', '.email', '.password').next().show();
            return false;
        }
        if(IsEmail(email)==false){
            $('invalid_email').show();
            return false;
        }
        $.post("", $("#accountForm").serialize(), function(response) {
            $('#accountForm').fadeOut('slow', function() {
                $('#correct').html(response);
                $('#correct').fadeIn('slow');
            });
        });
        return false;
    });

});

//Verify Email
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(email)) {
        return false;
    } else {
        return true;
    }
};

//Sign-In
    $('.error').hide();
    $('#signIn').click(function() {
        //GET request for user credentials to compare
        //if match go to the next page
        //else clear the form 
        //error message.
    })
