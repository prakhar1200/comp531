import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {unfollowUser} from './followersAction'
import {addFollower} from './followersAction'





const Followers = ({followerInfo, remove, add,addUserError,errorMessage}) => {

let newUsername;
let i = 1;
const _addUser = () => {
    if(newUsername.value){
        add(newUsername, followerInfo)   
    }
    newUsername.value="";
} 
return (
     <div className="col-md-3">
        <h2><i className="fa fa-user" aria-hidden="true"></i> Followers</h2>
        <div className="row">
	         {followerInfo.map((follower) => (
                            <div className="col-md-6">
                                <div className="thuhmbnail flw_display">
                                    <img className="img-thumbnail" width="200" height="200" src={follower.avatar}/>
                                    <div className="caption">
                                    <p className="flw_name"><strong>{follower.username}</strong></p>
                                    <em>{follower.headline}</em>
                                    </div>
                                    <div className="row">
                                        <button  id={follower.username} name="followers" type="button" className="followers btn btn-primary col-md-offset-1 col-md-10 col-md-offset-right-1" onClick ={()=>remove(follower.username)} aria-label="edit">
                                        Unfollow</button>
                                    </div>
                                </div>
                            </div>
                          )
            )}
        </div>
        <div className="row">
          <div className="input-group">
              <input type="text" id="newUser_name" placeholder="Add New User" className="form-control" ref={(node) => newUsername = node}/>
              <span className="input-group-btn">
              <button type="button" onClick={_addUser} name="addUser" className="btn btn-primary" aria-label="Add User">
              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              </button>
              </span>
          </div>
        </div>
	<div className={addUserError?"":"hide"}>    
              <div id="errorMessage" className="alert alert-danger col-md-8 col-md-offset-2">
		{errorMessage}
              </div>
        </div>
    </div>
)
}

export default connect(
    (state) => {
        return {

            followerInfo: state.MainReducer.followingInfo,
	    errorMessage:state.MainReducer.errorMessage,
	    addUserError:state.MainReducer.addUserError
        }
    },
    (dispatch) => {
        
         return {
            remove : (username) => unfollowUser(username)(dispatch),
            add : (newUsername, followerInfo)=> addFollower(newUsername.value, followerInfo)(dispatch)
         }
       
    }

)(Followers)










