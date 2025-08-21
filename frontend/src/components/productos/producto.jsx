import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosRequest } from '../helpers/config'
import Alert from '../layouts/Alert'
import Spinner from '../layouts/Spinner'
import { colorTranslations } from '../helpers/colorTranslation'
import { Parser } from 'html-to-react'
import Slider from './images/Slider'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'

export default function Producto() {
        const [producto, setProducto] = useState([])
        const [loading, setLoading] = useState(false)        
        const [selectColor, setSelectColor] = useState(null)
        const [selectSize, setSelectSize] = useState(null)
        const [qty, setQty] = useState(1)
        const [error, setError] = useState('')
        const { slug } = useParams()
        const dispatch = useDispatch()

        useEffect(() => {
            const fetchProductoBySlug = async () => {
                setLoading(true)
                try {
                    const response = await axiosRequest.get(`productos/${slug}/show`)
                    setProducto(response.data.data)
                    setLoading(false)
                } catch (error) {
                    if(error?.response?.status === 404) {
                        setError('Lo sentimos, pero el producto que buscas no esta disponible.')
                    }
                    console.log(error)
                    setLoading(false)
                }
            }
            fetchProductoBySlug()
        },[slug])

        const decrementQty = () => {
            if (qty > 1) {
                setQty(qty - 1)
            }
        }

        const handleInputChange = (e) => {
            const value = Math.max(1, Math.min(Number(e.target.value), producto?.qty || 1))
            setQty(value)
        }

        const incremenQty = () => {
            if (qty < producto?.qty) {
                setQty(qty + 1)
            }
        }

    return (
        <div className='card my-5'>
            {
                error?
                <alert type="danger" content={error} />
                :
                loading?
                <Spinner/>
                :
                <div className='row g-0'>
                    <div className='col-md-4 p-2'>
                       <Slider producto={producto}/>
                    </div>
                    <div className='col-md-8'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between'>
                                <h5 className='text-dark'>{producto?.name}</h5>
                                <h6 className='badge bg-success p-2'>Bs.{producto?.price}</h6>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between'>
                            <div className='d-flex justify-content-start aling-items-center mb-3'>
                               {
                                producto.sizes?.map(size => (
                                <span key={size.id}
                                    onClick={() => setSelectSize(size)}
                                    style={{ cursor: 'pointer'}}
                                    className={`border border-2 bg-dark-subtle text-dark me-2 pe-1 ps-1 fw-medium
                                        ${selectSize?.id === size.id ?
                                            'border border-2 border-dark-subtle fw-bold text-decoration-underline' : ''
                                        }`}>
                                    <small>{size.name}</small>
                                </span>
                                    ))
                                }
                            </div>
                                                   
                            <div className='me-3'>
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
                                <div key={color.id} 
                                    onClick={() => setSelectColor(color)}
                                    className={`me-1 border border-dark-subtle border-1
                                        ${selectColor?.id === color.id ?
                                            'border border-dark-subtle border-2 bi bi-x-lg text-light d-flex justify-content-center align-items-center' : ''
                                        }`}
                                    style={{ backgroundColor: colorTranslations [color.name], height: '20px', width: '20px',
                                        cursor: 'pointer',
                                    }}>
                                </div> 
                                ))
                            }
                        </div>
                        <div className='my-3'>
                            {
                                Parser().parse(producto?.desc)
                            }
                        </div>
                        <div className='row mt-5'>
                            <div className='d-flex justify-content-center'>
                                <div className='input-group mb-5' style={{ maxWidth:'150px'}}>
                                    <button className='btn btn-outline-secondary'
                                        type='button'
                                        onClick={decrementQty}
                                        disabled={qty <= 1}
                                    >-</button>
                                    <input type="number" className='form-control'
                                        placeholder='Cantidad'
                                        value={qty}
                                        onChange={handleInputChange}
                                        min={1}
                                        max={producto?.qty > 1 ? producto?.qty : 1}
                                    />
                                    <button className='btn btn-outline-secondary'
                                        type='button'
                                        onClick={incremenQty}
                                        disabled={qty >= producto?.qty}
                                    >+</button>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-dark'
                                disabled={ !selectColor || !selectSize || producto?.qty == 0}
                                onClick={() => {
                                    dispatch(addToCart({
                                        producto_id: producto.id,
                                        name: producto.name,
                                        slug: producto.slug,
                                        qty: parseInt(qty),
                                        price: parseInt(producto.price),
                                        color: selectColor.name,
                                        size: selectSize.name,
                                        maxQty: parseInt(producto.qty),
                                        image: producto.thumbnail,
                                        coupon_id: null
                                    }))
                                    setSelectColor(null)
                                    setSelectSize(null)
                                    setQty(1)
                                    
                                }}
                            >
                                <i className='bi bi-cart-fill'></i> {" "} Agragar al Carrito
                            </button>
                        </div>

                    </div>                    
                </div>
            }            
        </div>
    )
 }

