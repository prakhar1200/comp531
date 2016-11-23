import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

 const  Avatar = ({userAvatar}) =>{ 	
	return (	
		<div>
	        <img src={userAvatar} id="profile_img" className="img-circle img-thumbnail"></img>
	     </div>   
)
}

export default connect(
    (state) => {

        return {

	    userAvatar : state.MainReducer.userAvatar,

        }
    }
)(Avatar)











