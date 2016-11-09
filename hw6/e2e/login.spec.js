import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, findxpath} from './selenium'
import common from './common'

describe('Test FrontEnd Page', (done) => {

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
        .then(findId('statusText').getText()
            .then(text => {
                expect(text).to.have.length.above(0)
            })
            .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        var oldHeadline = "Old Healdine";
       	 sleep(500)
    	.then(findId('editStatusButton').click())
        .then(findId('statusBox').sendKeys('Something'))
        .then(findId('changeStatus').click())
        .then(sleep(2000))
        .then(findId('statusText').getText()
            .then(text => {
                expect(text).to.equal('“Something”')
            }))
        .then(sleep(3000))
        .then(findId('editStatusButton').click())
	.then(findId('statusBox').clear())
        .then(findId('statusBox').sendKeys(oldHeadline))
        .then(findId('changeStatus').click())
        .then(sleep(3000))
        .then(findId('statusText').getText()
            .then(text => {
                expect(text).to.equal('“'+oldHeadline+'”')
            	})
	.then(done))

        
    })

    it("Should Add a follower and increase the count by 1", (done) => {
    var oldCount    
     sleep(500)
    .then(findId('newUser_name').sendKeys('psd3test'))
    .then(findxpath("//button[@name='followers']")
        .then(r => {oldCount = r.length
                }
            )
        )
    .then(sleep(3000))
    .then(findxpath("//button[@name='addUser']")
        .then(r => {
            r[0].click()
        })
        )
    .then(sleep(4000))    
    .then(findxpath("//button[@name='followers']")
            .then(elem => {
                expect(elem.length).to.equal(oldCount+1)
            })
	  .then(done)
         )       

    })


    it("Should Remove a follower and decrease count by 1", (done) => {
    var oldCount    
    sleep(500)
    .then(findxpath("//button[@name='followers']")
        .then(r => {oldCount = r.length
                r[0].click()}
            )
        )
    .then(sleep(3000))    
    .then(findxpath("//button[@name='followers']")
            .then(elem => {
                expect(elem.length).to.equal(oldCount-1)
            })
	 .then(done)
         )       

    })


    it("Should Add an article and increase the article count by 1", (done) => {
    var oldCount    
    sleep(500)
    .then(findxpath("//div[@name='feedArticles']")
        .then(r => {oldCount = r.length
                }
            )
        )
    .then(findId('postText').sendKeys('Random Text'))
    .then(findId('postArticle').click())
    .then(sleep(5000))
    .then(findxpath("//div[@name='feedArticles']")
            .then(elem => {
                expect(elem.length).to.equal(oldCount+1)
            })
	 .then(done)
         )       
   
    })
    
    it("Should Change the Zip ", (done) => {
        sleep(500)
        .then(findId("profile_link").click())
        .then(sleep(3000))
        .then(findId("zip").sendKeys("99988"))
        .then(findId("update").click())
        .then(findId("zip").clear())
        .then(sleep(4000))
        .then(findId("zip").getAttribute("placeholder")
            .then(r => {expect(r).to.be.equal("99988")}).then(done))
    })

    it("Should Change the Email ", (done) => {
        sleep(500)
        .then(findId("emailID").sendKeys("abc@gmail.com"))
        .then(sleep(1000))
        .then(findId("update").click())
        .then(findId("emailID").clear())
        .then(sleep(4000))
        .then(findId("emailID").getAttribute("placeholder")
            .then(r => {expect(r).to.be.equal("abc@gmail.com")}).then(done))
    }) 
    it("Should Change the Password by displaying will not change", (done) => {
        var passwordSuccess = "will not change"
        sleep(500)
        .then(findId("password").sendKeys("newPassword"))
        .then(findId("confirmPassword").sendKeys("newPassword"))
        .then(findId("update").click())
        .then(sleep(4000))
        .then(findId("errorMessage").getText()
            .then(r => {expect(r).to.be.equal(passwordSuccess)}).then(done))
    }) 

 	after('should log out', (done) => {
        sleep(500)
        .then(common.logout)
        .then(sleep(500))   
        .then(done)

    })	

})    
