import React, { Component } from 'react'
import logic from '../../../logic'
import ItemsProducts from '../../items-list/items-products'

class ProductsByCategory extends Component {

    state = {
        products: [],
        categoryName:''
     }

    componentDidMount() {

        const categoryId = this.props.categoryId

        logic.listProductsByCategory(categoryId)
          .then(products => {
                this.setState({
                    products
                })
          }) 
          logic.listAllCategories() 
                .then(categories => {
                    const currentCategory = categories.filter( _category => _category.id === categoryId)

                    this.setState({
                        categoryName: currentCategory[0].name
                    })
                })     
    }

    componentDidUpdate(prevProps) {

        const categoryId = this.props.categoryId

        if(prevProps.categoryId !== categoryId){

        logic.listProductsByCategory(categoryId)
          .then(products => {
                this.setState({
                    products
                })
          })      
          logic.listAllCategories() 
                  .then(categories => {
                      const currentCategory = categories.filter( _category => _category.id === categoryId)
  
                      this.setState({
                          categoryName: currentCategory[0].name
                      })
                  }) 
        }        
    }

   render() {
    return (
        <div className="row mt-3 mb-2">
                <div className="col-2 col-lg-2 col-md-10 col-sm-8 col-xs-12">   
            </div>
            <div className="col-10 col-lg-10 col-md-12 col-sm-12 col-xs-12">   
                <h1 className="card-title" style={{backgroundColor: "#e7e7e7", borderBottom: "3px solid #6c757d", color:"#7db270", fontSize: "2.1rem", fontWeight: "bold"}}>{this.state.categoryName}</h1>
            </div>
                <div>
                    <div className="row">   
                        <ItemsProducts products={this.state.products} onAddToCart={this.props.onAddToCart}/>
                    </div> 
                </div>  
            </div>      
    )
   }       
}

export default ProductsByCategory