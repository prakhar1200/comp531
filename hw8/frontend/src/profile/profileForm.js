
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateProfile} from './fetchProfile'

const ProfileForm = ({zipcode, emailID, updateProfileClicked, displayError, errorMessage, type}) => {

let user = {

};
const _updateProfileClicked = () => {

         updateProfileClicked(user)
         Object.keys(user).map((elem) => {user[elem].value=''})
}



return (

 <div className="col-md-5 col-md-offset-1">
             <div className="panel panel-default">
                    <div className="panel-heading"><h2>User Info</h2>
                    </div>
                    <div className="panel-body text-center">
                            <div className="row">    
                                 <div className="col-md-12">
                                         <label className="col-md-2 font_style">Email</label>
                                         <input type="email" id="emailID" className="col-md-9 col-md-offset-1 input-lg formMargin" readonly="readonly" placeholder={emailID} ref={(node)=> user.email = node} />                               
  
                                         <label className="col-md-2 font_style">Zip Code</label>
                                         <input type="text" id="zip" placeholder = {zipcode} className="col-md-9 col-md-offset-1 input-lg formMargin" ref={(node)=> user.zipcode = node}   pattern="[0-9]{5}" /> 				 <div className={type==='facebook'?"hide":""}>
                                         <label className="col-md-2 font_style">Password</label>
                                         <input type="password" id="password" className="col-md-9 col-md-offset-1 input-lg formMargin" ref={(node)=> user.password = node}  />
                                         <label className="col-md-2 font_style">Confirm Password</label>
                                         <input type="password" id="confirmPassword" className="col-md-9 col-md-offset-1 input-lg formMargin" ref={(node)=> user.confirmPassword = node}   />
					 </div>
                                         <button type="button" id="update" className="btn btn-primary col-md-12" onClick = {_updateProfileClicked} aria-label="Update"><strong>Update</strong>
                                         <span className="glyphicon glyphicon-share" aria-hidden="true">
                                         </span>
                                         </button>

					
					
                                 </div>         
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
(state) => ( {
		  			
		      zipcode : state.ProfileReducer.zipcode,
		      emailID : state.ProfileReducer.email,	
              displayError : state.ProfileReducer.displayError,
              errorMessage : state.ProfileReducer.errorMessage,
	      type : state.ProfileReducer.type
			
}),
(dispatch) => {
    return {
        updateProfileClicked :(user) => updateProfile(user)(dispatch)
        }
  }

)(ProfileForm)
