var newsApi = document.getElementById("twitterCheck");
newsApi.onclick = function(displaynews) {
    console.log(displaynews);
}


function displaynews() {

    var news = $(this).attr("news-name");
    var queryURL = 'http://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=68f203c395244c8aa5c1e594586b7b89';


    $.ajax({
        url: queryURL,
        method: "fetch"
    }).then(function(response) {
        console.log(response.json());
    })
}
