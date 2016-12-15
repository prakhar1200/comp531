import resource from '../../actions'
import fetch from 'isomorphic-fetch'
import {url} from '../../actions'
import validator from 'validator'

//Post a new article Takes in the Image Bytes and text
//Createa a FormData object to send the Image and text 
export const postArticle = (newText, articleImage) => (dispatch) => {

    if (newText || articleImage) {
        const fd = new FormData()
        fd.append('text', newText)
        fd.append('image', articleImage)

        return fetch(url + '/article', {
                credentials: 'include',
                method: "POST",
                body: fd
            })
            .then(r => r.json())
            .then(r => dispatch({
                type: 'POST_ARTICLE',
                payload: r
            }))
    }
    return
}

const fetchArticles = () => (dispatch) => {

    return Promise.all([resource('GET', 'articles'), resource('GET', 'headlines'), resource('GET', 'avatars')])
        .then(r => dispatch({
            type: 'INITIAL_STATE',
            payload: r
        }))

}

//Change the visibility of comments for a particular post
export const commentsVisibility = (article) => (dispatch) => {
    article.displayComment ? dispatch({
        type: 'HIDE_COMMENT',
        payload: article
    }) : dispatch({
        type: 'SHOW_COMMENT',
        payload: article
    })
}

//Edit the Loggedn in user's post
export const editPost = (articleText, articleID) => (dispatch) => {

        return resource('PUT', 'articles/' + articleID, {
                text: articleText
            })
            .then(r => fetchArticles()(dispatch))
    }
    //Post a New Comment/ Edit LoggedIn user's post
export const postComment = (commentText, articleID, editcommentId) => (dispatch) => {
    console.log(commentText)
    console.log(editcommentId)
    return resource('PUT', 'articles/' + articleID, {
            text: commentText,
            commentId: editcommentId
        })
        .then(r => fetchArticles()(dispatch))
}

//FilterPost  Based on the search string
//Matches the Search string in  the Post Text and author Name
export const filterPosts = (searchString, posts) => (dispatch) => {
    var results = []
    posts.forEach(function(obj) {

        for (var key in obj) {
            if (key === 'author' || key === 'text') {
                if (obj[key].indexOf(searchString) !== -1) {
                    results.push(obj)
                    break
                }
            }

        }
    })
    dispatch({
        type: 'FILTER_ARTICLES',
        payload: results
    })
}


export default fetchArticles
