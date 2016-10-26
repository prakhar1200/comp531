import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const Followers = ({followerInfo}) => (

     <div className="col-md-3">
        <h4><i className="fa fa-user" aria-hidden="true"></i> Followers</h4>
        <div className="row">
	         {followerInfo.map((follower) => (
                            <div className="col-md-6">
                                <div className="thuhmbnail flw_display">
                                    <img src={follower.avatar}/>
                                    <div className="caption">
                                    <p className="flw_name"><strong>{follower.username}</strong></p>
                                    <em>{follower.headline}</em>
                                    </div>
                                    <div className="row">
                                        <button key={follower.id} id={follower.id} type="button" className="btn btn-primary col-md-offset-1 col-md-10 " aria-label="edit">
                                        Unfollow</button>
                                    </div>
                                </div>
                            </div>
                          )
          )}
      </div>
    </div>
)

export default connect(
    (state) => {
	console.log(state)
        return {

            followerInfo: state.MainReducer.followingInfo
        }
    }
)(Followers)










