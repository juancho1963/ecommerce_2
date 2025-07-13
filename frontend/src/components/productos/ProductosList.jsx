import React, { useState } from 'react'
import ProductosListItem from './ProductoListItem'

export default function ProductosList({ productos}) {
    const [productosToShow,setProductosToShow] = useState(3)

    const loadMoreProductos = () => {
        if (productosToShow > productos?.length) {
            return;
        }else {
            setProductosToShow(prevProductosToShow => prevProductosToShow +=3)
        }
    }
    return (
        <div className='row my-5'>
            {
                productos?.slice(0,productosToShow).map(producto =>(
                    <ProductosListItem producto={producto} key={producto.id}/>
                ))
            }
            {
                productosToShow < productos.length &&
                <div className='d-flex justify-content-center my-3'>
                    <button className='btn btn-sm btn-dark'
                        onClick={() => loadMoreProductos()}
                    >
                        <i className='bi bi-arrow-clockwise'></i>{" "}
                        Cargar mas
                    </button>
                </div>
            }
        </div>
    )
}