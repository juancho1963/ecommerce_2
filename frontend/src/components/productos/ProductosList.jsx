import React from 'react'
import ProductosListItem from './ProductoListItem'

export default function ProductosList({ productos}) {
    return (
        <div className='row my-5'>
            {
                productos?.map(producto =>(
                    <ProductosListItem producto={producto} key={producto.id}/>
                ))
            }
        </div>
    )
}