import resource from '../actions'
import fetchMainPage from '../fetchMain'
import fetchFollowing from '../main/followers/followersAction'

const login = (username, password) => (dispatch) => {
  
  
  return resource('POST', 'login', { 
      username: username, 
      password: password 
    }).then(r => { 
	dispatch({
		type : 'Log_In',
		payload : r
	})
    })
    .then(r => resource('GET', 'following'))
    .then(r => r.following.join(','))
    .then(r => fetchMainPage(r)(dispatch))
    .catch(dispatch({
		type : 'ERROR'
	}))
}

export default login




