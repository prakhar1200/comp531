import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const Comments = ({userComments}) => (
<div>
    {userComments.map((comment) => (
    <div id={comment.commentid}>
        <strong>{comment.author} commented on {comment.date}</strong>
        <p>{comment.text}</p>
    </div>
    ))}

</div>
)
export default Comments









