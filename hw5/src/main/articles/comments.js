import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
const Comments = ({userComments}) => (
<div>
    <div>
        <div>
            <button type="button" className="btn btn-primary col-md-2 buttonc" aria-label="Comment">
                  <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
                </button>
            <button type="button" className="btn btn-primary col-md-2 buttonc" aria-label="Comment">
                 <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </button>
        </div>

    </div>
    <div>
        {userComments.map((comment) => (
        <div id={comment.commentid}>
            <strong>{comment.author} commented on {comment.date}</strong>
            <p>{comment.text}</p>
        </div>
        ))}
    </div>
</div>
	 
)

export default Comments









