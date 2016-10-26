import resource from '../../actions'



const fetchArticles = () => (dispatch) => {
     
                 return Promise.all([resource('GET', 'articles'),resource('GET', 'headlines'),resource('GET', 'avatars')])
		 	.then(r => dispatch({ type: 'INITIAL_STATE', payload : r}))
  	  }

export default fetchArticles




