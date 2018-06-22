'use strict';

var axios = require('axios');

var clientApi = {
    url: 'NO-URL',

    /**
     * Manage user token
     * 
     * @param {String} token The user token.
     * 
     * @returns {<token>}
     */
    token: function token(_token) {
        if (_token) {
            this._token = _token;

            return;
        }
        return this._token;
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
    registerUser: function registerUser(username, email, password, repeatPassword) {
        var _this = this;

        return Promise.resolve().then(function () {
            if (typeof username !== 'string') throw Error('username is not a string');

            if (!(username = username.trim()).length) throw Error('username is empty or blank');

            if (typeof email !== 'string') throw Error('email is not a string');

            if (!(email = email.trim()).length) throw Error('email is empty or blank');

            if (typeof password !== 'string') throw Error('password is not a string');

            if ((password = password.trim()).length === 0) throw Error('password is empty or blank');

            if (typeof repeatPassword !== 'string') throw Error('repeatPassword is not a string');

            if ((repeatPassword = repeatPassword.trim()).length === 0) throw Error('repeatPassword is empty or blank');

            return axios.post(_this.url + '/users', { username: username, email: email, password: password, repeatPassword: repeatPassword }).then(function (_ref) {
                var status = _ref.status,
                    data = _ref.data;

                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    authenticateUser: function authenticateUser(email, password) {
        var _this2 = this;

        return Promise.resolve().then(function () {
            if (typeof email !== 'string') throw Error('email is not a string');

            if (!(email = email.trim()).length) throw Error('email is empty or blank');

            if (typeof password !== 'string') throw Error('password is not a string');

            if ((password = password.trim()).length === 0) throw Error('password is empty or blank');

            return axios.post(_this2.url + '/auth', { email: email, password: password }).then(function (_ref2) {
                var status = _ref2.status,
                    data = _ref2.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                var _data$data = data.data,
                    id = _data$data.id,
                    token = _data$data.token;


                _this2.token(token);

                return id;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * @param {string} id
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser: function retrieveUser(userId) {
        var _this3 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('userId is not a string');

            if (!(userId = userId.trim()).length) throw Error('userId is empty or blank');

            return axios.get(_this3.url + '/users/' + userId, { headers: { authorization: 'Bearer ' + _this3.token() } }).then(function (_ref3) {
                var status = _ref3.status,
                    data = _ref3.data;


                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
      * List all categories 
      * 
      * @returns {Promise<[Categories]>}
      */
    listAllCategories: function listAllCategories() {
        var _this4 = this;

        return Promise.resolve().then(function () {
            return axios.get(_this4.url + '/categories').then(function (_ref4) {
                var status = _ref4.status,
                    data = _ref4.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
    * Lists root categories
    * 
    * @returns {Promise<[Category]>}
    */
    listRootCategories: function listRootCategories() {
        var _this5 = this;

        return Promise.resolve().then(function () {
            return axios.get(_this5.url + '/categories/root').then(function (_ref5) {
                var status = _ref5.status,
                    data = _ref5.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
    * Lists Subcategories
    * 
    * @param {String} categoryId The category id of the product.
    * 
    * @returns {Promise<[Categorises]>}
    */
    listSubcategories: function listSubcategories(categoryId) {
        var _this6 = this;

        return Promise.resolve().then(function () {

            if (typeof categoryId !== 'string') throw Error('user categoryId is not a string');
            if (!(categoryId = categoryId.trim()).length) throw Error('user categoryId is empty or blank');

            return axios.get(_this6.url + '/category/' + categoryId + '/subcategories').then(function (_ref6) {
                var status = _ref6.status,
                    data = _ref6.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * Lists products by category
     * 
     * @param {String} categoryId The category id of the product.
     * 
     * @returns {Promise<[Product]>}
     */
    listProductsByCategory: function listProductsByCategory(categoryId) {
        var _this7 = this;

        return Promise.resolve().then(function () {

            if (typeof categoryId !== 'string') throw Error('user categoryId is not a string');
            if (!(categoryId = categoryId.trim()).length) throw Error('user categoryId is empty or blank');

            return axios.get(_this7.url + '/category/' + categoryId + '/products').then(function (_ref7) {
                var status = _ref7.status,
                    data = _ref7.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
    * Lists all products
    * 
    * @returns {Promise<[Product]>}
    */
    listProducts: function listProducts() {
        var _this8 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this8.url + '/products').then(function (_ref8) {
                var status = _ref8.status,
                    data = _ref8.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * Retrieve a product and show details
     * 
     * @param {String} productId The category id of the product.
     * 
     * @returns {Promise<Product>}
     */
    productDetails: function productDetails(productId) {
        var _this9 = this;

        return Promise.resolve().then(function () {
            if (typeof productId !== 'string') throw Error('user productId is not a string');
            if (!(productId = productId.trim()).length) throw Error('user productId is empty or blank');

            return axios.get(_this9.url + '/product/' + productId).then(function (_ref9) {
                var status = _ref9.status,
                    data = _ref9.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * Lists products by theirs ids
     * 
     * @param {String} ids Array contains selected ids.
     * 
     * @returns {Promise<[Product]>}
     */
    listProductsByIds: function listProductsByIds(cart) {
        var _this10 = this;

        return Promise.resolve().then(function () {
            var ids = cart.join(',');

            return axios.get(_this10.url + '/products/?ids=' + ids).then(function (_ref10) {
                var status = _ref10.status,
                    data = _ref10.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
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
    createOrder: function createOrder(userId, deliveryAddress, orderDate, orderProducts, paymentMethod, status) {
        var _this11 = this;

        return Promise.resolve().then(function () {
            console.log('orderProducts client: ', orderProducts);
            if (deliveryAddress !== undefined) {

                if (typeof deliveryAddress !== 'string') throw Error('deliveryAddress is not a string');
                if (!(deliveryAddress = deliveryAddress.trim()).length) throw Error('deliveryAddress is empty or blank');
            }

            if (orderDate !== undefined) {
                if (typeof orderDate !== 'string') throw Error('ate is not a string');
                if (!(orderDate = orderDate.trim()).length) throw Error('orderDate is empty or blank');
            }

            if (!Array.isArray(orderProducts)) throw Error('orderProducts is not an array');
            if (!orderProducts.length) throw Error('orderProducts is empty or blank');

            if (typeof paymentMethod !== 'string') throw Error('paymentMethod is not a string');
            if ((paymentMethod = paymentMethod.trim()).length === 0) throw Error('paymentMethod is empty or blank');

            if (typeof status !== 'string') throw Error('status is not a string');
            if ((status = status.trim()).length === 0) throw Error('status is empty or blank');

            return axios.post(_this11.url + '/order', { userId: userId, deliveryAddress: deliveryAddress, orderDate: orderDate, orderProducts: orderProducts, paymentMethod: paymentMethod, status: status }).then(function (_ref11) {
                var status = _ref11.status,
                    data = _ref11.data;

                console.log('orderProducts datadata: ', data.data);

                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    }
};

module.exports = clientApi;
