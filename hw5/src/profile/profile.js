import React, {Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import Nav from '../main/nav'
import Avatar from '../main/user/avatar'
import ProfileForm from './profileForm'


const Profile = () => {

	return (
		<div>
        	<Nav />
			<div className="jumbotron">
	 			<div className="text-center">
	 				<Avatar />
	 				<div className="row">
           				<span className="input-group-addon btn btn-primary"> <label for="uploadFile" className="col-md-4 col-md-offset-4">
             			Update Picture  <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
             			</label>
             			<input className="hide" type="file" id='uploadFile'/></span> 
          			</div> 
				</div>
 		   </div>	    
	       <ProfileForm />
		</div>
	)
}

export default Profile
