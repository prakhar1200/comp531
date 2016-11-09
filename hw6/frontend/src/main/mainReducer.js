import resource from '../actions'

const initialState = {
	followingInfo :[],
	articles : [],
	userAvatar : "",
	userHeadline : "",
	statusEditBoxVisible : "hide",
	addUserError : false,
	errorMessage : ""
	
	 
}

const MainReducer = (state = initialState , action) => {

		switch(action.type) {
		case 'INITIAL_FOLLOWING': 	
		return Object.assign({}, state, {followingInfo : action.payload, addUserError : false, errorMessage : ""}) 
  		
		case 'INITIAL_STATE':
		return Object.assign({}, state, {articles : action.payload[0].articles.map((article) => {return {...article, displayComment : false}}), userHeadline : action.payload[1].headlines[0].headline, userAvatar:action.payload[2].avatars[0].avatar })  
  	
		case 'SHOW_COMMENT':
		return Object.assign({}, state, {articles : state.articles.map((article) => { return article._id === action.payload._id? {...article, displayComment : true} :  article })})

		case 'HIDE_COMMENT':
		return Object.assign({}, state, {articles : state.articles.map((article) => (article._id === action.payload._id?  {...article, displayComment : false} :  article ))})

		case 'EDIT_STATUS_VISIBLE':
		return  Object.assign({}, state, {statusEditBoxVisible : "" }) 

		case 'EDIT_STATUS_HIDE':
		return  Object.assign({}, state, {statusEditBoxVisible : "hide" })

		case 'CHANGE_HEADLINE':
		return  Object.assign({}, state, {userHeadline : action.payload, statusEditBoxVisible : "hide" })
		 
		case 'POST_ARTICLE':
		return Object.assign({}, state, {articles : [...state["articles"], {...action.payload.articles[0],displayComment : false}]})
		
		case 'CHANGE_AVATAR':
		console.log(action.payload)
		return Object.assign({}, state, {userAvatar : action.payload})
		
		case 'ADD_FOLLOWER_ERROR':
		return  Object.assign({}, state, {addUserError : true, errorMessage: action.payload})
 
		case 'LOG_OUT':
	        return  Object.assign({}, state, initialState)                        
		
		default: return state;

}
}
export default MainReducer


