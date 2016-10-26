import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export default class Register extends React.Component {

    render() { 
        return (
//<div>      
      
              <div className="panel panel-default">
                    <div className="panel-heading text-center"><h2 className="panel-title">Register</h2></div>
                    <div className="panel-body ">
                      <div className="col-md-10 col-md-offset-1">
                            <form method="GET" action="index.html">
                              
                              <label className="col-md-2 font_style">Name</label> 
                              <input type="text" id="name" className="col-md-9   form-control formMargin" placeholder="John David" pattern="[a-zA-Z0-9 ]*$" required />
                              
                              <label className="col-md-2 font_style">Email</label>
                              <input type="email" id="emailID" className="col-md-9  form-control formMargin" placeholder="ab@c.com" required />                               
                              
                              <label className="col-md-2 font_style">PhoneNumber</label>
                              <input type="text" id="phoneNumber" className="col-md-9  form-control formMargin" placeholder="123-234-3456" pattern="\d\d\d-\d\d\d-\d\d\d\d" required />
                              
                              <label className="col-md-2 font_style">Zip</label>
                              <input type="text" id="zip" placeholder ="Zip" className="col-md-9  form-control formMargin" pattern="[0-9]{5}"/>
                              
                              <label className="col-md-2 font_style">BirthDate</label>
                              <input type="date" id="dob" className="col-md-9  form-control formMargin" required/>
                              
                              <label className="col-md-2 font_style">Password</label>
                              <input type="password" id="r_password" className="col-md-9  form-control formMargin " placeholder="password" required/>
                              
                              <label className="col-md-2 font_style">ConfirmPass</label>
                              <input type="password" id="r_confirmPassword" className="col-md-9   form-control formMargin" placeholder="password"  required/>
                              
                              <input type="submit" value="Register" className="btn btn-primary col-md-12" aria-label="Register" />
                             
                            </form> 
                        </div>      
                    </div>
                </div>
        
//</div>                 
    )}
}


