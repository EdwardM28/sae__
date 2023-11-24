import {useState, useEffect} from "react";
import {useRouter} from "next/router";
import axios from "axios";


export default function ProductoForm({
  _id,
  titulo:existingTitulo,
  descripcion:existingDescripcion,
  precio:existingPrecio,
}) {
  const [titulo, establecerTitulo] = useState(existingTitulo || '');
  const [descripcion, establecerDescripcion] = useState(existingDescripcion || '');
  const [precio, establecerPrecio] = useState (existingPrecio || '');
  const [goToProductos,setGoToProductos] = useState(false)
  const router = useRouter();
  async function saveProducto(ev) {
    ev.preventDefault();
    const data = {titulo,descripcion,precio};
    if (_id) {
      //update
      await axios.put('/api/productos', {...data,_id});
    } else {
      //create
      await axios.post('/api/productos', data);
    }
    setGoToProductos(true);
  }
  if (goToProductos) {
    router.push('/productos');
  }
  return (
        <form onSubmit={saveProducto}>
        <label>Nombre del producto</label>
        <input 
        type="text" 
        placeholder="Nombre del producto" 
        value={titulo} 
        onChange={ev => establecerTitulo(ev.target.value)}/>

        <label>Descripcion</label>
        <textarea 
        placeholder="Descripcion"
        value={descripcion}
        onChange={ev => establecerDescripcion(ev.target.value)}
        />

        <label>Precio</label>
        <input 
        type="number" 
        placeholder="Precio"
        value={precio}
        onChange={ev => establecerPrecio(ev.target.value)}
        />

        <button 
        type="submit"
        className="btn-primary">
        save
        </button>
        </form>
    );
}
