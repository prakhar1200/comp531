
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'

import LandingPage from './auth/landing'
import Main from './main/main'
import Profile from './profile/profile'

export const  App = ({location})=> {
         
//Navigates the Page Based on Location State 
	   if(location === 'LANDING_PAGE'){
	      		return <LandingPage />;	}
	  	else if(location === 'MAIN_PAGE') {
		return <Main />; }	 
		else {
		return <Profile />
		      }		
    	    
	
}



export default connect(
(state) => {
        return {
	
            location : state.AuthReducer.location

        }
    }
    
)(App);





