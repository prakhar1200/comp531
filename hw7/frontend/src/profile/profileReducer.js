import resource from '../actions'

const initialState = {
		zipcode : "",
		email : "",
		displayError : false,
		errorMessage : ""
}

const ProfileReducer = (state = initialState , action) => {

		switch(action.type) {

		case 'CHANGE_ZIPCODE': 
		return Object.assign({}, state, {zipcode : action.payload, displayError : false}) 
  		
		case 'CHANGE_EMAIL':
		return Object.assign({}, state, {email : action.payload, displayError : false}) 
		
		case 'CHANGE_PASSWORD' :
		return  Object.assign({}, state, {displayError : true, errorMessage : action.payload}) 

		case 'LOG_OUT':
		return Object.assign({}, state, initialState)    
		
		case 'DISPLAY_ERROR':
		return Object.assign({}, state, {displayError : true, errorMessage : action.payload}) 

		default: return state;

}
}
export default ProfileReducer


