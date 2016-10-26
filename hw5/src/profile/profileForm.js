
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const ProfileForm = ({zipcode, emailID}) => {
return (
 <div className="col-md-5 col-md-offset-1">
             <div className="panel panel-default">
                    <div className="panel-heading"><h2 className="panel-title">User Info</h2></div>
                    <div className="panel-body text-center">
                            <div className="row">    
                                 <div className="col-md-12">
                                         <label className="col-md-2 font_style">Name</label>
                                         <input type="text" id="displayName" className="col-md-9 col-md-offset-1 input-lg formMargin" placeholder="" pattern="[a-zA-Z0-9 ]*$" />
                                         <label className="col-md-2 font_style">Email</label>
                                         <input type="email" id="emailID" className="col-md-9 col-md-offset-1 input-lg formMargin" placeholder={emailID} />                               
                                         <label className="col-md-2 font_style">Phone Number</label>
                                         <input type="text" id="phoneNumber" className="col-md-9 col-md-offset-1 input-lg formMargin" placeholder="" pattern="\d\d\d-\d\d\d-\d\d\d\d" />
                                         <label className="col-md-2 font_style">Zip Code</label>
                                         <input type="text" id="zip" placeholder = {zipcode} className="col-md-9 col-md-offset-1 input-lg formMargin" pattern="[0-9]{5}" />
                                         <label className="col-md-2 font_style">Password</label>
                                         <input type="password" id="password" className="col-md-9 col-md-offset-1 input-lg formMargin" required />
                                         <label className="col-md-2 font_style">Confirm Password</label>
                                         <input type="password" id="confirmPassword" className="col-md-9 col-md-offset-1 input-lg formMargin" required />
                                         <button type="button" id="update" className="btn btn-primary col-md-12" aria-label="Update"><strong>Update</strong>
                                         <span className="glyphicon glyphicon-share" aria-hidden="true">
                                         </span>
                                         </button>
                                 </div>         
                            </div>
                    </div>
             </div>
         </div> 
)
}
export default connect(
(state) => ( {
		  			
		      zipcode : state.ProfileReducer.zipcode,
		      emailID : state.ProfileReducer.email		
}
)
)(ProfileForm)
