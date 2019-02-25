//Logic for the Create Challenges page

$(document).ready(function () {
    
    //We want the current user's data for later
    $.ajax({
        method: "GET",
        url: "/api/user_data"
    }).then(function (user) {
        //GET Request for any challenges where the challenge has NOT been accepted yet
        $.ajax({
            method: "GET",
            url: "/api/challenges/false"
            //get row id from challenges table            
        }).then(challenges => {
            
            //Create the tables showing the unaccepted challenges.
            let findChallengeBody = $("#findChallengeBody");

            for (let i = 0; i < challenges.length; i++) {
                let tr = $("<tr>")
                tr.attr("class", "game-box")
                tr.attr("id", challenges[i].id);

                let toprow = $("<td>");
                toprow.attr("class", "game-column game-column-ranking padding-top");
                toprow.attr("rowspan", 1);
                toprow.appendTo(tr);
                
                let username = $("<td>");
                username.attr("class", "game-column game-column-username").text(challenges[i].player_one);

                let challenge_game = $("<td>");
                challenge_game.attr("class", "game-column game-column-username").text(challenges[i].challenge_game);

                let rating = $("<td>");
                rating.attr("class", "game-column game-column-rating").text("First To " + challenges[i].best_of);

                let prize = $("<td>");
                prize.attr("class", "game-column game-column-tournament").text("$" + challenges[i].prize_pool);

                let location = $("<td>");
                location.attr("class", "game-column game-column-location").text(challenges[i].venue);

                let acceptBtn = $("<td>");
                acceptBtn.attr("class", "game-item-link show-more-games-link");
                acceptBtn.attr("colspan", 5);

                //If the user creates a challenge, they should NOT be able to accept their own challenge. Can't play with yourself!
                if (challenges[i].player_one !== user.username) {
                    let btn = $("<a>").attr("class", "waves-effect waves-light btn-large btn black")
                    btn.attr("colspan", 5);
                    btn.attr("id", "acceptChallengeBtn");
                    btn.text("Accept");
                    btn.appendTo(acceptBtn);
                };

                //Appending
                username.appendTo(tr);
                challenge_game.appendTo(tr);
                rating.appendTo(tr);
                prize.appendTo(tr);
                location.appendTo(tr);
                acceptBtn.appendTo(tr);
                tr.appendTo("#findChallengeBody");
            };
        });
    });

    //Submits a new challenge to the Challenges table
    $("#challengeForm").on("submit", function (event) {
        event.preventDefault();

        var best_of = parseInt($('.select-bestOf').val());
        var placebets = $('#bets').val();
        var location = $('.select-location').val();


        var dbChallengers;

        //The user data makes it so it automatically places the active user as player one. Anyone who accepts the challenge is player two.
        $.ajax({
            method: "GET",
            url: "/api/user_data"
        }).then(function (user) {
            console.log(user);
            var username = user.username;
            var challenge_game = user.mainGame;

            dbChallengers = {
                username: username,
                best_of: best_of,
                challenge_game: challenge_game,
                placebets: placebets,
                location: location
            };

            $.ajax({
                method: "POST",
                url: "/api/challenges/",
                data: dbChallengers          
            }).then(function () {
                
                $('.select-bestOf').val("");
                $('#bets').val("");
                $('.select-location').val("");
            });
        });

    });

    //Accept the challenge
    $(document).on("click", "#acceptChallengeBtn", function () {
        var rowRemove = $(this).parents("tr");
        console.log(rowRemove.attr("id"));

        //Get the active user's data
        $.ajax({
            method: "GET",
            url: "/api/user_data"
        }).then(function (user) {
            
            //Update the specific row in the Challenges table to indicate there is a second player and the challenge is accepted
            $.ajax({
                method: "PUT",
                url: "/api/challenges/" + rowRemove.attr("id"),
                data: {
                    challenge_accepted: true,
                    player_two: user.username
                }
            }).then(function () {
                
                //When a challenge is accepted, it's removed from the page.
                rowRemove.remove();
            });
        });
    });

});