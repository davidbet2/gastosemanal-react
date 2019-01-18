import React, { Component } from 'react';
import Header from './Header';
import '../css/App.css';
import Formulario from './Formulario';
import Listado from './Listado';
import { validarPresupuesto } from './Helper';
import ControlPresupuesto from './ControlPresupuesto';


class App extends Component {

  state = {
    presupuesto: '',
    restante: '',
    gastos: {}
  }

  componentDidMount() {
    this.obtenerPresupuesto();
  }

  obtenerPresupuesto  = () => {
    let presupuesto = prompt('Cual es el presupuesto');

    let resultado = validarPresupuesto(presupuesto);
    if(resultado){
      // console.log('Valido');
      this.setState({
        presupuesto: presupuesto,
        restante: presupuesto
      })
    }else{
      console.log('Presupuesto no valido');
      this.obtenerPresupuesto();
    }

  }

  
  //agregar un nuevo gasto al state
  agregarGasto = gasto => {
    
    //tomar una copia del state actual

    const gastos = {...this.state.gastos};
    
    //agregar el gasto al objeto del state

    gastos[`gastos${Date.now()}`] = gasto;

    //restar el presupuesto

    this.restarPresupuesto(gasto.cantidadGasto);
    
    //ponerlo en state

    this.setState({
      gastos
    })
    
  }

  restarPresupuesto = cantidad => {
    //leer el gasto
    let restar = Number(cantidad);

    //tomar copia del state actual

    let restante = this.state.restante;

    //lo restamos

    restante -= restar;

    restante = String(restante);

    //agregar el nuevo estate

    this.setState({
      restante
    })

  }
  
  render() {

    const titulo = 'Gasto Semanal';
    return (
      <div className="App">
        <header className="App-header">
         <div className="App container">
            <Header
              titulo = {titulo}
            />

            <div className="contenido-principal contenido">
              <div className="row">

                <div className="one-half column">
                  <Formulario
                    agregarGasto = {this.agregarGasto}
                  />
                </div>
                
                <div className="one-half column">
                  <Listado
                    gastos = {this.state.gastos}
                  />
                  <ControlPresupuesto
                    presupuesto = {this.state.presupuesto}
                    restante = {this.state.restante}
                  />
                </div>

              </div>
            </div>

         </div>
        </header>
      </div>
    );
  }
}

export default App;
