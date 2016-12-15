
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import Nav from './nav'
import Followers from './followers/followers'
import User from './user/user'
import Articles from './articles/articles'


export default class Main extends React.Component {
            constructor(props) {
                    super(props)
        
    }
    render() {
        return(
	<div>
        <div className="container-fluid">
           
               <Nav />
	       <User />
            
        </div>
	<div className="row">
	      <Followers />
	      <Articles />

	</div>
	</div>
        )       
    }    
}




