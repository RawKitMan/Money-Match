$(document).ready(function () {
    //Ajax GET request for available challenges
    $.ajax({
        method: "GET",
        url: "/api/challenges/false"
        //get row id from challenges table            
    }).then(challenges => {
        console.log(challenges);
        let findChallengeBody = $("#findChallengeBody")





        for (let i = 0; i < challenges.length; i++) {
            console.log(i);
            let tr = $("<tr>")
            tr.attr("class", "game-box")
            tr.attr("id", challenges[i].id);

            let toprow = $("<td>");
            toprow.attr("class", "game-column game-column-ranking padding-top");
            toprow.attr("rowspan", 1);
            toprow.appendTo(tr);
            let imgSpace = $("<td>");
            imgSpace.attr("game-column game-column-logo");


            let img = $("<img>");
            img.attr("src", "https://pbs.twimg.com/profile_images/1018340603908718595/ZtaXIgFb_400x400.jpg")
            img.attr("width", 200);
            img.attr("height", 225);



            let gameLink = $("<a>");
            gameLink.attr("class", "game-link-item");
            gameLink.attr("rel", "nofollow");
            gameLink.attr("href", "");

            img.appendTo(imgSpace);
            gameLink.appendTo(imgSpace);
            imgSpace.appendTo(tr);

            let username = $("<td>");
            username.attr("class", "game-column game-column-username").text(challenges[i].player_one);

            let rating = $("<td>");
            rating.attr("class", "game-column game-column-rating").text("First To " + challenges[i].best_of);

            let prize = $("<td>");
            prize.attr("class", "game-column game-column-tournament").text("$" + challenges[i].prize_pool);

            let location = $("<td>");
            location.attr("class", "game-column game-column-location").text(challenges[i].venue);

            let acceptBtn = $("<td>");
            acceptBtn.attr("class", "game-item-link show-more-games-link");
            acceptBtn.attr("colspan", 5);

            let btn = $("<a>").attr("class", "waves-effect waves-light btn-large btn black")
            btn.attr("colspan", 5);
            //btn.attr("href", "/challenges");
            btn.attr("id", "acceptChallengeBtn");
            btn.text("Accept");
            btn.appendTo(acceptBtn);


            //Appending
            username.appendTo(tr);
            rating.appendTo(tr);
            prize.appendTo(tr);
            location.appendTo(tr);
            acceptBtn.appendTo(tr);



            tr.appendTo('#findChallengeBody');



        }



        $("#challengeForm").on("submit", function (event) {
            event.preventDefault();
            console.log("GETTING CLICKED")
            console.log()
            var username = $('#username').val();
            var best_of = parseInt($('.select-bestOf').val());
            var placebets = $('#bets').val();
            var location = $('.select-location').val();

            var dbChallengers = {
                username: username,
                best_of: best_of,
                placebets: placebets,
                location: location
            }
            // AJAX call to GET to the Challenges Table.
            $.ajax({
                method: "GET",
                url: "/api/challenges/",


                //get row id from challenges table            
            }).then(challenges => {
                console.log(challenges);
            })


            $.ajax({
                method: "POST",
                url: "/api/challenges/",
                data: dbChallengers

                //get row id from challenges table            
            }).then(function () {
                $('#username').val("");
                $('.select-bestOf').val("");
                $('#bets').val("");
                $('.select-location').val("");
            })

        });

        //Accept Btn
        $(document).on("click","#acceptChallengeBtn", function() {
            var rowRemove = $(this).parents("tr");
            console.log(rowRemove);
            rowRemove.remove();

            $.ajax({
                method: "PUT",
                url: "/api/challenges/" + $(this).parents("tr").attr("id"),
                data: {
                    challenge_accepted: 1
                }

            }).then( function() {
                console.log("challengeAccepted");
            })
            
        })
        

        // AJAX call to GET to the Challenges Table.
        // $.ajax({
        //     method: "GET",
        //     url: "/api/challenges/"
        //     //get row id from challenges table            
        // }).then(challenges => {
        //     console.log(challenges);
        //     let findChallengeBody = $("#findChallengeBody")





        //     for (let i = 0; i < challenges.length; i++) {
        //         console.log(i);
        //         let tr = $("<tr>")
        //         tr.attr("class", "game-box")

        //         let toprow = $("<td>");
        //         toprow.attr("class", "game-column game-column-ranking padding-top");
        //         toprow.attr("rowspan", 1);
        //         toprow.appendTo(tr);
        //         let imgSpace = $("<td>");
        //         imgSpace.attr("game-column game-column-logo");


        //         let img = $("<img>");
        //         img.attr("src", "https://pbs.twimg.com/profile_images/1018340603908718595/ZtaXIgFb_400x400.jpg")
        //         img.attr("width", 200);
        //         img.attr("height", 225);



        //         let gameLink = $("<a>");
        //         gameLink.attr("class", "game-link-item");
        //         gameLink.attr("rel", "nofollow");
        //         gameLink.attr("href", "");

        //         img.appendTo(imgSpace);
        //         gameLink.appendTo(imgSpace);
        //         imgSpace.appendTo(tr);

        //         let username = $("<td>");
        //         username.attr("class", "game-column game-column-username").text(challenges[i].player_one);

        //         let rating = $("<td>");
        //         rating.attr("class", "game-column game-column-rating").text("First To");

        //         let prize = $("<td>");
        //         prize.attr("class", "game-column game-column-tournament").text(challenges[i].prize_pool);

        //         let location = $("<td>");
        //         location.attr("class", "game-column game-column-location").text(challenges[i].venue);

        //         let acceptBtn = $("<td>");
        //         acceptBtn.attr("class", "game-item-link show-more-games-link");
        //         acceptBtn.attr("colspan", 5);

        //         let btn = $("<a>").attr("class", "waves-effect waves-light btn-large btn black")
        //         btn.attr("colspan", 5);
        //         btn.attr("href", "/challenges");
        //         btn.text("Accept");
        //         btn.appendTo(acceptBtn);


        //         //Appending
        //         username.appendTo(tr);
        //         rating.appendTo(tr);
        //         prize.appendTo(tr);
        //         location.appendTo(tr);
        //         acceptBtn.appendTo(tr);



        //         tr.appendTo('#findChallengeBody');

        //         location.reload();
        //     }

    })

});