//This file provides a method to log the current user out of the app.

$(document).ready(function () {
    $("#logout").on("click", function () {

        $.ajax({
            method: "GET",
            url: "/logout"
        }).then(function () {
            console.log("User is logged out");
            window.location = "/login";
        });
    });
});