'use strict'

require('dotenv').config()

const { mongoose, models: { User, Order, Product, Category } } = require('data')
const { expect } = require('chai')
const clientApi = require('../../../api')
const logic = require('./index')
const _ = require('lodash')
const sinon = require('sinon')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const { env: { DB_URL , TOKEN_SECRET } } = process


describe('logic client', () => {
    const userDataRegister = { username: 'pa', email: 'pa@email.com', password: '123', repeatPassword: '123' }
    const userData = { name: 'Sergio', surname: 'M', username: 'sergi', email: 'ser@email.com', password: '123', address: 'Calle V', phone: 123456789, points: 4, orders: [] }
    const otherUserData = { name: 'Jack', surname: 'Wayne', email: 'jw@mail.com', password: '456' }
    const fakeUserId = '123456781234567812345678'
    const indexes = []

    // products data
    const polloVerdurasData = { image: 'http://images.com/1234', name: 'Pollo con verduras', description: 'Pollo con verduras desc', price: 4.25 }
    const terneraData = { image: 'http://images.com/1234', name: 'Ternera asada', description: 'Ternera asada desc', price: 4 }
    const polloArrozData = { image: 'http://images.com/1234', name: 'Pollo con arroz', description: 'Pollo con arroz desc', price: 4.50 }
    const sopaVerdurasData = { image: 'http://images.com/1234', name: 'Sopa de verduras', description: 'Sopa de verduras desc', price: 3 }
    const sopaMariscoData = { image: 'http://images.com/1234', name: 'Sopa de marisco', description: 'Sopa de marisco desc', price: 3.25 }
    const pescadoPlanchaData = { image: 'http://images.com/1234', name: 'Pescado a la plancha', description: 'Pescado a la plancha desc', price: 4 }
    // categories
    const pack_CategoryData = { name: 'Pack' }
    const individuals_CategoryData = { name: 'Individuals' }
    const meat_CategoryData = { name: 'Carne' }
    const soup_CategoryData = { name: 'Sopa' }

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => {
        let count = 10 + Math.floor(Math.random() * 10)
        indexes.length = 0
        while (count--) indexes.push(count)

        return Promise.all([User.remove(), Product.deleteMany(), Category.deleteMany()])
    })

    describe('register user', () => {

        const { username, email, password, repeatPassword } = userDataRegister

        it('should succeed on correct dada', () =>
            logic.registerUser(username, email, password, repeatPassword)
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail on existing username', () => {
            User.create(userDataRegister)
                .then(() => {
                    return logic.registerUser(username, 'other@email.com', '123', '123')
                        .catch(({ message }) => expect(message).to.equal(`user with username ${username} already exists`))
                })
        })

        it('should fail on existing email', () => {
            User.create(userDataRegister)
                .then(() => {
                    return logic.registerUser('otherUsername', email, '123', '123')
                        .catch(({ message }) => expect(message).to.equal(`user with email ${email} already exists`))
                })
        })

        it('should fail on no user username', () =>
            logic.registerUser()
                .catch(({ message }) => expect(message).to.equal('username is not a string'))
        )

        it('should fail on empty user username', () =>
            logic.registerUser('')
                .catch(({ message }) => expect(message).to.equal('username is empty or blank'))
        )

        it('should fail on blank user username', () =>
            logic.registerUser('     ')
                .catch(({ message }) => expect(message).to.equal('username is empty or blank'))
        )

        it('should fail on no user email', () =>
            logic.registerUser(username)
                .catch(({ message }) => expect(message).to.equal('email is not a string'))
        )

        it('should fail on empty user email', () =>
            logic.registerUser(username, '')
                .catch(({ message }) => expect(message).to.equal('email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            logic.registerUser(username, '     ')
                .catch(({ message }) => expect(message).to.equal('email is empty or blank'))
        )

        it('should fail on no user password', () =>
            logic.registerUser(username, email)
                .catch(({ message }) => expect(message).to.equal('password is not a string'))
        )

        it('should fail on empty user password', () =>
            logic.registerUser(username, email, '')
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            logic.registerUser(username, email, '     ')
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )

        it('should fail on no user repeatPassword', () =>
            logic.registerUser(username, email, password)
                .catch(({ message }) => expect(message).to.equal('repeatPassword is not a string'))
        )

        it('should fail on empty user repeatPassword', () =>
            logic.registerUser(username, email, password, '')
                .catch(({ message }) => expect(message).to.equal('repeatPassword is empty or blank'))
        )

        it('should fail on blank user repeatPassword', () =>
            logic.registerUser(username, email, password, '     ')
                .catch(({ message }) => expect(message).to.equal('repeatPassword is empty or blank'))
        )
    })

    describe('authenticate user', () => {

        const {email, password} = userDataRegister

        it('should succeed on correct data', () =>
            User.create(userDataRegister)
                .then(id => {
                    return logic.login(email, password)
                        .then(id => {
                            expect(id).to.exist
                            expect(logic.userId).not.to.equal('')
                        })
                })
        )

        it('should fail on no match email with password(wrong email)', () =>
            logic.login(otherUserData.email, password)
                .catch(({ message }) => expect(message).to.equal('Email o password incorrectos'))
        )

        it('should fail on no match email with password(wrong password)', () =>
            logic.login(email, otherUserData.password)
                .catch(({ message }) => expect(message).to.equal('Email o password incorrectos'))
        )

        it('should fail on no user email', () =>
            logic.login()
                .catch(({ message }) => expect(message).to.equal('email is not a string'))
        )

        it('should fail on empty email', () =>
            logic.login('')
                .catch(({ message }) => expect(message).to.equal('email is empty or blank'))
        )

        it('should fail on blank email', () =>
            logic.login('     ')
                .catch(({ message }) => expect(message).to.equal('email is empty or blank'))
        )

        it('should fail on no password', () =>
            logic.login(email)
                .catch(({ message }) => expect(message).to.equal('password is not a string'))
        )

        it('should fail on empty password', () =>
            logic.login(email, '')
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )

        it('should fail on blank password', () =>
            logic.login(email, '     ')
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )
    })

    describe('retrieve user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    clientApi.token(token)

                    logic.userId(id)
 
                    return logic.retrieveUser()
                })
                .then(user => {
                    expect(user).to.exist

                    const { _id, name, surname, username, email, password, address, phone, points, orders } = user

                    expect(name).to.equal('Sergio')
                    expect(surname).to.equal('M')
                    expect(username).to.equal('sergi')
                    expect(email).to.equal('ser@email.com')
                    expect(address).to.equal('Calle V')
                    expect(phone).to.equal(123456789)

                    expect(_id).to.be.undefined
                    expect(password).to.be.undefined
                    expect(points).to.be.undefined
                    expect(orders).to.be.undefined
                })
        )
    })

   

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})