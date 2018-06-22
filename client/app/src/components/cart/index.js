import React, { Component } from 'react'
import logic from '../../logic'
import { Link, Redirect } from 'react-router-dom'
import swal from 'sweetalert2';

class Cart extends Component {

    changes = {}

    state = {
        cart: [],
        total: 0,
    }

    componentDidMount() {
        this.getCartSummary()
    }

    componentWillReceiveProps() {
        this.getCartSummary()
    }

    getCartSummary = () => {
        if (logic._cart.length && logic._cart !== 'undefined') {
            logic.getCartSummary()
                .then(({ products, total }) => this.setState({ cart: products, total }))
        } else this.setState({ cart: [], total: 0 })
    }

    onRemoveFromCart = (product) => {
        logic.removeProductFromCart(product)

        this.getCartSummary()

        this.props.onRemoveFromCart()
    }

    changeQuantity = (id, value, defaultValue) => {
        const preValue = this.changes[id] || defaultValue

        if (value && value > 0) {
            if (value > preValue)
                this.props.onAddToCart(id, value - preValue)
            else if (preValue > value)
                this.props.onSubstractFromCart(id, preValue - value)

            this.changes[id] = value
        }
    }

    render() {
        return (
            <main>
                <div className="container-fluid">
                    <div className="row mt-4">
                        <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 col-xs-12">
                            <h2 className=" ml-3 mt-2" style={{ fontWeight: "bold", fontStyle: "italic", textAlign: "left", color: "#4ca562" }}>Tu carrito<i id='icon' className="fas fa-shopping-cart ml-2"></i></h2>
                            <table className="table mt-2" >
                                <thead>
                                    <tr className="table-active" style={{ color: "#6c757d" }}>
                                        <th>#</th>
                                        <th >Artículo</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Total</th>
                                        <th>Borrar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.cart.length ? this.state.cart.map(product => {
                                        return (
                                            <tr key={product.id}>
                                                <td><img style={{ width: '3.5rem', height: '2rem' }} src={product.image} /></td>
                                                <td style={{ textAlign: "left" }}><span style={{ width: '12rem', height: '2rem', marginLeft: "10px" }}>{product.name}</span></td>
                                                <td><span>{product.price} €/ud</span></td>
                                                <td><input id="quantity" type="number" min="1" step="1" defaultValue={product.quantity} onChange={e => this.changeQuantity(product.id, parseInt(e.target.value), parseInt(e.target.defaultValue))} style={{ width: '2.5rem', height: '1.4rem', }} /></td>
                                                <td> <span>{product.price * product.quantity} €</span></td>
                                                <td><button onClick={() => this.onRemoveFromCart(product.id)} style={{ backgroundColor: "#bb3232", color: "white", border: "none",borderRadius: "6px" , cursor: "pointer", height: '1.2rem', lineHeight: "1rem" }}>X</button></td>
                                            </tr>)
                                    }) :
                                        <p className="mt-4 mb-4 mx-auto" style={{ fontSize: "1.8rem", color: "#6c757d" }}>No hay productos en el carrito</p>}
                                </tbody>
                                <tfoot>
                                    <tr className="table-active" style={{ fontSize: "1.4rem", color: "#6c757d" }}>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>Total:</th>
                                        <th>{this.state.total} €</th>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>

                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-7 col-xs-8 mx-auto mb-4 mt-5">
                            <div className="card">
                                <h5 className="card-header" style={{ borderTopLeftRadius: "calc(1rem - 1px)", borderTopRightRadius: "calc(1rem - 1px)" }}>Total Carrito</h5>
                                <div className="card-body">
                                    <p className="card-text" style={{ fontSize: "2rem", color: "#555c63" }}>{this.state.total} €</p>
                                </div>
                                <div className="card-footer">
                                    <Link to={`/${logic.loggedIn ? 'order' : 'auth'}`}><button className="btn btn-lg btn-dark my-2 my-sm-0 btn-block mb-3" style={{ border: "1px solid #c6c6c6" }} >Pagar</button></Link>
                                </div>
                                <Link to='/'><button className="btn btn-md btn-secondary mt-1 mb-3 mx-auto" style={{ border: "1px solid #c6c6c6" }} >Seguir comprando</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Cart
