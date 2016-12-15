import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {commentsVisibility} from './articlesAction'
import {editPost, postArticle} from './articlesAction'
import Comments from './comments' 

const Articles = ({articles, displayComment, handleImageChange, username, editArticle}) => {
  let newText;
  let articleImage;
  let newFile;
  let editedText;
  let postID;

return (
  <div className="col-md-7">
      <div id="newPosts" className="row">
        <div className="input-group">
         <span className="input-group-addon btn btn-success" >
          <label htmlFor="uploadFile" className="glyphicon glyphicon-camera" >
          </label>
          <input className="" type="file" accept="image/*" onChange={(e) => articleImage = e.target.files[0]} id='uploadFile'/>

          </span>
           <textarea id="postText"className="form-control custom-control" rows="8" style={{resize:"none"}} ref={(node)=> newText = node}></textarea>     
           <span id = "postArticle" className="input-group-addon btn  glyphicon glyphicon-share btn-success" onClick={() => handleImageChange(newText.value, articleImage)}></span>
           <span id="clearPost" className="input-group-addon btn  glyphicon glyphicon-remove btn-danger"></span>
          
        </div>
      </div>
 {articles.map((article) => (<div name="feedArticles" className="row top-buffer cards innerpost" id={article._id} ref={(node)=> postID = node}>
          
	      <div>
		<h3> {article.author} said on  {(new Date(article.date)).toString()} </h3> 
	      </div>
              <img className={article.img?"":"hide"} src= {article.img}></img><span ref={(node)=> editedText = node} contentEditable={article.author=== username?true:false}>{article.text}</span>
             <div>
              <div>
                <button onClick={() => displayComment(article)}  type="button" className="btn btn-primary col-md-2 buttonc" aria-label="Comment">
                  <span className="glyphicon glyphicon-comment" aria-hidden="true">({article.comments.length})</span>
                </button>	 
                <button type="button" className="btn btn-primary col-md-2 buttonc" aria-label="Edit" onClick={() => editArticle(editedText.textContent, postID.id)}>
                 <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                </button>
              </div>
	   		 
          </div>

           <div className={article.displayComment?"":"hide"}>   
	      	<Comments  userComments = {article.comments} articleID = {article._id} />
	 	  </div>
           </div>
))
}
</div>
)
}

export default connect(
    (state) => {
        return {
            articles: state.MainReducer.articles,
	    username : state.ProfileReducer.username
        }
    },
    (dispatch) => {
	return {
		displayComment :(article) => commentsVisibility(article)(dispatch),
    		handleImageChange: (newText, articleImage) => postArticle(newText, articleImage)(dispatch),
		editArticle : (text, articleID) => editPost(text, articleID)(dispatch)	
         }
  }
)(Articles)










