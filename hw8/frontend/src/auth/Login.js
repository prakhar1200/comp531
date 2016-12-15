import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {facebookLogin} from './authActions'
import login from './authActions'
//import facebookLogin from './authActions'
import resource from '../actions'

import fetchFollowing from '../main/followers/followersAction'
export const  Login = ({loginClicked, displayError, fbLogin})=> {

  let username;
  let password;

	const _loginClicked = () => {

		if(username && username.value && password && password.value){
			loginClicked(username.value, password.value)
			}
		}		


			return (
		    <div>
               
             <div className="panel panel-default">
                    <div className="panel-heading text-center"><h3>Login</h3></div>
                    <div className="panel-body text-center">
                            <div className="form-group col-md-10 col-md-offset-1 text-center">
                               
                               <label className="col-md-2 font_style">Email</label>
                               <input type="email" id="username" className="form-control formMargin" placeholder="UserName" ref={(node)=> username = node} required /> 
                               <label className="col-md-2 font_style">Password</label>
                               <input type="password" id="login_password" className="form-control formMargin" placeholder="Password" ref={(node)=> password = node} required />
                             <input type="submit" id="login_button" value="Login" className="btn btn-primary col-md-12"  aria-label="Login" onClick={_loginClicked}  />
			     <button className="btn btn-primary" onClick={fbLogin}><span className="fa fa-facebook">Facebook</span></button>
						
                               
                            </div>
                    </div>
            </div>
            <div className={displayError?"":"hide"}>    
                      <div id="errorMessage" className="alert alert-danger col-md-8 col-md-offset-2">
                      Invalid Login !! Check Username and Password
                      </div>
            </div>
          
        </div>
    )}




export default connect(
    (state) => {
        return {
            displayError: state.AuthReducer.displayError
        }
    },
    (dispatch) => {
	return {
		loginClicked :(username, password) => login(username, password)(dispatch),
		fbLogin : () => facebookLogin()(dispatch)
         }
  }
)(Login)



