import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'psd3',
    password: 'neighbor-laughed-fire'
}

exports.login = () => 

    sleep(500)
    .then(findId('username').clear())
    .then(console.log("Here"))
    .then(findId('login_password').clear())
    .then(findId('username').sendKeys(exports.creds.username))
    .then(findId('login_password').sendKeys(exports.creds.password))
    .then(findId('login_button').click())
    .then(sleep(2000))

exports.logout = () =>
    sleep(500)
    .then(findId('logout_button').click())
