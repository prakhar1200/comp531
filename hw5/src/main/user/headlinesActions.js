

import resource from '../../actions'

//Changes the Headline of the user
const changeHeadline = (newHeadline) => (dispatch) => resource('PUT', 'headline',{headline : newHeadline})
                                                        .then(r => (dispatch({type:'CHANGE_HEADLINE', payload : r.headline })))

export default changeHeadline
