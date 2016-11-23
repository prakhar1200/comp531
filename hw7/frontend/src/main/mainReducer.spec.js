import { expect } from 'chai'
import MainReducer from './mainReducer'

describe('Main Page reducer', () => {
  it('should return the initial state', () => {
    expect(
      MainReducer(undefined, {})
    ).to.eql(
      {
        followingInfo :[],
        articles : [],
        userAvatar : "",
        userHeadline : "",
        statusEditBoxVisible : "hide"
  
      }
    )
  })

  it('Show the Status Edit Box ', () => {
    expect(
      MainReducer(undefined, {type :'EDIT_STATUS_VISIBLE'})
    ).to.eql(
      {
        followingInfo :[],
        articles : [],
        userAvatar : "",
        userHeadline : "",
        statusEditBoxVisible : ""
  
      }
    )
  })

  it('Hide the Status Edit Box ', () => {
    expect(
      MainReducer(undefined, {type :'EDIT_STATUS_HIDE'})
    ).to.eql(
      {
        followingInfo :[],
        articles : [],
        userAvatar : "",
        userHeadline : "",
        statusEditBoxVisible : "hide"
  
      }
    )
  })


  it('Change Headline', () => {
    expect(
      MainReducer(undefined, {type :'CHANGE_HEADLINE', payload: 'Learning'})
    ).to.eql(
      {
        followingInfo :[],
        articles : [],
        userAvatar : "",
        userHeadline : "Learning",
        statusEditBoxVisible : "hide"
  
      }
    )
  })


})
