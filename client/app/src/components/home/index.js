import React, { Component } from 'react'
import logic from '../../logic'
import ItemsProducts from '../items-list/items-products';

class Home extends Component {

    state = {

       products: [],

    }

    componentDidMount() {
        logic.listProducts()
          .then(products => {
                this.setState({
                    products
                })
          })      
    }

   render() {

        return (
            <main>           
                     <div className="row">       
                        <div>
                            <ItemsProducts products={this.state.products} onAddToCart={this.props.onAddToCart} carousel/>
                        </div> 
                     </div> 
            </main>
        )   
    }
}

export default Home