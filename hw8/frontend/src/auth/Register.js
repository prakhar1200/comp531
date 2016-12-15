import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {register} from './authActions'

const Register = ({displayError,errorMessage,clicked}) => {

let userDetails = {}
let matchingPassword = '';

        return (
            <div>
              <div className="panel panel-default">
                    <div className="panel-heading text-center"><h3>Register</h3></div>
                    <div className="panel-body ">
                      <div className="col-md-10 col-md-offset-1">

                              <label className="col-md-2 font_style">UserName</label>
                              <input type="text" id="name" className="col-md-9   form-control formMargin" placeholder="John David" pattern="[a-zA-Z0-9 ]*$" ref={(node)=> userDetails.username = node} required />

                              <label className="col-md-2 font_style">Email</label>
                              <input type="email" id="emailID" className="col-md-9  form-control formMargin" placeholder="ab@c.com" ref={(node)=> userDetails.email = node} required />


                              <label className="col-md-2 font_style">Zip</label>
                              <input type="text" id="zip" placeholder ="Zip" className="col-md-9  form-control formMargin" ref={(node)=> userDetails.zipcode = node} pattern="[0-9]{5}"/>

                              <label className="col-md-2 font_style">BirthDate</label>
                              <input type="date" id="dob" className="col-md-9  form-control formMargin"  ref={(node)=> userDetails.dob = node} required/>

                              <label className="col-md-2 font_style">Password</label>
                              <input type="password" id="r_password" className="col-md-9  form-control formMargin " placeholder="password" ref={(node)=> userDetails.password = node} required/>

                              <label className="col-md-2 font_style">ConfirmPass</label>
                              <input type="password" id="r_confirmPassword" className="col-md-9   form-control formMargin" placeholder="password" ref={(node)=> matchingPassword = node}  required/>

                              <input type="submit"  onClick= {() => clicked(userDetails, matchingPassword)} value="Register" className="btn btn-primary col-md-12" aria-label="Register" />

                        </div>
                    </div>
              </div>
              <div className={displayError?"":"hide"}>
                      <div id="errorMessage" className="alert alert-danger col-md-8 col-md-offset-2">
                      {errorMessage}
                      </div>
              </div>
          </div>
      )
  }

export default connect(
     (state) => ({
              displayError : state.AuthReducer.registerError,
              errorMessage : state.AuthReducer.message
     }),
    (dispatch) => {

         return {
            clicked : (userDetails, matchingPassword) => { console.log(matchingPassword.value); register(userDetails,matchingPassword.value )(dispatch)}
         }

    }

)(Register)
