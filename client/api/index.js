'use strict'
const axios = require('axios')

const clientApi = {
    url: 'NO-URL',

    /**
     * Manage user token
     * 
     * @param {String} token The user token.
     * 
     * @returns {<token>}
     */
    token(token) {
        if (token) {
            this._token = token

            return;
        }
            return this._token
    },

    /**
     * 
     * @param {string} username
     * @param {string} email 
     * @param {string} password 
     * @param {string} reapeatEmail 
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


                return axios.post(`${this.url}/users`, { username, email, password, repeatPassword })
                    .then(({ status, data }) => {
                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

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
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    authenticateUser(email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof email !== 'string') throw Error('email is not a string')

                if (!(email = email.trim()).length) throw Error('email is empty or blank')

                if (typeof password !== 'string') throw Error('password is not a string')

                if ((password = password.trim()).length === 0) throw Error('password is empty or blank')

                return axios.post(`${this.url}/auth`, { email, password })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                       
                        const { data: { id, token } } = data
                        
                        this.token(token)

                        return id
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
     * @param {string} id
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser(userId) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

                return axios.get(`${this.url}/users/${userId}`, { headers: { authorization: `Bearer ${this.token()}` } })
                    .then(({ status, data }) => {

                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
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
     * List all categories 
     * 
     * @returns {Promise<[Categories]>}
     */
    listAllCategories() {
        return Promise.resolve()
            .then(() => {
                return axios.get(`${this.url}/categories`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
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
    * Lists root categories
    * 
    * @returns {Promise<[Category]>}
    */
    listRootCategories() {
        return Promise.resolve()
            .then(() => {
                return axios.get(`${this.url}/categories/root`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
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
    * Lists Subcategories
    * 
    * @param {String} categoryId The category id of the product.
    * 
    * @returns {Promise<[Categorises]>}
    */
    listSubcategories(categoryId) {
        return Promise.resolve()
            .then(() => {

                if (typeof categoryId !== 'string') throw Error('user categoryId is not a string')
                if (!(categoryId = categoryId.trim()).length) throw Error('user categoryId is empty or blank')
               
                return axios.get(`${this.url}/category/${categoryId}/subcategories`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
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
     * Lists products by category
     * 
     * @param {String} categoryId The category id of the product.
     * 
     * @returns {Promise<[Product]>}
     */
    listProductsByCategory(categoryId) {
        return Promise.resolve()
            .then(() => {

                if (typeof categoryId !== 'string') throw Error('user categoryId is not a string')
                if (!(categoryId = categoryId.trim()).length) throw Error('user categoryId is empty or blank')
               
                return axios.get(`${this.url}/category/${categoryId}/products`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
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
     * Lists all products
     * 
     * @returns {Promise<[Product]>}
     */
    listProducts() {
        return Promise.resolve()
            .then(() => {

                return axios.get(`${this.url}/products`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
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
     * Retrieve a product and show details
     * 
     * @param {String} productId The category id of the product.
     * 
     * @returns {Promise<Product>}
     */
    productDetails(productId) {
        return Promise.resolve()
            .then(() => {
                if (typeof productId !== 'string') throw Error('user productId is not a string')
                if (!(productId = productId.trim()).length) throw Error('user productId is empty or blank')

                return axios.get(`${this.url}/product/${productId}`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
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
     * Lists products by theirs ids
     * 
     * @param {String} ids Array contains selected ids.
     * 
     * @returns {Promise<[Product]>}
     */
    listProductsByIds(cart) {

        return Promise.resolve()
            .then(() => {
               const ids = cart.join(',')

                return axios.get(`${this.url}/products/?ids=${ids}`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                        return data.data
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
     * @param {string} userId User id
     * @param {string} deliveryAddress Deliery address of the order
     * @param {string} orderDate    Date of the order
     * @param {Array} orderProducts Products in the order
     * @param {string} paymentMethod Payment method selected
     * @param {string} status Order Status(paid, proccessing, unpaid) 
     * 
     * @returns {Promise<"orderId">}
     */
    createOrder(userId, deliveryAddress, orderDate, orderProducts, paymentMethod, status) {
        return Promise.resolve()
            .then(() => {
                console.log('orderProducts client: ', orderProducts);
                if(deliveryAddress !== undefined) {

                    if (typeof deliveryAddress !== 'string') throw Error('deliveryAddress is not a string')
                    if (!(deliveryAddress = deliveryAddress.trim()).length) throw Error('deliveryAddress is empty or blank')
                }

                if(orderDate !== undefined) {
                if (typeof orderDate !== 'string') throw Error('ate is not a string')
                if (!(orderDate = orderDate.trim()).length) throw Error('orderDate is empty or blank')
                }
                
                if (!Array.isArray(orderProducts)) throw Error('orderProducts is not an array')
                if (!orderProducts.length) throw Error('orderProducts is empty or blank')

                if (typeof paymentMethod !== 'string') throw Error('paymentMethod is not a string')
                if ((paymentMethod = paymentMethod.trim()).length === 0) throw Error('paymentMethod is empty or blank')

                if (typeof status !== 'string') throw Error('status is not a string')
                if ((status = status.trim()).length === 0) throw Error('status is empty or blank')

                return axios.post(`${this.url}/order`, {userId, deliveryAddress, orderDate, orderProducts, paymentMethod, status})
                    .then(({ status, data }) => {
                        console.log('orderProducts datadata: ', data.data);

                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    }
}

module.exports = clientApi