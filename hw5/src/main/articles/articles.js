import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comments from './comments' 

const Articles = ({articles}) => (
 <div className="cards innerpost col-md-8">
 {articles.map((article) => (<div className="row top-buffer">
	    <div>
		<p> {article.author} said on  {article.date} </p> 
	    </div>
        <img src= {article.img}></img>{article.text}
	    <Comments userComments = {article.comments} />
        </div>
))
}
</div>

)

export default connect(
    (state) => {
	console.log(state)
        return {
            articles: state.MainReducer.articles
        }
    }
)(Articles)










