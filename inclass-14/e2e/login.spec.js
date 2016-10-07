import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
        .then(findId('message').getText()
            .then(text => {
                expect(text.indexOf(preamble)).to.equal(0)
            })
            .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        var oldHeadline = "My oldHeadline";
        sleep(500)
        .then(findId('newHeadline').sendKeys('How are you'))
        .then(findId('headline').click())
        .then(sleep(2000))
        .then(findId('message').getText()
            .then(text => {
                expect(text).to.equal('How are you')
            }))
        .then(sleep(2000))
        .then(findId('newHeadline').clear())
        .then(findId('newHeadline').sendKeys(oldHeadline))
        .then(findId('headline').click())
        .then(sleep(2000))
        .then(findId('message').getText()
            .then(text => {
                expect(text).to.equal(oldHeadline)
            }))
        .then(sleep(5000)) 
        .then(done)
    })

    after('should log out', (done) => {
        sleep(500)
        .then(common.logout)
        .then(sleep(500))
        .then(findId('message').getText()
            .then(text => {
                expect(text).to.equal('You have logged out')
            })
        .then(findId('username').clear())
        .then(findId('password').clear())    
        .then(done))

    })
})    