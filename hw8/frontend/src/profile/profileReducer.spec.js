import { expect } from 'chai'
import ProfileReducer from './profileReducer'

describe('Profile Page reducer', () => {
  it('should return the initial state', () => {
    expect(
      ProfileReducer(undefined, {})
    ).to.eql(
      {
       zipcode : "",
       email : ""
  
      }
    )
  })

  it('should change the email to the vlaue fetched  ', () => {
    expect(
      ProfileReducer(undefined, {type :'CHANGE_EMAIL',payload:'abc@abc.com' })
    ).to.eql(
      {
        zipcode : "",
        email : "abc@abc.com"
      }
    )
  })

  it('should change the email to the value fetched ', () => {
    expect(
      ProfileReducer(undefined, {type :'CHANGE_ZIPCODE', payload : '77054'})
    ).to.eql(
      {
        zipcode : "77054",
        email : ""
  
      }
    )
  })

})
