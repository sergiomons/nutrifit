import React, { Component } from 'react'
import logic from '../../logic'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

class Register extends Component {

    state = {
       username: '',
       email:'',
       password: '',
       repeatPassword: '',
       error: '',
    }

    handlerSubmitRegister = e => {
        e.preventDefault()

        const { username, email, password, repeatPassword } = this.state
        logic.registerUser(username, email, password, repeatPassword)
            .then(res => {
                if (res) {
                    this.props.history.push('/auth')
                } else {
                    alert('wrong error')
                }     
            })
            .catch(err => {
                return this.setState({
                    error: err.message
                })
            })
    }

    handlerCapturingUsername = e => {
        const value = e.target.value
        this.setState({
            username: value
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

    handlerCapturingRepeatPassword = e => {
        const value = e.target.value
        this.setState({
            repeatPassword: value
        })
    }

   render() {
    const { username, email, password, repeatPassword } = this.state

    return (    
        <div>
            <div className="body-register">       
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-xl-7 col-lg-6 col-md-4 ">
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-5 col-sm-9 ml-5">
                            <form role="form" className="mt-5 " id="form-register" onSubmit={this.handlerSubmitRegister}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" id="exampleInputusername1" name="username" placeholder="Enter your username" autoFocus value={username} onChange={this.handlerCapturingUsername} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" placeholder="@Enter your email" value={email} onChange={this.handlerCapturingEmail}/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Enter your password" value={password} onChange={this.handlerCapturingPassword}/>
                                </div>
                                <div className="form-group">
                                    <label>Repetir Password</label>
                                    <input type="password" className="form-control" id="exampleInputRepeatPassword1" name="rep-password" placeholder="Enter repeat password" value={repeatPassword} onChange={this.handlerCapturingRepeatPassword}/>
                                </div>
                                <button type="submit" className="btn btn-secondary btn-block mt-5 mb-1">Registrar</button>
                            </form>
                            <div className="p-login">
                            <p>¿Ya registrado? <Link to='/auth'><span id="spanRegist">Logeate</span></Link></p>
                        </div>
                        {this.state.error && (<h3 className="errorRegist">* {this.state.error}</h3>)}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
   }      
   
}

export default withRouter(Register)