'use strict'

require('dotenv').config()

const { mongoose, models: { User, Order, Product, Category } } = require('data')
const { expect } = require('chai')
const clientApi = require('./index')
const _ = require('lodash')
const sinon = require('sinon')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const { env: { DB_URL, API_URL, TOKEN_SECRET } } = process

clientApi.url = API_URL

describe('logic Api (api)', () => {
    const userDataRegister = { username: 'sergi', email: 'ser@email.com', password: '123', repeatPassword: '123' }
    const userData = { name: 'Sergio', surname: 'M', username: 'sergi', email: 'ser@email.com', password: '123', address: 'Calle V', phone: 123456789, points: 4, orders: [] }
    const otherUserData = { name: 'Jack', surname: 'Wayne', email: 'jw@mail.com', password: '456' }
    const fakeUserId = '123456781234567812345678'
    const indexes = []

    // products data
    const polloVerdurasData = { image: 'http://images.com/1234', name: 'Pollo con verduras', description: ['100 grs de filete de pollo', '50 grs de verdura mixta', '30 grs de patatas'], price: 4.25 }
    const terneraData = { image: 'http://images.com/1234', name: 'Ternera asada', description: 'Ternera asada desc', price: 4 }
    const polloArrozData = { image: 'http://images.com/1234', name: 'Pollo con arroz', description: 'Pollo con arroz desc', price: 4.50 }
    const sopaVerdurasData = { image: 'http://images.com/1234', name: 'Sopa de verduras', description: 'Sopa de verduras desc', price: 3 }
    const sopaMariscoData = { image: 'http://images.com/1234', name: 'Sopa de marisco', description: 'Sopa de marisco desc', price: 3.25 }
    const pescadoPlanchaData = { image: 'http://images.com/1234', name: 'Pescado a la plancha', description: 'Pescado a la plancha desc', price: 4 }
    // categories
    const pack_CategoryData = { image:'http://images.com/1234', name: 'Pack' }
    const individuals_CategoryData = { image:'http://images.com/1234', name: 'Individuals' }
    const meat_CategoryData = { image:'http://images.com/1234', name: 'Carne' }
    const soup_CategoryData = { image:'http://images.com/1234', name: 'Sopa' }

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
            clientApi.registerUser(username, email, password, repeatPassword)
                .then(res => {
                    expect(res).to.be.true
                })
        )

        it('should fail on existing username', () => {
            User.create(userDataRegister)
                .then(() => {
                    return clientApi.registerUser(username, 'other@email.com', '123', '123')
                        .catch(({ message }) => expect(message).to.equal(`user with username ${username} already exists`))
                })
        })

        it('should fail on existing email', () => {
            User.create(userDataRegister)
                .then(() => {
                    return clientApi.registerUser('otherUsername', email, '123', '123')
                        .catch(({ message }) => expect(message).to.equal(`user with email ${email} already exists`))
                })
        })

        it('should fail on no user username', () =>
            clientApi.registerUser()
                .catch(({ message }) => expect(message).to.equal('username is not a string'))
        )

        it('should fail on empty user username', () =>
            clientApi.registerUser('')
                .catch(({ message }) => expect(message).to.equal('username is empty or blank'))
        )

        it('should fail on blank user username', () =>
            clientApi.registerUser('     ')
                .catch(({ message }) => expect(message).to.equal('username is empty or blank'))
        )

        it('should fail on no user email', () =>
            clientApi.registerUser(username)
                .catch(({ message }) => expect(message).to.equal('email is not a string'))
        )

        it('should fail on empty user email', () =>
            clientApi.registerUser(username, '')
                .catch(({ message }) => expect(message).to.equal('email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            clientApi.registerUser(username, '     ')
                .catch(({ message }) => expect(message).to.equal('email is empty or blank'))
        )

        it('should fail on no user password', () =>
            clientApi.registerUser(username, email)
                .catch(({ message }) => expect(message).to.equal('password is not a string'))
        )

        it('should fail on empty user password', () =>
            clientApi.registerUser(username, email, '')
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            clientApi.registerUser(username, email, '     ')
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )

        it('should fail on no user repeatPassword', () =>
            clientApi.registerUser(username, email, password)
                .catch(({ message }) => expect(message).to.equal('repeatPassword is not a string'))
        )

        it('should fail on empty user repeatPassword', () =>
            clientApi.registerUser(username, email, password, '')
                .catch(({ message }) => expect(message).to.equal('repeatPassword is empty or blank'))
        )

        it('should fail on blank user repeatPassword', () =>
            clientApi.registerUser(username, email, password, '     ')
                .catch(({ message }) => expect(message).to.equal('repeatPassword is empty or blank'))
        )

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 201, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { username, email, password, repeatPassword } = userDataRegister

                return clientApi.registerUser(username, email, password, repeatPassword)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 201 (KO)`)
                    })
            })

            it('should fail on email hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'email is not a string' } } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { username, email, password, repeatPassword } = userDataRegister

                return clientApi.registerUser(username, email, password, repeatPassword)
                    .catch(({ message }) => {
                        expect(message).to.equal('email is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { username, email, password, repeatPassword } = userDataRegister

                return clientApi.registerUser(username, email, password, repeatPassword)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })


    describe('authenticate user', () => {
        it('should succeed on correct data', () =>
            User.create(userDataRegister)
                .then(id => {
                    return clientApi.authenticateUser('ser@email.com', '123')
                        .then(id => {
                            expect(id).to.exist
                            expect(clientApi.token).not.to.equal('NO-TOKEN')
                        })

                })
        )

        it('should fail on no user email', () =>
            clientApi.authenticateUser()
                .catch(({ message }) => expect(message).to.equal('email is not a string'))
        )

        it('should fail on empty email', () =>
            clientApi.authenticateUser('')
                .catch(({ message }) => expect(message).to.equal('email is empty or blank'))
        )

        it('should fail on blank email', () =>
            clientApi.authenticateUser('     ')
                .catch(({ message }) => expect(message).to.equal('email is empty or blank'))
        )

        it('should fail on no password', () =>
            clientApi.authenticateUser(userDataRegister.email)
                .catch(({ message }) => expect(message).to.equal('password is not a string'))
        )

        it('should fail on empty password', () =>
            clientApi.authenticateUser(userDataRegister.email, '')
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )

        it('should fail on blank password', () =>
            clientApi.authenticateUser(userDataRegister.email, '     ')
                .catch(({ message }) => expect(message).to.equal('password is empty or blank'))
        )

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 200, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = userData

                return clientApi.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 200 (KO)`)
                    })
            })

            it('should fail on email hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'email is not a string' } } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = userData

                return clientApi.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('email is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = userData

                return clientApi.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    describe('retrieve user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    clientApi.token(token)

                    return clientApi.retrieveUser(id)
                })
                .then(user => {
                    expect(user).to.exist

                    const { _id, name, surname, username, email, password, address, phone, points, orders } = user

                    expect(name).to.equal('Sergio')
                    expect(surname).to.equal('M')
                    expect(username).to.equal('sergi')
                    expect(email).to.equal('ser@email.com')
                    expect(address).to.equal('Calle V')
                    expect(phone).to.equal('123456789')

                    expect(_id).to.be.undefined
                    expect(password).to.be.undefined
                    expect(points).to.be.undefined
                    expect(orders).to.be.undefined
                })
        )

        it('should fail on no user id', () =>
            clientApi.retrieveUser()
                .catch(({ message }) => expect(message).to.equal('userId is not a string'))
        )

        it('should fail on empty user userId', () =>
            clientApi.retrieveUser('')
                .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
        )

        it('should fail on blank user userId', () =>
            clientApi.retrieveUser('     ')
                .catch(({ message }) => expect(message).to.equal('userId is empty or blank'))
        )

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 200, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return clientApi.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 200 (KO)`)
                    })
            })

            it('should fail on id hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'user id is not a string' } } })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return clientApi.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal('user id is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return clientApi.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    
    describe('list subcategories', () => {
        it('should succeed on correct data', () => {
            return Promise.all([

                new Category(individuals_CategoryData).save(),

                new Category(meat_CategoryData).save(),

            ])
                .then(([individuals_Category, meat_Category]) => {

                    meat_Category.parent = individuals_Category._id.toString()

                    const individuals_CategoryId = individuals_Category._id.toString()

                    return meat_Category.save()
                        .then(() => {
                            return clientApi.listSubcategories(individuals_CategoryId)
                                .then(categories => {
                                    expect(categories.length).to.equal(1)
                                    debugger
                                    const category = categories.find(category => category.id == meat_Category._id.toString())

                                    expect(category.id).to.equal(meat_Category._doc._id.toString())
                                    expect(category.name).to.equal(meat_Category.name)
                                    expect(category.parentId).to.equal(individuals_Category._id.toString())
                                })
                        })
                })
        })

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 201, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return clientApi.listSubcategories('123456789213')
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 201 (KO)`)
                    })
            })


            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return clientApi.listSubcategories('123456789213')
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    describe('list products by category', () => {
        it('should succeed on correct data', () => {
            return new Category(individuals_CategoryData).save()
                .then(category => {
                    polloVerdurasData.category = category._id
                    terneraData.category = category._id
                    polloArrozData.category = category._id
                    sopaVerdurasData.category = category._id
                    sopaMariscoData.category = category._id
                    pescadoPlanchaData.category = category._id

                    return Promise.all([
                        new Product(polloVerdurasData).save(),
                        new Product(terneraData).save(),
                        new Product(polloArrozData).save(),
                        new Product(sopaVerdurasData).save(),
                        new Product(sopaMariscoData).save(),
                        new Product(pescadoPlanchaData).save()
                    ])
                        .then(([polloVerduras, ternera, polloArroz, sopaVerduras, sopaMarisco, pescadoPlancha, individuals_Category]) => {

                            return clientApi.listProductsByCategory(category._id.toString())
                                .then(products => {
                                    expect(products.length).to.equal(6)
                                    const product = products.find(product => product.id == polloVerduras._id.toString())

                                    expect(product.id).to.equal(polloVerduras._doc._id.toString())
                                    expect(product.id).not.to.equal(ternera._doc._id.toString())
                                    expect(product.name).to.equal(polloVerduras.name)
                                    expect(product.description).to.be.an('array')
                                    expect(product.description.length).to.equal(3)
                                    expect(product.price).to.equal(polloVerduras.price)
                                    expect(product.categoryId).to.equal(category._id.toString())
                                })
                        })
                })
        })
    

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 201, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return clientApi.listProductsByCategory('123456789213')
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 201 (KO)`)
                    })
            })


            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return clientApi.listProductsByCategory('123456789213')
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    describe('list all products', () => {
        it('should succeed on correct data', () => {
            return new Category(pack_CategoryData).save()
                .then(category => {
                    polloVerdurasData.category = category._id
                    terneraData.category = category._id
                    polloArrozData.category = category._id
                    sopaVerdurasData.category = category._id
                    sopaMariscoData.category = category._id
                    pescadoPlanchaData.category = category._id

                    return Promise.all([
                        new Product(polloVerdurasData).save(),
                        new Product(terneraData).save(),
                        new Product(polloArrozData).save(),
                        new Product(sopaVerdurasData).save(),
                        new Product(sopaMariscoData).save(),
                        new Product(pescadoPlanchaData).save()
                    ])
                        .then(([polloVerduras, ternera, polloArroz, sopaVerduras, sopaMarisco, pescadoPlancha, packCategory]) => {
                            return polloVerduras.save()
                                .then(() => {
                                    return clientApi.listProducts()
                                        .then(products => {
                                            
                                            expect(products.length).to.equal(6)

                                            const product = products.find(product => product.id == polloVerduras._doc._id.toString())

                                            expect(product.id.toString()).to.equal(polloVerduras._doc._id.toString())
                                            expect(product.id.toString()).not.to.equal(ternera._doc._id.toString())
                                            expect(product.name).to.equal(polloVerduras.name)
                                            expect(product.description).to.be.an('array')
                                            expect(product.description.length).to.equal(3)
                                            expect(product.price).to.equal(polloVerduras.price)
                                            expect(product.categoryId).to.equal(category._id.toString())
                                        })
                                })
                        })
                })
        })
    


        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 201, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return clientApi.listProducts()
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 201 (KO)`)
                    })
            })


            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return clientApi.listProducts()
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})