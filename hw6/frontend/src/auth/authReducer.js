
const initialState = {
	location : 'LANDING_PAGE',
	displayError  : false,
	registerError : false,
	message : ""
						
}

const AuthReducer = (state = initialState , action) => {

		switch(action.type) {
			
		case 'Log_In': 
		if(action.payload.result==="success") { return Object.assign({}, state, {location : 'MAIN_PAGE', displayError  : false}) } 
		else {return state}
		case 'ERROR':
		return Object.assign({}, state, {displayError:true})
	
      		
		case 'NAV_PROFILE':
		return Object.assign({}, state, {location : 'PROFILE_PAGE'})
		
		case 'NAV_MAIN':
		return Object.assign({}, state, {location : 'MAIN_PAGE'})
		
		case 'REGISTER_ERROR':
		return Object.assign({}, state, {registerError : true, message: action.payload})

		case 'LOG_OUT':
		return Object.assign({}, state, initialState)  

		           
		
		default: return state;
		
}
}
export default AuthReducer


