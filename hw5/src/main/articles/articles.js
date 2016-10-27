import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {commentsVisibility} from './articlesAction'
import Comments from './comments' 


const Articles = ({articles, displayComment}) => (	
 <div className="cards innerpost col-md-8">

 {articles.map((article) => (<div className="row top-buffer">
          
<div>
    <p> {article.author} said on {article.date} </p>
</div>
<img src={ article.img}></img>{article.text}
<div>
    <div>
        <button onClick={()=> displayComment(article)}  type="button" className="btn btn-primary col-md-2 buttonc" aria-label="Comment">
                  <span className="glyphicon glyphicon-comment" aria-hidden="true"></span>
                </button>
        <button type="button" className="btn btn-primary col-md-2 buttonc" aria-label="Edit">
                 <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </button>
    </div>

</div>
<div className={article.displayComment? "": "hide"}>
    <Comments userComments={ article.comments} />
</div>
</div>

)) }
</div>

)

export default connect(
    (state) => {
	console.log(state)
        return {

            articles: state.MainReducer.articles
        }
    },
    (dispatch) => {
	return {
		displayComment :(article) => commentsVisibility(article)(dispatch)
         }
  }
)(Articles)










