import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'
import {withRouter, Link} from 'react-router-dom'
import swal from 'sweetalert2';

class Order extends Component {

    state = {
        cart: [],
        total: 0,
        name: '',
        deliveryAddress: '',
        paymentMethod: '',
        cardName: '',
        cardNumber: '',
        expirityDate: '',
        ccv: '',
        orderId: '',
        error: ''
     }

    componentDidMount() {

        this.getCartSummary()
    }

    getCartSummary = () => {
        if (logic._cart.length && logic._cart !== 'undefined') {
            logic.getCartSummary()
                .then(({products, total}) => this.setState({ cart: products, total }))
        }else this.setState({ cart: [], total: 0 })
    }

    handlerCreateOrder = (e,props) => {
        e.preventDefault()
        
        const {deliveryAddress, paymentMethod } = this.state

        logic.createOrder(deliveryAddress, paymentMethod)
            .then(orderId => {
                this.setState({
                    orderId
                })
                
                swal({
                    title: 'Su pedido con nº' + this.state.orderId + 'ha sido creado ',
                    text: 'Los detalles del pedido se ha enviado a tu correo',
                    type: 'success',
                    animation: false,
                    customClass: 'animated pulse'
                }).then(res => {
                    if (res) {

                        logic.cart(null)
                        this.props.onRemoveFromCart()
                        window.location.reload()
                        
                    }
                })


            }).catch(err => {
                    return this.setState({
                        error: err.message
                    })
            })
    }

    handlerInputName = e => {
        const value = e.target.value

        this.setState({
            name: value 
        })
    }

    handlerInputDeliveryAddress = e => {
        const value = e.target.value

        this.setState({
            deliveryAddress: value 
        })
    }

    handlerSelectPaymentMethod = e => {
        const value = e.target.value

        this.setState({
            paymentMethod: value 
        })
    }

    handlerInputCardName = e => {
        const value = e.target.value

        this.setState({
            cardName: value 
        })
    }

    handlerInputCardNumber = e => {
        const value = e.target.value

        this.setState({
            cardNumber: value 
        })
    }

    handlerInputExpirityDate = e => {
        const value = e.target.value

        this.setState({
            expirityDate: value 
        })
    }

    handlerInputCcv = e => {
        const value = e.target.value

        this.setState({
            ccv: value 
        })
    }

   render() {
    const { name, deliveryAddress, cardName, cardNumber, expirityDate, ccv } = this.state
    return (
        <main>             
            <div className="row ml-1 mt-4">
                <div className="col-xl-9 col-lg-8 col-md-9 col-sm-12 col-xs-12 mb-4 mt-3">
                    <form className="mb-3 mx-auto" onSubmit={this.handlerCreateOrder}>

                        <div className="row  mb-3">
                            <div className="col-md-11 input-group mb-3 ">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-medium">Nombre y apellidos<i className="far fa-id-card ml-2"></i></span>
                                </div>
                                    <input type="text" name="name-user" value={name} onChange={this.handlerInputName} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-medium"/>      
                            </div>    
                        </div>

                        <div className="row  mb-3">
                            <div className="col-md-11 input-group mb-3 ">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-medium">Dirección de envío<i id='icon' className="fas fa-truck ml-2"></i></span>
                                </div>
                                    <input type="text" name="delivery-address" value={deliveryAddress} onChange={this.handlerInputDeliveryAddress} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-medium"/>
                            </div>
                        </div>

                        <div className="row mb-3">
                        <div className="col-md-7 input-group mb-3 ">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Método de pago<i className="far fa-credit-card ml-2"></i><i className="fab fa-cc-paypal ml-1"></i></label>
                                </div>
                                <select className="custom-select" id="inputGroupSelect01" onChange={this.handlerSelectPaymentMethod}>
                                    <option selected>Seleccionar...</option>
                                    <option value="Tarjeta débito/crédito">Tarjeta débito/crédito</option>
                                    <option value="Paypal">Paypal</option>
                                </select>
                            </div>
                        </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                            <label htmlFor="validationServer03">Nombre en la tarjeta</label>
                            <input type="text" name="card-name" value={cardName} onChange={this.handlerInputCardName} className="form-control"  placeholder="Nombre y apellidos" required/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                            <label htmlFor="validationServer04">Número de tarjeta</label>
                            <input type="number" name="card-number" value={cardNumber} onChange={this.handlerInputCardNumber} className="form-control "  placeholder="Número de tarjeta válido" required/>

                            </div>
                            <div className="col-md-3 mb-3">
                            <label htmlFor="validationServer05">Fecha expiración</label>
                            <input type="date"  name="expirity-date" value={expirityDate} onChange={this.handlerInputExpirityDate} className="form-control"  placeholder="MM/AA" required/>
                            </div>
                            <div className="col-md-3 mb-3">
                            <label htmlFor="validationServer06">CCV</label>
                            <input type="password" name="ccv" value={ccv} onChange={this.handlerInputCcv} className="form-control"  placeholder="cvv" required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                            <input className="form-check-input mt-3" type="checkbox" value="" id="invalidCheck3" required/>
                            <label className="form-check-label mt-2" htmlFor="invalidCheck3" style={{color:"black", fontSize: "1.1rem" }}>Acepto los términos y condiciones</label>
                            </div>
                        </div>

                            <button className="btn btn-md btn-outline-dark my-2 my-sm-0 ml-1 mb-3 mt-4 mx-auto" type="submit">Finalizar Pedido</button>                        
                    </form>
                    {this.state.error && (<h3 className="errorOrder">* {this.state.error}</h3>)}
            </div>
               
            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 col-xs-8 mb-4 ">
                <div className="card">
                    <h5 className="card-header" style={{borderTopLeftRadius: "calc(1rem - 1px)", borderTopRightRadius: "calc(1rem - 1px)", backgroundColor: "#76a86a"}}>Total Pedido</h5>
                    <div className="card-body">
                        <p className="card-text" style={{fontSize: "2.5rem", color: "#6c757d"}}>{this.state.total} €</p>
                    </div>
                </div>
            </div>
        </div>
    </main>  

        )
   }       
}

export default withRouter(Order)