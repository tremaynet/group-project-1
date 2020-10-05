var newsArray = [];
var redditArray = [];
var mergedArray = [];
var lastSearched;
var isRefreshing = false;


// bind button click to action when doc is available
$(document).ready(function () {
    $('#searchButton').on('click', function () {
        //clear arrays
        newsArray = [];
        redditArray = [];
        mergedArray = [];


        getNewsResults();
    });
    $('#burger').on('click', function () {
        burgerOpen();
    });
    $('#generateFeedBtn').on('click', function () {
        $("#generateFeedBtn").on("click", function () {
            if (lastSearched) {
                console.log("Refresh");
                //clear arrays
                newsArray = [];
                redditArray = [];
                mergedArray = [];
                isRefreshing = true;


                getNewsResults();
                //getRedditResults();
            }
        });
    });
});

// query news api for search data
function getNewsResults() {
    // grab search term from UI
    if (isRefreshing) {
        searchTerm = lastSearched;
    }
    else {
        searchTerm = $("#searchTerm").val();
    }        // personal newsapi key
    var apiKey = '1ddf65c5aff07d10b675cf492f4f0b15';
    // base api url
    var baseUrl = 'https://gnews.io/api/v4/';
    // compile full request
    var requestUrl = `${baseUrl}search?q=${searchTerm}&lang=en&token=${apiKey}`;
    console.log(`requestUrl -> ${requestUrl}`);
    // make a request for the data at the 

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => processResults(data));
}

// process json data into html
function processResults(json) {
    // clear the current results

    $(".contentList").empty();
    var card = $("<div>");
    var card = $("<div>");
    var cardContent = $("<div>");
    var cardHeader = $("<div>");
    var cardHeaderText = $("<p>");

    card.addClass("card");
    cardHeader.addClass("card-header");
    cardContent.addClass("card-content");
    cardHeaderText.addClass("card-header-title");
    cardHeaderText.text("Social Media")


    cardHeader.append(cardHeaderText);
    card.append(cardHeader);
    card.append(cardContent);
    card.appendTo(".contentList");

    // add the current searches number of articles
    $('.card-content').append(`TOTAL ARTICLES FOUND: ${json.totalArticles}`);

    // get all articles models
    newsArray = [...json.articles];
    console.log(newsArray.length)

    getRedditResults();
}

//get reddit data
function getRedditResults() {
    url = "https://www.reddit.com/search.json";
    if (isRefreshing) {
        searchTerm = lastSearched;
    }
    else {
        searchTerm = $("#searchTerm").val();

        //save last searched
        lastSearched = searchTerm;
    }
    //reddit ajax call
    $.ajax(
        url,
        {
            data: { q: searchTerm },
            success: function (response) {
                if (response.data.children.length > 0) {

                    console.log(response.data.children);
                    for (var i = 0; i < response.data.children.length; i++) {
                        //create object for storing arrays
                        var listObject = {
                            title: "",
                            url: "",
                            description: "",
                            image: ""
                        }

                        //load data into object
                        listObject.title = "Reddit: " + response.data.children[i].data.title;
                        listObject.url = "http://reddit.com/" + response.data.children[i].data.permalink;
                        //listObject.url = response.data.children[i].data.url;
                        listObject.description = response.data.children[i].data.selftext;
                        if (response.data.children[i].data.thumbnail !== "self" && response.data.children[i].data.thumbnail !== "default") {
                            listObject.image = response.data.children[i].data.thumbnail;
                        }

                        //reddit megathreads descriptions are full of messy html text
                        if (response.data.children[i].data.link_flair_text !== "Megathread") {
                            //push object into arry
                            redditArray.push(listObject);
                        }
                    }
                    //merge arrays
                    mergeArrays();
                } else {
                    console.log("No subreddits match the search query!");
                }
            },
            error: function () {
                alert("Something didn't work!");
            }
        }
    );
}

//merge the arrays
function mergeArrays() {
    for (var i = 0; i < 10; i++) {
        mergedArray.push(newsArray[i]);
        mergedArray.push(redditArray[i]);
    }
    createList();
}

//create the lists on the page
function createList() {
    $('#searchResults').html('');

    console.log(mergedArray);

    //iterate through array to dynamically create content cards
    for (var i = 0; i < mergedArray.length; i++) {
        var card = $("<div>");
        var cardContent = $("<div>");
        var cardHeader = $("<div>");
        var cardHeaderText = $("<p>");
        var description = $("<p>");
        var urlContainer = $("<p>");
        var urlContent = $("<a>");
        var image = $("<img>");

        card.addClass("card");
        cardHeader.addClass("card-header");
        cardContent.addClass("card-content");
        cardHeaderText.addClass("card-header-title");
        cardHeaderText.text(mergedArray[i].title);
        description.text(mergedArray[i].description);

        image.attr("src", mergedArray[i].image);


        urlContent.text(mergedArray[i].url);
        urlContent.attr("href", mergedArray[i].url);

        urlContainer.text("Link: ");

        cardHeader.append(cardHeaderText);

        //threads without images will not show images
        if (mergedArray[i].image !== "self" && mergedArray[i].image !== "default") {
            cardContent.append(image);
        }

        urlContainer.append(urlContent);
        cardContent.append(description);
        cardContent.append(urlContainer);
        card.append(cardHeader);
        card.append(cardContent);
        card.appendTo(".contentList");


    }

    isRefreshing = false;
}


// Hamburger Menu Hidden when first arriving to page and opening on click.
function burgerOpen() {
    var navbarBurger = $('#navbarBasic');
    if ((navbarBurger).hasClass('is-active')) {
        navbarBurger.removeClass('is-active')
    } else {
        ((navbarBurger).addClass('is-active'))
    }

}
// Closes the modal 
$(".modal-close").click(function () {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
});




