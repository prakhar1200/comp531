import resource from '../actions'
import fetchMainPage from '../fetchMain'
import fetchFollowing from '../main/followers/followersAction'

//Log the User in and then fetches the Main Page
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


//Register the User
export const register = (userDetails, matchingPassword) => (dispatch) => {
	

  if(!userDetails.username.value || !userDetails.email.value || !userDetails.zipcode.value){

	    dispatch({type :'REGISTER_ERROR', payload : "All Fields are required" })
    	    return
	}
  else if(userDetails.password.value !== matchingPassword) {

    dispatch({type :'REGISTER_ERROR', payload : "Passwords don't match" })
    return
  }
  else if(userDetails.password.value.length < 3)  {

    dispatch({type :'REGISTER_ERROR', payload : "Passwords should be minimum 3 characters " })
    return
  }

  else {
    const requestPayload = {};
    Object.keys(userDetails).map((input) => {requestPayload[input] = userDetails[input].value})
    return resource('POST','register', requestPayload)
           .then(r => dispatch({type :'REGISTER_ERROR', payload : r }))
  }



}

export default login
