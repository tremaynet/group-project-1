var newsArray = [];
var redditArray = [];
var mergedArray = [];


// bind button click to action when doc is available
$(document).ready(function () {
    getRedditResults();
    $('#searchButton').on('click', function () {
        //clear arrays
        newsArray = [];
        redditArray = [];
        mergedArray = [];


        getNewsResults();
        //getRedditResults();
    });
    $('#burger').on('click', function () {
        burgerOpen();
    });
    $('#generateFeedBtn').on('click', function () {
        getNewsResults();
    });
});

// query news api for search data
function getNewsResults() {
        // grab search term from UI
        var searchTerm = $('#searchTerm').val();
        // personal newsapi key
        var apiKey = '9d1ab7009abccc42a353b3e5fb27c0eb';
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
        $('#searchResults').html('');
        // add the current searches number of articles
        $('#searchResults').append(`TOTAL ARTICLES FOUND: ${json.totalArticles}`);

        // get all articles models
        newsArray = [...json.articles];
        console.log(newsArray.length)
        

        getRedditResults();
    }

//get reddit data
    function getRedditResults() {
        url = "https://www.reddit.com/search.json";

        searchTerm = $("#searchTerm").val();
        //reddit ajax call
        $.ajax(
            url,
            {
                data: { q: searchTerm },
                success: function(response) {
                    if (response.data.children.length > 0) {

                        console.log(response.data.children);
                        for(var i = 0; i < response.data.children.length; i++) {
                            //create object for storing arrays
                            var listObject = {
                                title: "",
                                url: ""
                            }
                            
                            //load data into object
                            listObject.title = "Reddit: " + response.data.children[i].data.title;
                            listObject.url = "http://reddit.com/" + response.data.children[i].data.permalink;

                            //push object into arry
                            redditArray.push(listObject);
                        }
                        //merge arrays
                        mergeArrays();
                    } else {
                        console.log("No subreddits match the search query!");
                    }
                },
                error: function() {
                    alert("Something didn't work!");
                }
            }
        );        
    }

//merge the arrays
    function mergeArrays() {
        for(var i = 0; i < 10; i++) {
            mergedArray.push(newsArray[i]);
            mergedArray.push(redditArray[i]);
        }
        createList();
    }

    //create the lists on the page
    function createList() {
        $('#searchResults').html('');

        console.log(mergedArray);
        // create ordered list
        const $ul = $('<ul>').append(
            // populate ordered list with article results
            mergedArray.map(mergedArray =>
                $("<li>").append($(`<a href="${mergedArray.url}">`).text(mergedArray.title))
            )
        );

        $ul.attr("id", "dataList");

        // append the list to search results container
        $('#searchResults').append($ul);

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
$(".modal-close").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
 });


