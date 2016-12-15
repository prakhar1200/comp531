import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {postComment} from './articlesAction'

const Comments = ({userComments, articleID, sendComment, edit,  username}) => {
	let commentText;
	let editComment;
	

	return (
	 <div>
	 	<div className="input-group commentBox ">
            <input type="text" ref = {(node)=> commentText = node } className="form-control" />
              	<span className="input-group-btn">
                	<button type="button" id = {articleID} onClick={() => sendComment(commentText.value, articleID, -1)}  className="btn btn-primary" aria-label="AddComment">
                 		<span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
                	</button>
              	</span>
		</div>	
 
 	 
 	 
		{userComments.map((comment) => (
		<div>
	           <strong>{comment.author} commented on {(new Date(comment.date)).toString()}</strong>
		   <div>
		   <span contentEditable={comment.author === username?true:false} id={comment.commentId} ref={(node)=> editComment = node }>{comment.text}</span>
              	 <span className={comment.author === username?"":"hide"}>
                   <button type="button" onClick={() => sendComment(editComment.textContent, articleID, editComment.id)}  className="btn btn-secondary" aria-label="EditComment">
                 	 <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                   </button>
              	 </span>
		</div>

		</div>
		))}
	 		
    </div> 
    )
	}



export default connect(
    (state) => {
        return {

	    username : state.ProfileReducer.username
        }
	},
(dispatch) => {
	return {
		sendComment :(text, articleID, commentId) =>  postComment(text, articleID, commentId)(dispatch),
		edit :(text, articleID, commentId) =>  postComment(text, articleID, commentId)(dispatch)
		
         }
  }

)(Comments)		










