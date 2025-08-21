import React from 'react'
import { Link } from 'react-router-dom'
import { colorTranslations } from '../helpers/colorTranslation'

export default function ProductoListItem({ producto}) {
    return (
        <div className='col-md-4 mb-3'>
            <Link to={`/producto/${producto.slug}`} className='text-decoration-none text-dark'>
                <div className='card shadow-sm h-100'>
                    <img src={producto.thumbnail} alt={ producto.name } 
                        className='card-img-top'/>
                       <div className='card-body'>
                            <div className='d-flex justify-content-between'>
                                <h5 className='text-dark'>{producto.name}</h5>
                                <h6 className='badge bg-success p-2'>Bs{producto.price}</h6>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex justify-content-start aling-items-center mb-3'>
                                    {
                                        producto.sizes?.map(size => (
                                            <span key={size.id} className='bg-dark-subtle text-dark me-2 pe-1 ps-1 fw-bold'>
                                                <small>{size.name}</small>
                                            </span>
                                        ))
                                    }
                                </div>
                                
                                <div>
                                    {
                                        producto.status == 1 ?
                                        <span className='badge bg-warning p-2'>
                                            En stock
                                        </span>
                                        :
                                        <span className='badge bg-danger p-2'>
                                            Sin stock
                                        </span>
                                    }
                                </div>

                            </div>
                                            
                            <div className='d-flex justify-content-start aling-items-center mb-3' >
                                {
                                    producto.colors?.map(color => (
                                        <div key={color.id} className='me-1 border border-dark-subtle border-1'
                                            style={{ backgroundColor: colorTranslations [color.name]  , height: '20px', width: '20px'}}>
                                        </div> 
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            </Link>
        </div>
    )
}