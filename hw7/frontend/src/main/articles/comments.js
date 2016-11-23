import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {postComment} from './articlesAction'

const Comments = ({userComments, articleID, sendComment}) => {
	let commentText;
	

	return (
	 <div>
	 	<div className="input-group commentBox ">
            <input type="text" ref = {(node)=> commentText = node } className="form-control" />
              	<span className="input-group-btn">
                	<button type="button" id = {articleID} onClick={() => sendComment(commentText.value, articleID)}  className="btn btn-primary" aria-label="Comment">
                 		<span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
                	</button>
              	</span>
		</div>	
 
 	 
 	 
		{userComments.map((comment) => (
		<div id={comment.commentid}>
	           <strong>{comment.author} commented on {comment.date}</strong>
		   <p>{comment.text}</p>	 	
		</div>
		))}
	 		
    </div> 
    )
	}



export default connect(
null,
(dispatch) => {
	return {
		sendComment :(text, articleID) =>  postComment(text, articleID)(dispatch).then(r => commentText.value = "")
         }
  }

)(Comments)		










