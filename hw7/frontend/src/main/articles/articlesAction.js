import resource from '../../actions'
import fetch from 'isomorphic-fetch'
import {url} from '../../actions'
import validator from 'validator'



export const postArticle = (newText, articleImage) => (dispatch) => {
			
			if(newText || articleImage)
			{
			const fd = new FormData()
   			fd.append('text', newText)
     			fd.append('image', articleImage)

                 return fetch(url+'/article', {credentials: 'include', method : "POST", body: fd})    
		 		 .then(r => r.json())
		 		 .then(r =>	dispatch({ type: 'POST_ARTICLE', payload : r}))
			}
		 return
			}
const fetchArticles = () => (dispatch) => {
			     
                 return Promise.all([resource('GET', 'articles'),resource('GET', 'headlines'),resource('GET', 'avatars')])
		 				.then(r => dispatch({ type: 'INITIAL_STATE', payload : r}))
  	  
	}


export const commentsVisibility =(article) => (dispatch) => {
	article.displayComment? dispatch({type : 'HIDE_COMMENT', payload : article}) : dispatch({type : 'SHOW_COMMENT', payload : article})  
} 	  

export const postComment = (commentText, articleID)=>(dispatch)=>{

	return resource('PUT', 'articles/'+ articleID, {text: commentText, commentId: -1})
			.then(r => fetchArticles()(dispatch))
}

export default fetchArticles



