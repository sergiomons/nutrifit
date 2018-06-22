import React, { Component } from 'react'
import './index.css'

function Footer() {

    return (
        <div className="footer">
            <footer>
                <div className="row mb-3">
                     <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 mb-4">
                     </div>
                    <div className="col-lg-2 col-md-5 col-sm-5 mb-4">
                        <ul>
                            <li className="list-item mb-2" style={{fontWeight: "bold", fontStyle: "italic"}}>EMPRESA</li>
                            <li className="list-item">Sobre nosotros</li>
                            <li className="list-item">Restaurante</li>
                            <li className="list-item">Afiliados</li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-5 col-sm-5 mb-4">
                        <ul>
                        <li className="list-item mb-2" style={{fontWeight: "bold", fontStyle: "italic"}}>INFORMACIÓN</li>
                            <li className="list-item">Acuerdos legales</li>
                            <li className="list-item">Política de envío</li>
                            <li className="list-item">Métodos de pago</li>
                            <li className="list-item">Política de cookies</li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-5 mb-4 ">
                        <ul>
                        <li className="list-item mb-2" style={{fontWeight: "bold", fontStyle: "italic"}}>CONTACTO</li>
                            <li className="list-item">Contáctanos</li>
                            <li className="list-item">Donde estámos</li>
                            <li className="list-item">Cómo comprar</li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-5 col-sm-5 mb-4">
                        <ul>
                            <li className="list-item mb-2" style={{fontWeight: "bold", fontStyle: "italic"}}>Síguenos en:</li>
                            <li className="list-item">Facebook</li>
                            <li className="list-item">Instagram</li>
                            <li className="list-item">Twitter</li>
                        </ul>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-12">
                        <p>&copy; 2018. Todos los derechos reservados. @sergiomons</p>
                    </div>
                </div>
            </footer>
        </div>
        )
    }

export default Footer


