import React, {useState, Fragment} from 'react'
import { calcularTotal } from '../helpers';


const Formulario = (props) => {
    const {cantidad, guardarCantidad,plazo,guardarPlazo, guardarTotal,guardarCargando} = props;

    //Definir el state 
    const [error, guardarError] = useState(false);

    const calcularPrestamo = (e) => {
       e.preventDefault();

       //validar para mostrar un mensaje de error
       if (cantidad === 0 || plazo === '' || isNaN(plazo) || isNaN(cantidad)) {
        guardarError(true);
        return;
      }

       //eliminar error previo
       guardarError(false)

       //habilitar spinerr
       guardarCargando(true)
       setTimeout(() => {
        //realizar cotización
       const total = calcularTotal(cantidad, plazo);
       
       //una vez calculado guardar el total
       guardarTotal(total);

       //deshabilitar Spinner 
       guardarCargando(false)
       }, 3000);
       
    }
     
   

// const leerCantidad = (e) => {
//     guardarCantidad(parseInt(e.target.value));
   
// }

    return ( 
        <Fragment>

        <form onSubmit={calcularPrestamo}>
    
          <div className="row">
              <div>
                  <label>Cantidad Préstamo</label>
                  <input 
                      className="u-full-width" 
                      type="number" 
                      placeholder="Ejemplo: 3000" 
                      onChange={ e =>guardarCantidad(parseInt(e.target.value)) }
                  />
              </div>
              <div>
                  <label>Plazo para Pagar</label>
                  <select 
                      className="u-full-width"
                      onChange={ e =>guardarPlazo(parseInt(e.target.value)) }
                  >
                      <option value="">Seleccionar</option>
                      <option value="3">3 meses</option>
                      <option value="6">6 meses</option>
                      <option value="12">12 meses</option>
                      <option value="24">24 meses</option>
                  </select>
              </div>
              <div>
                  <input 
                      type="submit" 
                      value="Calcular" 
                      className="button-primary u-full-width" 
                  />
              </div>
          </div>
  </form>
  {(error) ? <p className='error'>Todos los campos son obligatorios</p> : null}
            
  </Fragment>
     );
}
 
export default Formulario;