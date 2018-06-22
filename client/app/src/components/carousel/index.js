import React, { Component } from 'react'
import './index.css'


function Carousel () {

    return (
        <div className="row">  
        <div className="col-12 mb-4">
            <div className="carousel slide" id="carousel-235923" data-ride="carousel" data-interval="4000">
                <ol className="carousel-indicators">
                    <li data-slide-to="0" data-target="#carousel-235923" className="active"></li>
                    <li data-slide-to="1" data-target="#carousel-235923"> </li>
                    <li data-slide-to="2" data-target="#carousel-235923"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" alt="Entrena con la mejor energía" src="http://sevilla.abc.es/gurme//wp-content/uploads/2014/06/receta-salteado-verduras-1-1440x810.jpg" />
                        <div className="carousel-caption">
                            <p className="carousel-text-sm">Entrena con la mejor energía</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="item d-block w-100" alt="Pollo con verduras" src="http://frcdn.ar-cdn.com/recipes/port960/41938df4-bc6d-4291-a25e-a2140359a9a9.jpg"/>
                        <div className="carousel-caption">
                            <p>Platos saludables</p>
                        </div>
                    </div>
                    
                    <div className="carousel-item">
                        <img className="d-block w-100" alt="Carousel Bootstrap Third" src="https://www.jabefitness.com/wp-content/uploads/2014/01/DSC04477-Medium.jpg" />
                        <div className="carousel-caption">
                            <h4>Pruébalos</h4>
                            <p>Selecciona tu comida entre nuestras diferentes categorías</p>
                        </div>
                    </div>
                </div> <a className="carousel-control-prev" href="#carousel-235923" data-slide="prev"><span className="carousel-control-prev-icon"></span> <span className="sr-only">Previous</span></a> <a className="carousel-control-next" href="#carousel-235923" data-slide="next"><span className="carousel-control-next-icon"></span> <span className="sr-only">Next</span></a>
            </div>
        </div>
    </div>

        )
   }       

export default Carousel