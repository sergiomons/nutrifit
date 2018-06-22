import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Register, Login, Home, Categories, ProductsByCategory, ProductDetails, Nav, Footer, Cart, Order } from './components'
import './App.css';
import api from 'client-api';
import logic from './logic'
import swal from 'sweetalert2';
import AllProducts from './components/products/all-products'

api.token = function (token) {
  if (typeof token !== 'undefined') {
    if (token === null)
      sessionStorage.removeItem('token')
    else
      sessionStorage.setItem('token', token)

    return
  }
  return sessionStorage.getItem('token')
}

logic.userId = function (userId) {
  if (typeof userId !== 'undefined') {
    if (userId === null)
      sessionStorage.removeItem('userId')
    else
      sessionStorage.setItem('userId', userId)

    return
  }

  return sessionStorage.getItem('userId')
}

const cart = sessionStorage.getItem('cart')

if (cart && cart !== 'undefined')
  logic._cart = JSON.parse(cart)

logic.cart = function (cart) {
  if (typeof cart !== 'undefined') {
    if (cart === null)
      sessionStorage.removeItem('cart')
    else {
      this._cart = cart

      sessionStorage.setItem('cart', JSON.stringify(cart))
    }

    return
  }

  return this._cart
}


class App extends Component {

  state = {
    userData: {},
    cartLength: logic.cart().length
  }

  componentDidMount() {

    if (logic.loggedIn) {
      logic.retrieveUser()
        .then(userData => {
          this.setState({
            userData
          })
        })
    }
  }

  onLogin = () => {

   
    logic.retrieveUser()
      .then(userData => {
        this.setState({
          userData
        })
          if(!logic.cart())
          swal({
            title: 'Bienvenido ' + this.state.userData.name || this.state.userData.username,
            type: 'success',
            showConfirmButton: false,
            timer: 1500
          });
      })
  }

  onAddToCart = (id, quantity) => {
    logic.addProductToCart(id, quantity)

    swal({
      title: 'Producto añadido al carrito',
      type: 'success',
      showConfirmButton: false,
      position:'top',
      timer: 700
    });

    this.setState({ cartLength: logic.cart().length })
  }

  onSubstractFromCart = (id, quantity) => {
    logic.substractProductFromCart(id, quantity)
    
    this.setState({ cartLength: logic.cart().length })
  }

  onRemoveFromCart = () => {
    this.setState({ cartLength: logic.cart().length })
  }

  render() {
    return (
      <div className="App">
        <Nav userData={this.state.userData} cartLength={this.state.cartLength} />
        <Switch>
          <Route exact path='/' render={() => <Home onAddToCart={this.onAddToCart} />} />
          <Route path='/allproducts' render={() => <AllProducts onAddToCart={this.onAddToCart} />} />
          <Route path='/category/:categoryId/subcategories' render={props => <Categories categoryId={props.match.params.categoryId} onAddToCart={this.onAddToCart} />} />
          <Route path='/category/:categoryId/products/' render={props => <ProductsByCategory categoryId={props.match.params.categoryId} onAddToCart={this.onAddToCart} />} />
          <Route path='/product/:productId' render={props => <ProductDetails productId={props.match.params.productId} onAddToCart={this.onAddToCart} />} />
          <Route path='/cart' render={() => <Cart onAddToCart={this.onAddToCart} onSubstractFromCart={this.onSubstractFromCart} onRemoveFromCart={this.onRemoveFromCart} />} />
          <Route path='/order' render={() => ((logic.loggedIn) && this.state.cartLength !== 0) ? <Order onRemoveFromCart={this.onRemoveFromCart}/> : <Redirect to='/auth'/>} />
          <Route path='/register' render={() => (!logic.loggedIn) ? <Register /> : <Redirect to='/' />} />
          <Route path='/auth' render={() => (!logic.loggedIn) ? <Login onLogin={this.onLogin} /> : <Redirect to='/' />} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
