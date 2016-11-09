import resource from '../actions'
import fetchMainPage from '../fetchMain'
import fetchFollowing from '../main/followers/followersAction'

//Login User 
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
    .catch(() => dispatch({
		type : 'ERROR'
	}))
}

//Register User
export const register = (userDetails, matchingPassword) => (dispatch) => {
  
  if(userDetails.password.value !== matchingPassword.value)
  {
    dispatch({type :'REGISTER_ERROR', payload : "Passwords don't match" })
    return 
  }

  else {
    const requestPayload = {};
    Object.keys(userDetails).map((input) => {requestPayload[input] = userDetails.input.value})
    return resource('POST','register', requestPayload)
           .then(r => dispatch({type :'REGISTER_ERROR', payload : "Successs" }))
  }



} 

export default login




