//Logic for the active challenges page

$(document).ready(function () {
    
    //We need the active user's data for a couple of features
    $.ajax({
        method: "GET",
        url: "/api/user_data"
    }).then(function (user) {
        //We only want challenges from the Challenges table where it was accepted
        $.ajax({
            method: "GET",
            url: "/api/challenges/1"           
        }).then(challenges => {
            

            //Create the table row with all the data from the data sent back to us
            let deleteChallengeBody = $("#deleteChallengeBody")

            for (let i = 0; i < challenges.length; i++) {
                console.log(i);
                let tr = $("<tr>")
                tr.attr("class", "game-box")
                console.log(challenges[i])
                tr.attr("id", challenges[i].id);

                let toprow = $("<td>");
                toprow.attr("class", "game-column game-column-ranking padding-top");
                toprow.attr("rowspan", 1);
                toprow.appendTo(tr);
                
                let username = $("<td>");
                username.attr("class", "game-column game-column-username").text(challenges[i].player_one + " vs " + challenges[i].player_two);

                let challenge_game = $("<td>");
                username.attr("class", "game-column game-column-username").text(challenges[i].challenge_game);

                let rating = $("<td>");
                rating.attr("class", "game-column game-column-rating").text("First To " + challenges[i].best_of);

                let prize = $("<td>");
                prize.attr("class", "game-column game-column-tournament").text(challenges[i].prize_pool);

                let location = $("<td>");
                location.attr("class", "game-column game-column-location").text(challenges[i].venue);

                let acceptBtn = $("<td>");
                acceptBtn.attr("class", "game-item-link show-more-games-link");
                acceptBtn.attr("colspan", 5);

                //Without this condition, ANY user can decline the challenge and delete it from the table. Only the involved players should be able to.
                if (user.username === challenges[i].player_one || user.username === challenges[i].player_two) {

                    let btn = $("<a>").attr("class", "waves-effect waves-light btn-large btn black")
                    btn.attr("colspan", 5);
                    //btn.attr("href", "/challenges");
                    btn.attr("id", "deleteChallengeBtn");
                    btn.text("Decline");
                    btn.appendTo(acceptBtn);
                };

                //Appending
                username.appendTo(tr);
                rating.appendTo(tr);
                prize.appendTo(tr);
                location.appendTo(tr);
                acceptBtn.appendTo(tr);
                tr.appendTo(deleteChallengeBody);
            };
        });
    });
    
    //The Decline button will delete the active challenge from the page and the Challenge table
    $(document).on("click", "#deleteChallengeBtn", function () {
        console.log($(this).parents("tr").attr("id"));
        var rowRemove = $(this).parents("tr");
        console.log(rowRemove);
        rowRemove.remove();

        $.ajax({
            method: "DELETE",
            url: "/api/challenges/" + $(this).parents("tr").attr("id"),

        }).then(function () {
            console.log("challenge declined");
        });
    });  

});