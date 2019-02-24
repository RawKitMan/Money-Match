$(document).ready(function() {

    //Decline Button with Modal
    $(".modal").modal();

    //To DELETE from the challenges table
    $("#decline").on("click", function () {
        console.log("test");
        //AJAX call to delete from Challenges Table.
        $.ajax({
            method: "DELETE",
            url: "/api/challenges/" + id,
            //get row id from challenges table            
        }).then()  
        
    });

    

    
})