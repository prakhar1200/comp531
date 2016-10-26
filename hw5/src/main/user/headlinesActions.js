

import resource from '../../actions'


const changeHeadline = (newHeadline) => (dispatch) => resource('PUT', 'headline',{headline : newHeadline}).then(r => (dispatch({type:'CHANGE_HEADLINE', payload : r.headline })))

export default changeHeadline
