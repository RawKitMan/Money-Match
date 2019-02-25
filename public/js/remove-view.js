$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "/api/challenges/1"
        //get row id from challenges table            
    }).then(challenges => {
        console.log(challenges);
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
            //btn.attr("href", "/challenges");
            btn.attr("id", "deleteChallengeBtn");
            btn.text("Decline");
            btn.appendTo(acceptBtn);


            //Appending
            username.appendTo(tr);
            rating.appendTo(tr);
            prize.appendTo(tr);
            location.appendTo(tr);
            acceptBtn.appendTo(tr);



            tr.appendTo(deleteChallengeBody);



        }
    })

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
        })

    })

    //Decline Button with Modal
    // $(".modal").modal();

    // //To DELETE from the challenges table
    // $("#decline").on("click", function () {
    //     console.log("test");
    //     var $tr = $(this).closest('tr');
    //     //AJAX call to delete from Challenges Table.
    //     $.ajax({
    //         method: "DELETE",
    //         url: "/api/challenges/" + $(this).parents("tr").attr("id"),
    //         success: function (response) {
    //             $tr.find("#deleteChallengeBody").fadeOut(1000, function () {
    //                 $tr.remove();
    //             });
    //         }
    //     })



    // });

})