import { expect } from 'chai'
import AuthReducer from './authReducer'

describe('Landing Page reducer', () => {
  it('should return the initial state', () => {
    expect(
      AuthReducer(undefined, {})
    ).to.eql(
      {location : 'LANDING_PAGE',
       displayError  : false
  
      }
    )
  })

  it('Navigate to Profile  Page', () => {
    expect(
      AuthReducer(undefined, {type :'NAV_PROFILE'})
    ).to.eql(
      {
       location : 'PROFILE_PAGE',
       displayError  : false
      }
    )
  })

  it('Navigate to Main  Page', () => {
    expect(
      AuthReducer(undefined, {type :'NAV_MAIN'})
    ).to.eql(
      {
       location : 'MAIN_PAGE',
       displayError  : false
      }
    )
  })

  it('LOG_IN navigates to Main', () => {
    expect(
      AuthReducer(undefined, {type :'Log_In', payload : {result : 'success'}})
    ).to.eql(
      {
       location : 'MAIN_PAGE',
       displayError  : false
      }
    )
  })

   it('LOG_OUT navigates to Landing', () => {
    expect(
      AuthReducer(undefined, {type :'LOG_OUT'})
    ).to.eql(
      {
       location : 'LANDING_PAGE',
       displayError  : false
      }
    )
  })

})
