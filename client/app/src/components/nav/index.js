import React, { Component } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'
import './index.css'
import swal from 'sweetalert2';

class Nav extends Component {
    
    state = {
        categories: []
    }

    componentDidMount() {

        logic.listAllCategories()
            .then(listCategories => {
                const categories = listCategories.filter(category => { return category.parentId === undefined })
                this.setState({
                    categories
                })
            })
    }

    logout() {
        swal({
            title: 'Cerraste sesión',
            timer: 1000,
            showConfirmButton: false,
            type: 'success'
        })
        logic.logout()
        
            this.props.location.push('/')
}

    render() {

        return (         
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                        <a className="navbar-brand mr-4 ml-2" href="">Nutri<span id="spanBrand">fit</span></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to='/' className="nav-link" href="">Home <span className="sr-only">(current)</span></Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Categorías
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        { 
                                            this.state.categories.map(category => {
                                                return <Link to={`/category/${category.id}${category.hasChildren ? '/subcategories' : '/products'}`} className="dropdown-item" href="" key={category.id}>{category.name}</Link>
                                            })
                                        }
                                        <div className="dropdown-divider"></div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to='/allproducts' className="nav-link" href="">Productos</Link>
                                </li>
                            </ul>
                                    <Link to='/cart'><i id="iconNav" className="fas fa-shopping-cart mr-4">{this.props.cartLength ? <span id="numBadget" className="badge badge-pill badge-danger">{this.props.cartLength}</span> : ''}</i></Link>
                            {!logic.loggedIn ? (
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/register"><button className="btn btn-sm btn-secondary my-2 my-sm-0" type="submit">Sing Up</button></Link></li>
                                    <li><Link to="/auth"><button className="btn btn-sm btn-dark my-2 my-sm-0" type="submit">Login</button></Link></li>
                                </ul>) : (
                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {this.props.userData.name || this.props.userData.username}
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <div className="dropdown-divider"></div>
                                                <a className="dropdown-item" href="" onClick={this.logout}>Cerrar sesión</a>
                                                <div className="dropdown-divider"></div>
                                            </div>
                                        </li>
                                    </ul>)}
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Nav



