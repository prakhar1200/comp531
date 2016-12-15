import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Headline from './headline'
import Avatar from './avatar'

 const  User = () =>{ 		
	return (	
	<div className="jumbotron">
        <div className="container-fluid text-center">
	<Avatar />	
	<Headline />
        </div>
  </div>    
)
}

export default User










