$(document).ready(function() {

    var fruits = ["mango", "pineapple", "apple", "orange", "watermelon", "melon"]
    var clickCounter = 0

    for (i = 0; i < fruits.length; i++) {
        let button = $("<button>")
        $(button).attr("id", fruits[i])
        $(button).addClass("fruit-button rounded-pill mr-1 mb-2 btn-outline-primary ")
        button.text(fruits[i])
        $("#initial-buttons").append(button)
    }

    $("#submit").on("click", function() {

    event.preventDefault()
    var newFruit = $("#add-a-fruit").val()
    let button = $("<button>")
    $(button).attr("id", newFruit)
    $(button).addClass("fruit-button rounded-pill mr-1 mb-2 btn-outline-primary")
    button.text(newFruit)
    $("#initial-buttons").append(button)
    fruitButtonClick()
    })

    function fruitButtonClick() {

        
        $(".fruit-button").on("click", function() {

            if ($(this).hasClass("clicked")) {
                $(this).removeClass("btn-outline-danger")
                $(this).addClass("btn-danger")
                clickCounter = clickCounter + 10
                var fruit = $(this).attr("id")
                getAPI(clickCounter)
            }

            else {
                clickCounter = 0
                $("#results").text("")
                $(".fruit-button").removeClass("btn-outline-danger btn-danger clicked")
                $(".fruit-button").addClass("btn-outline-primary")

                $(this).removeClass("btn-outline-primary")
                $(this).addClass("btn-outline-danger clicked")
                var fruit = $(this).attr("id")
                getAPI(clickCounter)
            }


            
            
            function getAPI(offset){
                var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xtOTCHmJ2wr5zCnplnBlO3wLiH97K3kv&q=&limit=10&offset=" + offset + "&rating=G&lang=en&q=" + fruit
    
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    console.log(response)
                    for (i = 0; i < 10; i++) {
                        let imgDiv = $("<img>")
                        $(imgDiv).attr({"status": "still", "src": response.data[i].images.original_still.url, "data-still": response.data[i].images.original_still.url, "data-animate": response.data[i].images.original.url, "class": "gif"})
                        $("#results").append(imgDiv)
                    }
                    $(".gif").on("click", function() {
                        if ($(this).attr("status") === "still") {
                            $(this).attr({"status": "animate", "src": $(this).attr("data-animate") })
                        }
                        else {
                            $(this).attr({"status": "still", "src": $(this).attr("data-still") })
                        }
                    })
                    
                })
            }
        })
    }
    fruitButtonClick()
});




