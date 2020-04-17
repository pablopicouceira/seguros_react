import React, {useState} from 'react';
import styled from "@emotion/styled";
import { getYearDifference,calculaSegunOrigen,calcularSegunPlan } from "../helper";


const Campo = styled.div`
display:flex;
margin-bottom:1rem;
align-items: center;
`;

const Label = styled.label`
flex: 0 0 100px
;`


const Select = styled.select`
display: block;
width:100%;
padding:1rem;
border: 1px solid #e1e1e1;
-webkit-appearance: none;
`;

const InputRadio = styled.input`
margin: 0 1rem;
`;

const Button = styled.button` 
background-color: #00838F;
font-size: 16px;
width:100%;
padding: 1rem;
color:#fff;
text-transform: uppercase;
font-weight:bold;
border:none;
transition: background-color .5s ease;
margin-top: 2rem;

&:hover{
    background-color: #26c6da;
    cursor:pointer;
}
`;

const Error = styled.div` 
background-color:red;
color:white;
padding:1rem;
width:100%;
text-align:center;
margin-bottom:2rem;
`;

const Formulario = () => {

    const [datos, setDatos] = useState({
        origen: "",
        year: "",
        plan:""
    })

    const [error, setError]= useState(false)

// Extraer los valores del state
    
    const { origen, year, plan } = datos;

    // Leer los datos del formulario y colocarlos en el state

    const obtenerInformacion = e => {
        setDatos({
            ...datos, [e.target.name]:e.target.value
        })
    }


// Cuando el usuario presiona submit
    
    const calcularSeguro = e => {
        e.preventDefault();

        if (origen.trim() === "" || year.trim() === "" || plan.trim() === "") { 

            setError(true);
            return
        }
        setError(false)
    }

    // Iniciamos con una base de 2000

    let resultado =2000


    // Obtener la diferencia en años (el año en el que estamos menos el año de fabricación del coche)
    
    const diferencia = getYearDifference(year)

    /* Incremento según el año: 
        -3% por cada año
    */
    
    resultado -= ((diferencia * 3) * resultado) / 100
    

    /* Incremento según el origen: 
        Americano 15% 
        Asiático 5%
        Europeo 30%
    */
    
    resultado = calculaSegunOrigen(origen) * resultado

   /* Incremento según el tipo de plan: 
        Básico 20% 
        Completo 50%
    */

    const incrementoPlan = calcularSegunPlan(plan)
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2)
    
    console.log(resultado)

    // Total
    

    return ( 
        <form
            onSubmit={calcularSeguro}>
            
            {error ?<Error>Deben rellenarse todos los campos</Error> :null}
            <Campo>
                <Label>Origen</Label>
                <Select
                    name="origen"
                    value={origen}
                    onChange={obtenerInformacion}
                >

                    <option value="">---Selecciona---</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiático</option>

                </Select>


            </Campo>
                 <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}

                >

                <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>

                </Select>


            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}

                /> Básico
                
                  <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}

                        /> Completo
                    
                </Campo>
            
            <Button type="submit">Calcular</Button>
        </form>
     );
}
 
export default Formulario;