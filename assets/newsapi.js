


 // bind button click to action
 $('#searchButton').on('click', function () {
  getNewsResults();
  
});
console.log(getNewsResults)

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

// 
function processResults(json) {
  // clear the current results
  $('#searchResults').html('');
  // add the current searches number of articles
  $('#searchResults').append(`TOTAL ARTICLES FOUND: ${json.totalArticles}`);

  // get all articles models
  var articles = [...json.articles];
  console.log(articles.length)

  // create ordered list
  const $ul = $('<ul>').append(
      // populate ordered list with article results
      articles.map(article => 
          $("<li>").append($(`<a href="${article.url}">`).text(article.title))
      )
  );

  // append the list to search results container
  $('#searchResults').append($ul);
}