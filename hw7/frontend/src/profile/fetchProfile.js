import resource from '../actions'
import validator from 'validator'
import {url} from '../actions'

//Fetches the Profile Information Zipcode and Email
const fetchProfile = () => (dispatch) => {
     
            return Promise.all([resource('GET', 'zipcode'),resource('GET', 'email')])
		 	        .then(r => Promise.all([dispatch({ type: 'CHANGE_ZIPCODE', payload : r[0].zipcode}),
                                           dispatch({ type: 'CHANGE_EMAIL', payload : r[1].email})]))
  	  }

//To Join Multiple Error Messages on Profile Update
const joinError = (errors) => {
    return Object.keys(errors).map((errorKey) => { return errorKey +':'+errors[errorKey] }).join("\r\n")
}

export const changeAvatar = (newAvatar) => (dispatch) => {
                const fd = new FormData()
                fd.append('image', newAvatar)
                return fetch(url+'/avatar', {credentials: 'include', method : "PUT", body: fd})    
                .then(r =>  r.json())
                .then(r => dispatch({ type: 'CHANGE_AVATAR', payload : r.avatar}))
            
            }


export const updateProfile = (user) => (dispatch) =>{
        	    var error = false
                var requestEndpoint = []; //Array of Endpoints to Call on Profile Update
                const errors = {}; //Object to Store Errors
                if(user.zipcode.value) {
                    requestEndpoint.push("zipcode")
                    if(!validator.isNumeric(user.zipcode.value) || !validator.isLength(user.zipcode.value,{min:5, max: 5}))
                    {
                        error = true;       
                        errors.zipcode = "Zip Should be Number and Five Digits"
                    }
                   
                }
                if(user.email.value) {
                    requestEndpoint.push("email")

                    if(!validator.isEmail(user.email.value)) {
                            error = true;
                            errors.email = "Email Should be of type  xxx@xx.com"
                    }
                }   
                if(user.password.value || user.confirmPassword.value) {
                    requestEndpoint.push("password")
                    if(!validator.equals(user.password.value, user.confirmPassword.value)) {
        		        error = true;
                        errors.passwordConfirmation = "Passwords Do Not Match"
                    }
                }
        	    if(error) {
        		      return  dispatch({type:'DISPLAY_ERROR', payload : joinError(errors)})
        	    }
                else {
                return requestEndpoint.forEach((elem) => { 
                    var data = {}
                    data[elem] = user[elem].value
                    return resource('PUT', elem, data)
                        .then(r => dispatch({type : 'CHANGE_'+ elem.toUpperCase(), payload : elem==="password"?r.status : r[elem]}))
                 })             
            }
        }

export default fetchProfile




