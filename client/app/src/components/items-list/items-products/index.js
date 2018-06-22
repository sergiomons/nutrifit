import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Menu from '../../menu'
import Carousel from '../../carousel'
 
const ItemsProducts = ({products, onAddToCart, carousel = false, categoryName = false}) => {
    return (
    <main>      
        {carousel && <Carousel/>}
            <div className="row">
                <Menu />
                    <div className="col-10 col-lg-10 col-md-8 col-sm-8 col-xs-12">   
                        <ul>                                  
                            <div className="row mr-4 ">
                                {products.map(product => (
                                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12" key={product.id}  >
                                        <div className="card mb-5 ">
                                            <img className="card-img-top" alt={product.name} src={product.image} />
                                            <div className="card-block">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text" style={{fontSize: '1.5rem'}}>{product.price} € /ud</p>
                                                <p className="card-bottom">
                                                    <Link to={`/product/${product.id}`}><button className="btn btn-md btn-outline-secondary my-2 my-sm-0 mb-2 mr-3" type="submit">Detalles</button> </Link>
                                                    <button className="btn btn-md btn-outline-dark my-2 my-sm-0 ml-1" type="submit" onClick={() => onAddToCart(product.id)}><i id='icon' className="fas fa-shopping-cart mr-2"></i>Añadir</button> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}                                       
                            </div>                               
                        </ul>  
                    </div>
            </div>
    </main>
    )       
}

export default ItemsProducts;

