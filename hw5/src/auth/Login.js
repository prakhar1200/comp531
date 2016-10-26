import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import login from './authActions'
import resource from '../actions'

import fetchFollowing from '../main/followers/followersAction'
export const  Login = ({loginClicked, displayError})=> {

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
                    <div className="panel-heading text-center"><h2 className="panel-title">Login</h2></div>
                    <div className="panel-body text-center">
                            <div className="form-group col-md-10 col-md-offset-1 text-center">
                               
                               <label className="col-md-2 font_style">Email</label>
                               <input type="email" id="username" className="form-control formMargin" placeholder="UserName" ref={(node)=> username = node} required /> 
                               <label className="col-md-2 font_style">Password</label>
                               <input type="password" id="login_password" className="form-control formMargin" placeholder="Password" ref={(node)=> password = node} required />
                             <input type="submit" value="Login" className="btn btn-primary col-md-12"  aria-label="Login" onClick={_loginClicked}  />
						
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
		loginClicked :(username, password) => login(username, password)(dispatch)
         }
  }
)(Login)



