// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
(function(exports) {

    'use strict'
    
    
    function countWords(url) {
        return fetch(url)
            .then(r => r.json())
            .then(r => r['articles'].reduce(function(preVal, elem) { 
               preVal[elem._id] = elem['text'].length;
               return preVal;
            }, {}));
    }
    

    function countWordsSafe(url) {
        return fetch(url)
            .then(r => r.json())
            .then(r => r['articles'].reduce(function(preVal, elem) { 
               preVal[elem._id] = elem['text'].length;
               return preVal;
            }, {}))
            .catch(e => ({}));
    }

    function getLargest(url) {
        return fetch(url)
            .then(r => r.json())
            .then(r => {
                var curMax = 0;
                return r['articles'].reduce((preVal, elem) => {
                    var retVal = curMax > elem['text'].length ? preVal : elem['_id'];
                    curMax = Math.max(curMax, elem['text'].length);
                    return retVal.toString();                    
                }, 0);
            })
            .catch(e => ({}));
    }

    exports.inclass = {
        author: "Prakhar",
        countWords, countWordsSafe, getLargest
    }

})(this);