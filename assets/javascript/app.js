$(document).ready(function() {

    var fruits = ["mango", "pineapple", "apple", "orange", "watermelon", "melon"]

    for (i = 0; i < fruits.length; i++) {
        let button = $("<button>")
        $(button).attr({"id": fruits[i], "class": "fruit-button"})
        button.text(fruits[i])
        $("#initial-buttons").append(button)
    }

    $("#submit").on("click", function() {

    event.preventDefault()
    var newFruit = $("#add-a-fruit").val()
    let button = $("<button>")
    $(button).attr({"id": newFruit, "class": "fruit-button"})
    button.text(newFruit)
    $("#initial-buttons").append(button)
    })

    $(".fruit-button").on("click", function() {
        $("#results").text("")
        $(".fruit-button").removeAttr("disabled")
        $(this).attr("disabled", "true")
        var fruit = $(this).attr("id")
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xtOTCHmJ2wr5zCnplnBlO3wLiH97K3kv&q=&limit=10&offset=0&rating=G&lang=en&q=" + fruit
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            for (i = 0; i < 10; i++) {
                let imgDiv = $("<img>")
                $(imgDiv).attr("src", response.data[i].images.downsized_large.url)
                $("#results").append(imgDiv)
            }
        })
    })
});




