import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'


const Nav = ({navToMain, navToProfile, navToLanding}) =>  {


 
	return(
	  <nav className="navbar navbar-inverse">
	    <div className="container">
      		<div className="navbar-header">
        		<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            			<span className="sr-only">Toggle navigation</span>
           			<span className="icon-bar"></span>
            			<span className="icon-bar"></span>
            			<span className="icon-bar"></span>
        		</button>
        		<a id="nav_name" className="navbar-brand" href="#">Share`it</a>
      		</div>
      		<div id="navbar" className="navbar-collapse collapse">
        		<form className="navbar-form navbar-left">
          			<div className="form-group">
            				<input type="text" className="form-control" placeholder="Search"></input>
          			</div>
          			<button type="button" className="btn btn-default" aria-label="Search">
        					<span className="glyphicon glyphicon-search" aria-hidden="true">
						</span>
				</button>
        		</form>
       			<ul className="nav navbar-nav navbar-right">
				<li className="text-capitalize navbar-brand h1" onClick = {navToMain}>Home</li>
          			<li className="text-capitalize h3 navbar-brand" onClick = {navToProfile}>Profile</li>
          			<li className="text-capitalize  h3 navbar-brand" onClick = {navToLanding}>Logout</li>
        		</ul>


      		</div>
    	     </div>
  	   </nav>
 
)


}

export default connect(
    (state) => {

        return {

            
        }
    },
(dispatch) => {
		return {
			navToMain : () => (dispatch({type:'NAV_MAIN'})),
			navToProfile : () => (dispatch({type:'NAV_PROFILE'})),	
			navToLanding : () => (dispatch({type:'LOG_OUT'}))
				
}
		
}
)(Nav)

