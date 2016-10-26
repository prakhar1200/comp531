
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import Register from './Register'
import Login from './Login'


export default class LandingPage extends React.Component {
            constructor(props) {
                    super(props)
        
    }
    render() {
        return(
        <div className="container-fluid">
            <div className="row panelContainer">
                <div className="col-md-3 col-md-offset-2">
                <Register/>
                </div>
                <div className="col-md-3 col-md-offset-2">
                <Login/>
                </div>
            </div>
        </div>
        )       
    }    
}




