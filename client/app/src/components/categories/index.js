import React, { Component } from 'react'
import logic from '../../logic'
import ItemsCategories from '../../components/items-list/items-categories'

class Categories extends Component {

    state = {
       categories: [],
    }

    componentDidMount() {

        const categoryId = this.props.categoryId
        
        logic.listSubcategories(categoryId)
        .then(categories => {
            this.setState({
                categories
            })
        })         
    }

   render() {

    return (       
        <div className="row mt-3 mb-2">
                <div className="col-2 col-lg-2 col-md-10 col-sm-8 col-xs-12">   
                </div>
                <div className="col-10 col-lg-10 col-md-12 col-sm-12 col-xs-12">   
                   <h1 className="card-title" style={{backgroundColor: "#e7e7e7", borderBottom: "3px solid #6c757d", color:"#7db270", fontSize: "2.1rem", fontWeight: "bold"}}>Platos Individuales</h1>
                </div>
                <div>
                    <div className="row">   
                        <ItemsCategories categories={this.state.categories} onAddToCart={this.props.onAddToCart}/>
                    </div> 
                </div>  
            </div>  
        )
   }       
}

export default Categories