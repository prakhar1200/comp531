import fetchFollowing from './main/followers/followersAction' 
import fetchArticles from './main/articles/articlesAction'
import fetchProfile from './profile/fetchProfile'  
//On Successful Login Fetches all the User Related Information
//Stores the Information in Redux Store.  
 const fetchMainPage = (usernames) => (dispatch) => {

	const p1 =  fetchFollowing(usernames)(dispatch)
	const p2 = fetchArticles()(dispatch)
	const p3 = fetchProfile()(dispatch)
	return Promise.all([p1, p2, p3])
}



export default fetchMainPage
