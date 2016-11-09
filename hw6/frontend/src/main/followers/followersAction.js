import resource from '../../actions'
import { connect } from 'react-redux'

//Aggregates Follower Avatar and headlines
export const reduceFollower = (headlines, avatars) => {
   return headlines.map((headline) => ({username : headline.username, headline : headline.headline, avatar : avatars.find((user) => (user.username === headline.username)).avatar}) )

}



export const  unfollowUser = (username) =>(dispatch) => {

	return resource('DELETE','following/'+username)
		.then(r => fetchFollowing(r.following.join(','))(dispatch))
}


export const  addFollower = (username, followers) =>(dispatch) => {

		if(followers.find(function(follower) {
		//if follower already exists
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
		.then(r => fetchFollowing(r.following.join(','))(dispatch))
		.catch(r => dispatch({type : 'ADD_FOLLOWER_ERROR', payload : r}) )
	}
}

const fetchFollowing = (userList) => (dispatch) => {

                 return Promise.all([resource('GET', 'headlines/'+userList)
				, resource('GET', 'avatars/'+userList)])
		 .then(arr => reduceFollower(arr[0].headlines, arr[1].avatars))
		 .then(r => (dispatch({ type: 'INITIAL_FOLLOWING', payload : r})))
  	  }
export default fetchFollowing




