'use strict'

const clientApi = require('client-api')

// clientApi.url = 'https://tranquil-lake-27956.herokuapp.com/api'
clientApi.url = 'http://localhost:5000/api'
// clientApi.url = 'http://192.168.0.27:5000/api'

const logic = {

    _cart: [],
    _statusOrder: 'unpaid',
    _dateOrder: '',

     /**
     * Manage user id
     * 
     * @param {String} userId The user id.
     * 
     * @returns {<userId>}
     */
    userId(userId) {
        if (userId) {
            this._userId = userId

            return;
        }
        return this._userId
    },

    /**
     * Manage cart products
     * 
     * @param {Array} cart The user id.
     * 
     * @returns {[Cart]}
     */
    cart(cart) {
        if (typeof cart !== 'undefined') {
            this._cart = cart

            return
        }
        return this._cart
    },

    /**
     * Register of the user
     * 
     * @param {string} username   User username
     * @param {string} email      User email
     * @param {string} password   User password
     * @param {string} repeatPassword  Repeat Password
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(username, email, password, repeatPassword) {
        return Promise.resolve()
            .then(() => {
                if (typeof username !== 'string') throw Error('username is not a string')

                if (!(username = username.trim()).length) throw Error('username is empty or blank')

                if (typeof email !== 'string') throw Error('email is not a string')

                if (!(email = email.trim()).length) throw Error('email is empty or blank')

                if (typeof password !== 'string') throw Error('password is not a string')

                if ((password = password.trim()).length === 0) throw Error('password is empty or blank')

                if (typeof repeatPassword !== 'string') throw Error('repeatPassword is not a string')

                if ((repeatPassword = repeatPassword.trim()).length === 0) throw Error('repeatPassword is empty or blank')

                return clientApi.registerUser(username, email, password, repeatPassword)
                    .then(() => true)

            })
            .catch(err => {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                if (err.response) {
                    const { response: { data: { error: message } } } = err

                    throw Error(message)
                } else throw err
            })
    },

     /**
     * Authentication of the user
     * 
     * @param {string} email   User email
     * @param {string} password   User password
     * 
     * @returns {Promise<string>}
     */
    login(email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof email !== 'string') throw Error('email is not a string')

                if (!(email = email.trim()).length) throw Error('email is empty or blank')

                if (typeof password !== 'string') throw Error('password is not a string')

                if ((password = password.trim()).length === 0) throw Error('password is empty or blank')

                return clientApi.authenticateUser(email, password)
                    .then(id => {
                        this.userId(id)
                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * Retrieve user information
     * 
     * @param {string} id   User id
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser() {
        return Promise.resolve()
            .then(() => {

                return clientApi.retrieveUser(this.userId())
                    .then(userData => userData)
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)

                        } else throw err
                    })
            })
    },

    /**
     * Get date of the order
     * 
     * @returns {"dateOrder"}
     */
    getDateOrder() {
        this._dateOrder = Date.now()
        return this._dateOrder.toString()
    },

     /**
     * Add product to the cart according to the quantity
     * 
     * @param {String} productId The product id selected.
     * @param {Number} quantity Quantity of products selected.
     */
    addProductToCart(productId, quantity = 1) {
        for (let i = 0; i < quantity; i++)
            this.cart().push(productId)

        this.cart(this.cart())
    },

    /**
     * Substract product to the cart according to the quantity
     * 
     * @param {String} productId The product id selected.
     * @param {Number} quantity Quantity of products selected.
     */
    substractProductFromCart(productId, quantity) {
        for (let i = 0; i < quantity; i++) {
            const index = this.cart().findIndex(_productId => _productId === productId)
    
            if (index > -1) {
                this.cart().splice(index, 1)
    
                this.cart(this.cart())
            }
        }
    },

    /**
     * Remove products to the cart of a product selected
     * 
     * @param {String} productId The product id selected.
     */
    removeProductFromCart(productId) {
        const updateCart = this.cart().filter(id => {
            return id !== productId
        })

        this.cart(updateCart)
    },

    /**
     * List products of the cart with the corresponding amount
     * 
     * @returns {[Products]}
     */
    listProductsFromCart() {
        return clientApi.listProductsByIds(this.cart())
            .then(products => {
                const quantities = this.cart().reduce((accum, productId) => {
                    if (accum[productId]) accum[productId]++
                    else accum[productId] = 1
                    return accum
                }, {})
                products.forEach(product => product.quantity = quantities[product.id])

                return products
            })
    },

    /**
     * Retrieve products of the cart and their total price.
     * 
     * @returns {[Products], Total}
     */
    getCartSummary() {
        return this.listProductsFromCart()
            .then(products => {
                const total = products.reduce((accum, product) => accum + product.price * product.quantity, 0)

                return { products, total }
            })
    },

    /**
     * List all categories 
     * 
     * @returns {Promise<[Categories]>}
     */
    listAllCategories() {
        return clientApi.listAllCategories()
            .then(res => res)
    },

    /**
    * Lists root categories
    * 
    * @returns {Promise<[Category]>}
    */
    listRootCategories() {
        return clientApi.listRootCategories()
            .then(res => res)
    },

    /**
    * Lists Subcategories
    * 
    * @param {String} categoryId The category id of the product.
    * 
    * @returns {Promise<[Categorises]>}
    */
    listSubcategories(categoryId) {
        return clientApi.listSubcategories(categoryId)
            .then(categories => categories)
    },

     /**
     * Lists products by category
     * 
     * @param {String} categoryId The category id of the product.
     * 
     * @returns {Promise<[Product]>}
     */
    listProductsByCategory(categoryId) {
        return clientApi.listProductsByCategory(categoryId)
            .then(products => products)
    },

    /**
     * Lists all products
     * 
     * @returns {Promise<[Product]>}
     */
    listProducts() {
        return clientApi.listProducts()
            .then(products => products)
    },

    /**
     * Retrieve a product and show details
     * 
     * @param {String} productId The category id of the product.
     * 
     * @returns {Promise<Product>}
     */
    productDetails(productId) {
        return clientApi.productDetails(productId)
            .then(product => product)
    },

    /**
     * @param {string} userId User id
     * @param {string} deliveryAddress Deliery address of the order
     * @param {string} orderDate    Date of the order
     * @param {Array} orderProducts Products in the order
     * @param {string} paymentMethod Payment method selected
     * @param {string} status Order Status(paid, proccessing, unpaid) 
     * 
     * @returns {Promise<"orderId">}
     */
    createOrder(deliveryAddress, paymentMethod) {
        return clientApi.createOrder(this.userId(), deliveryAddress, this.getDateOrder(), this.cart(), paymentMethod, this._statusOrder)
    },

    /**
     * Check if user is logged
     * 
     * @returns {boolean}
     */
    get loggedIn() {
        return !!this.userId()
    },

    /**
    * Logs a user out
    * 
    * @returns {boolean} - Confirms log-out 
    */
    logout() {
        this.userId(null)

        clientApi.token(null)

        return true
    }
}

module.exports = logic