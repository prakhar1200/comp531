
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ReactDOM from 'react-dom'
import Nav from '../main/nav'
import Avatar from '../main/user/avatar'
import ProfileForm from './profileForm'
import LinkForm from './linkAccount'
import {changeAvatar} from './fetchProfile'
const  Profile = ({change}) => {       
    const uploadAvatar =  (avatar) => {
        if(avatar.target.files[0])
        {
            change(avatar.target.files[0])
        }

    }
        return(
	<div>	           
               <Nav />
	 <div className="jumbotron">
	 	<div className="text-center">
	 		<Avatar />
	 		<div className="row">
           		<span className="btn btn-primary col-md-6 col-md-offset-3 col-md-right-offset-3"> <label for="uploadFile" className="col-md-12">
             		Update Picture  <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
			<input className="hide" type="file" id='uploadFile' accept="image/*"  onChange={(e) => uploadAvatar(e)} />
             		</label>
             	</span>
             </div>
		 </div>
 	 </div>	
		<div>    
	       <ProfileForm />
		</div>
               <LinkForm />
     
	</div>
        )       
    } 

export default connect(
     null,
    (dispatch) => {     
         return {
            change : (newAvatar) => changeAvatar(newAvatar)(dispatch),
         }       
    }
)(Profile)






