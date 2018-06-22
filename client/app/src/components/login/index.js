import React, { Component } from 'react'
import logic from '../../logic'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

class Login extends Component {

    state = {
       email:'',
       password: '',
       error: ''
    }

    handlerSubmitLogin = e => {
        e.preventDefault()

        const { email, password} = this.state

        logic.login(email, password)
        .then(res => {
            if (res) {
                this.props.onLogin()
                if (!logic.cart())
                    this.props.history.push('/')
                else
                    this.props.history.push('/cart')

            } else {
              console.log('Error, username and/or password wrong')
            }
        })
        .catch(err => {
            return this.setState({
                error: err.message
            })
        })     
    }

    handlerCapturingEmail = e => {
        const value = e.target.value
        this.setState({
            email: value
        })
    }

    handlerCapturingPassword = e => {
        const value = e.target.value
        this.setState({
            password: value
        })
    }

   render() {
    const { email, password } = this.state
    return (
        <div>     
            <div className="body-login">
            <div className="container-fluid">
                <div className="row ml-4">
        
                    <div className="col-md-4">
                        <form role="form" className="form" onSubmit={this.handlerSubmitLogin}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" name="email"  placeholder="@Enter your email" autoFocus value={email} onChange={this.handlerCapturingEmail}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Enter your password" value={password} onChange={this.handlerCapturingPassword}/>
                            </div>
                            <div className="checkbox">      
                                <label>
                                    <input type="checkbox" /> Mantener sesión
                                </label>
                            
                            </div> 
        
                            <button type="submit" className="btn btn-dark btn-block mt-3 mb-3">Login</button>
                        </form>
                        <div className="p-regist">
                            <p>¿No registrado? <Link to='/register'><span id="span">Crea una cuenta</span></Link></p>
                        </div>
                            {this.state.error && (<h3 className="errorLogin">* {this.state.error}</h3>)}
                    </div>
                    <div className="col-md-8">
                    </div>
                </div>
            </div>
            </div>
        </div>
        )
   }      
}

export default withRouter(Login)
