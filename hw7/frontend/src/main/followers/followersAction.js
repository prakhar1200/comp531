import resource from '../../actions'
import { connect } from 'react-redux'

export const reduceFollower = (headlines, avatars) => {
   return headlines.map((headline) => ({username : headline.username, headline : headline.headline, avatar : avatars.find((user) => (user.username === headline.username)).avatar}) )

}



export const  unfollowUser = (username) =>(dispatch) => {

	return resource('DELETE','following/'+username)
		.then(r => fetchFollowing(r.following.join(','))(dispatch))
}

export const  addFollower = (username, followers) =>(dispatch) => {

		if(followers.find(function(follower) {
		if(follower.username === username)
			{
			  return  dispatch({type : 'ADD_FOLLOWER_ERROR', payload : "User Already  Exists"})	
		}
		else {
			return false;
		}
		
	}))
		{
			return
		}
	else {
	return resource('PUT','following/'+username)
		.then(r => r.following.length!==followers.length?fetchFollowing(r.following.join(','))(dispatch):dispatch({type : 'ADD_FOLLOWER_ERROR', payload : "No such User"}))
		.catch(r => dispatch({type : 'ADD_FOLLOWER_ERROR', payload : r}))

	}
}

const fetchFollowing = (userList) => (dispatch) => {
		if(userList)
		{		
                 return Promise.all([resource('GET', 'headlines/'+userList)
				, resource('GET', 'avatars/'+userList)])
		 .then(arr => reduceFollower(arr[0].headlines, arr[1].avatars))
		 .then(r => (dispatch({ type: 'INITIAL_FOLLOWING', payload : r})))
		}
		else{
		dispatch({ type: 'INITIAL_FOLLOWING', payload : []})
		} 
  	  }
export default fetchFollowing




