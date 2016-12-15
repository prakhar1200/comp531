import resource from '../actions'
import validator from 'validator'
import {url} from '../actions'

//Fetches the Profile Information like Zipcode, Email by making fetch request to the Backend  
const fetchProfile = () => (dispatch) => {

    return Promise.all([resource('GET', 'zipcode'), resource('GET', 'email'), resource('GET', 'accountType')])
        .then(r => Promise.all([dispatch({
                type: 'CHANGE_ZIPCODE',
                payload: r[0].zipcode
            }),
            dispatch({
                type: 'CHANGE_EMAIL',
                payload: r[1].email
            }), dispatch({
                type: 'ACCOUNT_TYPE',
                payload: r[2]
            })
        ]))
}

//Creates a String Of all the errors while updating Profile Information
const joinError = (errors) => {
    return Object.keys(errors).map((errorKey) => {
        return errorKey + ':' + errors[errorKey]
    }).join("\r\n")
}

//Changes Avatar: Sends the File Bytes for the image in FormData
export const changeAvatar = (newAvatar) => (dispatch) => {
    const fd = new FormData()
    fd.append('image', newAvatar)
    return fetch(url + '/avatar', {
            credentials: 'include',
            method: "PUT",
            body: fd
        })
        .then(r => r.json())
        .then(r => dispatch({
            type: 'CHANGE_AVATAR',
            payload: r.avatar
        }))

}

//Update the Profile Information like Password, Email etc.
//Check For All the Errors while Updating and Notifies the User
export const updateProfile = (user) => (dispatch) => {
        var error = false
        var requestEndpoint = [];
        const errors = {

        };
        if (user.zipcode.value) {
            requestEndpoint.push("zipcode")
            console.log(validator.isNumeric(user.zipcode.value), validator.isLength(user.zipcode.value, {
                min: 5,
                max: 5
            }))
            if (!validator.isNumeric(user.zipcode.value) || !validator.isLength(user.zipcode.value, {
                    min: 5,
                    max: 5
                })) {
                error = true;
                errors.zipcode = "Zip Should be Number and Five Digits"
            }

        }
        if (user.email.value) {
            requestEndpoint.push("email")

            if (!validator.isEmail(user.email.value)) {
                error = true;
                errors.email = "Email Should be of type  xxx@xx.com"
            }
        }
        if (user.password.value || user.confirmPassword.value) {
            requestEndpoint.push("password")
            if (!validator.equals(user.password.value, user.confirmPassword.value)) {
                error = true;
                errors.passwordConfirmation = "Passwords Do Not Match"
            }
        }
        if (error) {
            return dispatch({
                type: 'DISPLAY_ERROR',
                payload: joinError(errors)
            })
        } else {
            return requestEndpoint.forEach((elem) => {
                var data = {}
                data[elem] = user[elem].value
                return resource('PUT', elem, data)
                    .then(r => dispatch({
                        type: 'CHANGE_' + elem.toUpperCase(),
                        payload: elem === "password" ? r.status : r[elem]
                    }))
            })
        }
    }
    //Link Third Party Accounts :
    //User Creates a Password and On linking it allows the user to access the same profile using the Username and Password
    //from  local login 
export const linkAccount = (user) => (dispatch) => {
    const successMessage = "Account Successfully Linked!! Now You can access the Same Account From Local Login System Using the Username above and Password Set"
    if (user.password.value || user.confirmPassword.value) {
        if (!validator.equals(user.password.value, user.confirmPassword.value)) {
            return dispatch({
                type: 'LINK_ERROR',
                payload: "Password Don't Match"
            })
        } else {
            return resource('POST', 'linkAccount', {
                    password: user.password.value
                })
                .then(r => r.result === "success" ? dispatch({
                    type: 'ACCOUNT_LINKED',
                    payload: successMessage
                }) : dispatch({
                    type: 'LINK_ERROR',
                    payload: "Failed"
                }))

        }
    }

}

export default fetchProfile

