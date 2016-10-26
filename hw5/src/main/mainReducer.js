import resource from '../actions'

const initialState = {
	followingInfo :[],
	articles : [],
	userAvatar : "",
	userHeadline : "",
	statusEditBoxVisible : "hide"
	
	 
}

const MainReducer = (state = initialState , action) => {

		switch(action.type) {
		case 'INITIAL_FOLLOWING': 
			
		return Object.assign({}, state, {followingInfo : action.payload}) 
  		
		case 'INITIAL_STATE':
		return Object.assign({}, state, {articles : action.payload[0].articles, userHeadline : action.payload[1].headlines[0].headline, userAvatar:action.payload[2].avatars[0].avatar })  
  	
		case 'EDIT_STATUS_VISIBLE':
		return  Object.assign({}, state, {statusEditBoxVisible : "" }) 
		
		case 'EDIT_STATUS_HIDE':
		return  Object.assign({}, state, {statusEditBoxVisible : "hide" })
		case 'CHANGE_HEADLINE':
		return  Object.assign({}, state, {userHeadline : action.payload, statusEditBoxVisible : "hide" })   
		case 'LOG_OUT':
	        return  Object.assign({}, state, initialState)                        
		
		default: return state;

}
}
export default MainReducer


