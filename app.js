'use strict'
// key 610e163ee1b14ee4bd3214d44d670c16

const apiKey = ('610e163ee1b14ee4bd3214d44d670c16')
const searchURL = 'https://api.github.com'
console.log('hi');

// function fetch, globals
// will draw the API    
function getRepositories(gitUser) {
    console.log('git repostitory ran');
    let url = `https://api.github.com/users/${gitUser}/repos`
    console.log(url);
    fetch(url)
        .then(response => {
           if (response.ok){
               return response.json();
           } 
           throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something Went Wrong : ${err.message}`);
        });

}

//watchForm - event listener on the form that grabs value (github user)
function watchForm(){
    $('form').submit(event => {
        $('.js-results').html("");
        $('#js-error-message').html("");
        event.preventDefault();
        const searchGitHandle = $('#js-inputSection').val();
        console.log('watch form success');
        getRepositories(searchGitHandle);

    })
};

//displayResults - interate through the data of the api (loops and access object), jquery to display those values
function displayResults(responseJson){
    console.log('display results ran');
    console.log(responseJson.length)
    if (responseJson.length === 0){
        $('.js-results').append(`No Reluslts Found`);
    }
    for (let i =0; i < responseJson.length; i++){
        console.log(responseJson[i].name)
        $('.js-results').append(
            `<a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a> <br>`);
    }

};


$(watchForm);