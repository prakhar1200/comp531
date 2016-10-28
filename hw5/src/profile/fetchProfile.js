import resource from '../actions'


//Fetches profile information like zip, email
const fetchProfile = () => (dispatch) => {

    return Promise.all([resource('GET', 'zipcode'), resource('GET', 'email')])
            .then(r => Promise.all([dispatch({
                type: 'CHANGE_ZIPCODE',
                payload: r[0].zipcode
            }), dispatch({
                type: 'CHANGE_EMAIL',
                payload: r[1].email
            })]))
}

export default fetchProfile
