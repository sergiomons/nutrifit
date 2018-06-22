import React, { Component } from 'react'
import logic from '../../../logic'
import {Link} from 'react-router-dom'
import Menu from '../../menu'

class ProductDetails extends Component {

    state = {
        products: {}
     }

    componentDidMount() {

        const productId = this.props.productId

        logic.productDetails(productId)
          .then(products => {          
                this.setState({
                    products: products[0]
                })
          })      
    }

   render() {

    return (
        <div className="container-fluid">
            <div className="row mt-4">
                <Menu />
                    <div className="col-lg-10 col-md-8 col-sm-12 col-xs-12">
                    <div className="row mt-2">
                        <div className="col-12">
                        <h1 className="card-title" style={{backgroundColor: "#e7e7e7",  color:"#7db270", fontSize: "2.1rem", fontWeight: "bold", padding: "0"}}>{this.state.products.name}</h1>
                        </div>
                    </div>
                    <div className="row h-100">
            
                        <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 mt-2 ml-1 mb-1">
                            <img className="w-100 h-80" style={{ height: "20rem", borderRadius: "12px" }} alt={this.state.products.name} src={this.state.products.image} />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-1 ml-4 mb-5" style={{marginLeft:"10px"}}>
                            <dl>
                                <dd style={{marginTop:"1rem", textAlign: "left", fontSize:"1.2rem", fontWeight: "bold", fontStyle: "italic", borderBottom:"3px solid grey"}}>Este producto está compuesto de:</dd>
                                <ul style={{marginTop:"1.8rem", marginBottom:"5rem", textAlign: "left", fontSize:"1.2rem"}}> 
                                    {Array.isArray(this.state.products.description) && this.state.products.description.map((product, index) => {
                                    return <li key={index} style={{marginTop:"1.2rem"}}>* {product}</li>
                                    })}
                                </ul>
                            </dl>
                            <div className="mt-5">
                                <button className="btn btn-lg btn-dark my-2 my-sm-0 ml-4 mt-3" type="submit" style={{marginRight:"4rem"}} onClick={() => this.props.onAddToCart(this.props.productId)}>Añadir al carrito</button>                                                  
                                <Link to='/cart'><button className="btn btn-lg btn-secondary my-2 my-sm-0  mb-3"><i id="iconNav" className="fas fa-shopping-cart mr-2"></i>Ir al carrito</button> </Link>     
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
       </div>
        )
   }       
}

export default ProductDetails