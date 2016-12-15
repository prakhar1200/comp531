import {combineReducers} from 'redux'
import AuthReducer from './auth/authReducer'
import MainReducer from './main/mainReducer'
import ProfileReducer  from './profile/profileReducer'

//Combines All the Reducers For Authentication , Main, Profile
const Reducer = combineReducers({
		AuthReducer : AuthReducer,
		MainReducer : MainReducer,
		ProfileReducer : ProfileReducer
})


export default Reducer
