import React, { useState} from 'react';

export default function App() {

const [contador, setContador] = useState(0);

function incrementar(){
  console.log("o valor do contador é:" + contador)
  setContador(contador + 1);

}
  return (
   <div>
     <h1>Contador: {contador}</h1>
     <button onClick={incrementar}>Contar</button>
   </div>
    );
}
