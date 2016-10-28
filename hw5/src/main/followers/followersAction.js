import resource from '../../actions'
import { connect } from 'react-redux'

//Aggregates the Follwoing User headline and avatars
export const reduceFollower = (headlines, avatars) => {
   return headlines.map((headline) => ({username : headline.username, headline : headline.headline,
                                        avatar : avatars.find((user) => (user.username === headline.username)).avatar}) )

}

//Fetches the followers
const fetchFollowing = (userList) => (dispatch) => {

                 return Promise.all([resource('GET', 'headlines/'+userList)
				, resource('GET', 'avatars/'+userList)])
		 .then(arr => reduceFollower(arr[0].headlines, arr[1].avatars))
		 .then(r => (dispatch({ type: 'INITIAL_FOLLOWING', payload : r})))
  	  }
export default fetchFollowing




