import resource from '../../actions'
import fetch from 'isomorphic-fetch'
import {url} from '../../actions'



//Posts an article and updates the current view
export const postArticle = (newText, articleImage) => (dispatch) => {
		
				const fd = new FormData()
   				fd.append('text', newText)
     			fd.append('image', articleImage)

                 return fetch(url+'/article', {credentials: 'include', method : "POST", body: fd})    
		 		 .then(r => r.json())
		 		 .then(r =>	dispatch({ type: 'POST_ARTICLE', payload : r}))
			}

const fetchArticles = () => (dispatch) => {
			     
                 return Promise.all([resource('GET', 'articles'),resource('GET', 'headlines'),
                 					resource('GET', 'avatars')])
		 				.then(r => dispatch({ type: 'INITIAL_STATE', payload : r}))
  	  }


export const commentsVisibility =(article) => (dispatch) => {
	article.displayComment? dispatch({type : 'HIDE_COMMENT', payload : article}) : dispatch({type : 'SHOW_COMMENT', payload : article})  
} 	  

export default fetchArticles



