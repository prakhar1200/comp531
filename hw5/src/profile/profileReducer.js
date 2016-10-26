import resource from '../actions'

const initialState = {
		zipcode : "",
		email : ""
	
	 
}

const ProfileReducer = (state = initialState , action) => {

		switch(action.type) {

		case 'CHANGE_ZIPCODE': 
		return Object.assign({}, state, {zipcode : action.payload}) 
  		
		case 'CHANGE_EMAIL':
		return Object.assign({}, state, {email : action.payload}) 
		
		case 'LOG_OUT':
		return Object.assign({}, state, initialState)    
		
		default: return state;

}
}
export default ProfileReducer


