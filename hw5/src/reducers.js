import {combineReducers} from 'redux'
import AuthReducer from './auth/authReducer'
import MainReducer from './main/mainReducer'
import ProfileReducer  from './profile/profileReducer'

const Reducer = combineReducers({
		AuthReducer : AuthReducer,
		MainReducer : MainReducer,
		ProfileReducer : ProfileReducer
})

export default Reducer
