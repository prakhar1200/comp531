import fetchFollowing from './main/followers/followersAction' 
import fetchArticles from './main/articles/articlesAction'
import fetchProfile from './profile/fetchProfile'  

//Fetches Main Page Information
 const fetchMainPage = (usernames) => (dispatch) => {

	const p1 =  fetchFollowing(usernames)(dispatch)
	const p2 = fetchArticles()(dispatch)
	const p3 = fetchProfile()(dispatch)
	return Promise.all([p1, p2, p3])
}

export default fetchMainPage
