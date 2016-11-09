
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import Nav from '../main/nav'
import Avatar from '../main/user/avatar'
import ProfileForm from './profileForm'
import {changeAvatar} from './fetchProfile'


const  Profile = ({change}) => {
            
    let newAvatar;

        return(
        	<div>	           
                <Nav />
        	   <div className="jumbotron">
        	 	     <div className="text-center">

        	 		    <Avatar />
        	 		    <div className="row">
                   		   <span className="input-group-addon btn btn-primary col-md-6"> <label for="uploadFile" className="col-md-4 col-md-offset-4">
                     		Update Picture  <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
        			       <input className="hide" type="file" id='uploadFile' accept="image/*"  onChange={(e) => newAvatar = e.target.files[0]} />
                     	   </label>
                     	   </span>
                        </div>
                    <div className="row">	 
        			<button id="changeAvatar" className="btn btn-primary col-md-6" onClick={() => change(newAvatar)} >Upload</button> 
                    </div> 
                    </div>
         	     </div>	    
        	   <ProfileForm /> 
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






