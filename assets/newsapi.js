//Global Variables
var searchBar = $("#searchBar");
var searchButton = $("#searchButton");

const apiKey = "68f203c395244c8aa5c1e594586b7b89";
var currentNewsUrl;



// Function to populate news 

function populateNews() {


    //creating AJAX call for news topic
    $.ajax({
        url: currentNewsURL,
        method: "fetch"
    }).then(function(response) {
        
        //Object to store current news data -> todo
        var currentNewsObj = {
            name
            author
            title
            description
            url
            urltoimage
            publishedAt
            content
        };

        //Generates cards with all the news info - todo
        var newsCards = $('<div class="card"><div class="card-body")

    })
}
 displaynews()




 searchButton.on("click", function() {
     currentNewsUrl =  
 }