$(document).ready(function () {

    $("#challengeForm").on("submit", function (event) {
        event.preventDefault()
        console.log("GETTING CLICKED")
        console.log()
        var username = $('#username').val();
        var bestOf = $('.select-bestOf').val();
        var placebets = $('#bets').val();
        var location = $('.select-location').val();

        var dbChallengers = {
            username: username,
            bestof: bestOf,
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
        }).then()

    });



    // AJAX call to GET to the Challenges Table.
    $.ajax({
        method: "GET",
        url: "/api/challenges/"
        //get row id from challenges table            
    }).then(challenges => {
        console.log(challenges);
        let findChallengeBody = $("#findChallengeBody")
       




        for (let i = 0; i < challenges.length; i++) {
            console.log(i);
            let tr = $("<tr>")
            tr.attr("class", "game-box")

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
            rating.attr("class", "game-column game-column-rating").text("First To");

            let prize = $("<td>");
            prize.attr("class", "game-column game-column-tournament").text(challenges[i].prize_pool);

            let location = $("<td>");
            location.attr("class", "game-column game-column-location").text(challenges[i].venue);

            let acceptBtn = $("<td>");
            acceptBtn.attr("class", "game-item-link show-more-games-link");
            acceptBtn.attr("colspan", 5);

            let btn = $("<a>").attr("class", "waves-effect waves-light btn-large btn black")
            btn.attr("colspan", 5);
            btn.attr("href", "/challenges");
            btn.text("Accept");
            btn.appendTo(acceptBtn);


//     <td class="game-item-link show-more-games-link" colspan="5">
//         <a href="/challenges" class="waves-effect waves-light btn-large btn black" colspan="5">Accept</a>
//     </td>
            username.appendTo(tr);
            rating.appendTo(tr);
            prize.appendTo(tr);
            location.appendTo(tr);
            acceptBtn.appendTo(tr);



            tr.appendTo('#findChallengeBody');
        }

    })

    //   <tr class="game-box">
    //     <td class="game-column game-column-ranking padding-top" rowspan="1"></td>
    //     <td class="game-column game-column-logo">
    //         <img src="https://pbs.twimg.com/profile_images/1018340603908718595/ZtaXIgFb_400x400.jpg" width="200"
    //             height="225">
    //         <a class="game-item-link" rel="nofollow" href=""></a>
    //     </td>
    //     <td class="game-column game-column-username">Username</td>
    //     <!-- <td class="game-column game-column-console">Console</td> -->
    //     <td class="game-column game-column-rating">First To</td>
    //     <td class="game-column game-column-tournament">Prize</td>
    //     <td class="game-column game-column-location">Location</td>
    //     <td class="game-item-link show-more-games-link" colspan="5">
    //         <a href="/challenges" class="waves-effect waves-light btn-large btn black" colspan="5">Accept</a>
    //     </td>
    // </tr>





})