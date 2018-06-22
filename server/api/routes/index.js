'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const logic = require('logic')

const jwt = require('jsonwebtoken')
const jwtValidation = require('./utils/jwt-validation')

const router = express.Router()

const { env: { TOKEN_SECRET, TOKEN_EXP } } = process

const jwtValidator = jwtValidation(TOKEN_SECRET)

router.post('/users', jsonBodyParser, (req, res) => {
    const { body: { username, email, password, repeatPassword } } = req

    return logic.registerUser(username, email, password, repeatPassword)
        .then(() => {
            res.status(201)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticateUser(email, password)
        .then(id => {
            const token = jwt.sign({ id }, TOKEN_SECRET, { expiresIn: TOKEN_EXP })

            res.status(200)
            res.json({ status: 'OK', data: { id, token } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/users/:userId', jwtValidator, (req, res) => {
    const { params: { userId } } = req

    return logic.retrieveUser(userId)
        .then(user => {
            res.status(200)
            res.json({ status: 'OK', data: user })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/categories', (req, res) => {

    return logic.listAllCategories()
            .then(categories=> {
                res.status(200)
                res.json({ status: 'OK', data: categories})
            })
            .catch(({ message }) => {
                res.status(400)
                res.json({ status: 'KO', error: message }) 
            })
})

router.get('/categories/root', (req, res) => {

    return logic.listRootCategories()
            .then(category=> {
                res.status(200)
                res.json({ status: 'OK', data: category})
            })
            .catch(({ message }) => {
                res.status(400)
                res.json({ status: 'KO', error: message }) 
            })
})

router.get('/category/:categoryId/subcategories', (req, res) => {
    const { params: { categoryId } } = req

    return logic.listSubcategories(categoryId)
            .then(subcategories => {
                res.status(200)
                res.json({ status: 'OK', data: subcategories})
            })
            .catch(({ message }) => {
                res.status(400)
                res.json({ status: 'KO', error: message }) 
            })
})

router.get('/category/:categoryId/products', (req, res) => {
    const { params: { categoryId } } = req

    return logic.listProductsByCategory(categoryId)
            .then(products => {
                res.status(200)
                res.json({ status: 'OK', data: products})
            })
            .catch(({ message }) => {
                res.status(400)
                res.json({ status: 'KO', error: message }) 
            })
})

router.get('/product/:productId', (req, res) => {
    const { params: { productId } } = req

        logic.productDetails(productId)
            .then(product => {
                res.status(200)
                res.json({ status: 'OK', data: product })
            })
            .catch(({ message }) => {
                res.status(400)
                res.json({ status: 'KO', error: message })
            })
})

router.get('/products', (req, res) => {
    const { query: { ids } } = req

    if (!ids)
        logic.listProducts()
            .then(products => {
                res.status(200)
                res.json({ status: 'OK', data: products })
            })
            .catch(({ message }) => {
                res.status(400)
                res.json({ status: 'KO', error: message })
            })
    else logic.listProductsByIds(ids)
            .then(products => {
                res.status(200)
                res.json({ status: 'OK', data: products })
            })
            .catch(({ message }) => {
                res.status(400)
                res.json({ status: 'KO', error: message })
            })
})

router.post('/order', jsonBodyParser, (req, res) => {
    const { body: { userId, deliveryAddress, orderDate, orderProducts, paymentMethod, status } } = req

        logic.createOrder(userId, deliveryAddress, orderDate, orderProducts, paymentMethod, status)
            .then(orderId => {
                res.status(201)
                res.json({ status: 'OK', data: orderId })
            })
            .catch(({ message }) => {
                res.status(400)
                res.json({ status: 'KO', error: message })
            })
})

module.exports = router