  $.ajax({
    url: 'https://api.twitter.com/oauth2/token=',
    beforeSend: function(xhr) {
         xhr.setRequestHeader("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAEtGIAEAAAAAkkyvbAZiEmVzC%2BkAePVJOZZs3ow%3DpT2I5DKgZJLmzSQ4lfS7aCBH662WlGnVsTqMeh6xuoeEi7rGX8")
    }, success: function(data){
        alert(data);
        //process the JSON data etc
    }
})
    ajax()
    console.log(ajax)