
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {linkAccount} from './fetchProfile'

const LinkForm = ({linkAccountClicked, linkError, linkSuccess, type, username}) => {

let user = {

};
const _linkButtonClicked = () => {

         linkAccountClicked(user)
         Object.keys(user).map((elem) => {user[elem].value=''})
}



return (
<div>   
    <div className={type==='facebook'?"col-md-5 col-md-offset-1":"hide"}>

        <div className="panel panel-default">
                <div className="panel-heading">
                        <h2>Link Account</h2>
                </div>
                 <div className="panel-body text-center">
                    <div className="row">    
                        <div className="col-md-12">
                            <label className="col-md-2 font_style">UserName</label>
                            <label className="col-md-9 col-md-offset-1 input-lg formMargin">{username}</label>                             
                            <label className="col-md-2 font_style">Password</label>
                            <input type="password" id="linkPassword" className="col-md-9 col-md-offset-1 input-lg formMargin" ref={(node)=> user.password = node} />
                            <label className="col-md-2 font_style">Confirm Password</label>
                            <input type="password" id="linkConfirmPassowrd" className="col-md-9 col-md-offset-1 input-lg formMargin" ref={(node)=> user.confirmPassword = node} />
                            <button type="button" id="link" className="btn btn-primary col-md-12" onClick={_linkButtonClicked} aria-label="Link"><strong>Link Account</strong>
                                    <span className="glyphicon glyphicon-share" aria-hidden="true">
                                    </span>
                            </button>   
                        </div>         
                     </div>
                            
                </div>
        </div>
 
    </div>
    <div className={linkSuccess?"":"hide"}>    
                    <div className="alert alert-success col-md-8 col-md-offset-2">
                    {linkSuccess}
                    </div>
    </div>
    <div className={linkError?"":"hide"}>    
                    <div className="alert alert-danger col-md-8 col-md-offset-2">
                    {linkError}
                    </div>
    </div>    

</div> 
)
}


export default connect(
(state) => ( {
                        
              linkError : state.ProfileReducer.linkError,
              linkSuccess : state.ProfileReducer.linkSuccess,
          type : state.ProfileReducer.type,
          username : state.ProfileReducer.username
            
}),
(dispatch) => {
    return {
        linkAccountClicked :(user) => linkAccount(user)(dispatch)
        }
  }

)(LinkForm)