import resource from '../actions'
import fetchMainPage from '../fetchMain'
import fetchFollowing from '../main/followers/followersAction'


//Logs in the users if authenticated fetching all the User Information
//Dispaly error if the Login is Unauthorized
const login = (username, password) => (dispatch) => {

    return resource('POST', 'login', {
            username: username,
            password: password
        }).then(r => {
            dispatch({
                type: 'Log_In',
                payload: r
            })
        })
        .then(r => resource('GET', 'following'))
        .then(r => r.following.join(','))
        .then(r => fetchMainPage(r)(dispatch))
        .catch(() => dispatch({
            type: 'ERROR'
        }))
}

//Login using Thir Party Application 
//Currently Supports Facebook
//Redirects to the Authentication of the Facebook App
export const facebookLogin = () => (dispatch) => {

    window.location.href = "https://www.facebook.com/dialog/oauth?response_type=code&redirect_uri=https%3A%2F%2Ffinalbackendshareit.herokuapp.com%2Fauth%2Ffacebook%2Fcallback&scope=email&client_id=152847905185047"


}

//Register New User
export const register = (userDetails, matchingPassword) => (dispatch) => {

    //Validation Check
    if (!userDetails.username.value || !userDetails.email.value || !userDetails.zipcode.value) {

        dispatch({
            type: 'REGISTER_ERROR',
            payload: "All Fields are required"
        })
        return
    } else if (userDetails.password.value !== matchingPassword) {

        dispatch({
            type: 'REGISTER_ERROR',
            payload: "Passwords don't match"
        })
        return
    } else if (userDetails.password.value.length < 3) {
        //Dispaly error if the Authentication fails
        dispatch({
            type: 'REGISTER_ERROR',
            payload: "Passwords should be minimum 3 characters "
        })
        return
    } else {
        //Valid Fields Makes fetch request to the Backend for Registering the user
        const requestPayload = {};
        Object.keys(userDetails).map((input) => {
            requestPayload[input] = userDetails[input].value
        })
        return resource('POST', 'register', requestPayload)
            .then(r => dispatch({
                type: 'REGISTER_ERROR',
                payload: r
            }))
    }



}

//Fetch Contents of the User without Login
//Fails if user is not logged In
export const fetchHeadline = () => (dispatch) => {

    return resource('GET', 'following')
        .then(r => r.following.join(','))
        .then(r => fetchMainPage(r)(dispatch))
        .then(r => dispatch({
            type: 'NAV_MAIN'
        }))


}

export default login
