import resource from '../../actions'


//Fetch the Article Information
const fetchArticles = () => (dispatch) => {
     
                 return Promise.all([resource('GET', 'articles'),resource('GET', 'headlines'),resource('GET', 'avatars')])
		 	.then(r => dispatch({ type: 'INITIAL_STATE', payload : r}))
  	  }

//Dispatch Action to Change the visibility Comments 
export const commentsVisibility =(article) => (dispatch) => {
	article.displayComment? dispatch({type : 'HIDE_COMMENT', payload : article}) : dispatch({type : 'SHOW_COMMENT', payload : article})  
} 	  

export default fetchArticles







