import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import changeHeadline from  './headlinesActions'
import resource from '../../actions'

const Headline = ({userHeadline,statusEditBoxVisible, showEditBox, hideEditBox, changeHeadline}) => {

    let newStatus;
	const _changeHeadline = () => {
	       
		if(newStatus && newStatus.value ) {
			changeHeadline(newStatus.value)
			}
		newStatus.value = '';
		}		
	

	 return (
		<div>
		<h2><span id="statusText">“{userHeadline}”</span> <span id="editStatusButton" className="glyphicon glyphicon-edit" onClick={showEditBox}></span></h2>
		          <div id = "editStatus" className="input-group" className = {statusEditBoxVisible}>
			            <input id= "statusBox" type="text" className="form-control" ref={(node) => newStatus = node}></input>
			            <span  id ="changeStatus" className="input-group-addon btn btn-primary glyphicon glyphicon-ok " onClick={_changeHeadline}></span>
			            <span  id ="cancelStatus" className="input-group-addon btn btn-primary glyphicon glyphicon-remove " onClick={hideEditBox}></span>
	 	         </div>
		</div> 
	)

}

export default connect(
    (state) => {
	
        return {

            userHeadline: state.MainReducer.userHeadline,
	    statusEditBoxVisible : state.MainReducer.statusEditBoxVisible
        }
    },
(dispatch) => { return {
			
		showEditBox : () => (dispatch({type:'EDIT_STATUS_VISIBLE'})),
		hideEditBox : () => (dispatch({type:'EDIT_STATUS_HIDE'})),
		changeHeadline : (newheadline) => changeHeadline(newheadline)(dispatch)

}
}
)(Headline)

