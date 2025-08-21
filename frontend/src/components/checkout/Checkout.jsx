import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Coupon from '../coupons/Coupon'
import { setValidCoupon } from '../../redux/slices/cartSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Alert from '../layouts/Alert'

export default function Checkout (){
        const { cartItems, validCoupon } = useSelector(state => state.cart)
        const { user} = useSelector(state => state.user)
        const dispatch = useDispatch()
        const totalOfCartItems = cartItems.reduce((acc, item) => acc += item.price * item.qty, 0)
        const calculateDiscount = () => {
            return validCoupon?.discount && totalOfCartItems * validCoupon?.discount / 100
        }
        const removeCoupon = () => {
            dispatch(setValidCoupon({
                name: '',
                discount: 0
            }))
            toast.success('Cupon eliminado')
        }
        const totalAfterDiscount = () => {
            return totalOfCartItems - calculateDiscount()
        }
    return (
        <div className='card my-2 mb-4'>
            <div className='card-body'>
                <div className='row my-5'>
                    <div className='col-md-7'>  
                        {/* Datos de usuario */}
                    </div>
                    <div className='col'>
                        {/* Campo del Cupon */}
                        <Coupon/>
                        <ul className='list-group'>
                            {
                                cartItems.map((item, index) => (
                                    <li key={index} className='list-group-item d-flex'>
                                        <img src={item.image}
                                            width={60} height={60}
                                            className='img-fluid rounded me-2'
                                        />
                                        <div className='d-flex flex-column'>
                                            <h6 className='my-1'>{item.name}</h6>
                                            <span className='text-muted'><strong>Color: </strong>{item.color}</span>
                                            <span className='text-muted'><strong>Tamaño: </strong>{item.size}</span>
                                        </div>
                                         <div className='d-flex flex-column ms-auto'>                                        
                                            <span className='text-muted'>${item.price} <i>x</i> {item.qty}</span>
                                            <span className='text-danger fw-bold'>${item.price * item.qty}</span>
                                        </div>
                                    </li>
                                ))
                            }
                            <li className='list-group-item d-flex justify-content-between'>
                                <span className='fw-bold'>SubTotal</span>
                                <span className='fw-bold'>${totalOfCartItems}</span>
                            </li>
                            <li className='list-group-item d-flex justify-content-between'>
                                <span className='fw-bold'>Descuento {validCoupon?.discount}</span>
                                {
                                    validCoupon?.name &&
                                    <span className='text-danger'>{validCoupon?.name}
                                        <i className='bi bi-trash'
                                        style={{cursor: 'pointer'}}
                                        onClick={() => removeCoupon()}
                                        ></i>
                                    </span>
                                }
                                <span className='fw-bold text-danger'> -${calculateDiscount()}</span>
                            </li>
                            <li className='list-group-item d-flex justify-content-between'>
                                <span className='fw-bold'>Total a pagar</span>
                                <span className='fw-bold'>$ {totalAfterDiscount()}</span>                                
                            </li>
                        </ul>
                        <div className='my-3'>
                            {
                                user?.profile_completed ?
                                <Link to='/' className='btn btn-warning rounder-0'>Proceder con el pago</Link>
                                :
                                <Alert content="Para terminar tu compra, es necesario que ingreses los detalles de la factura"
                                    type="warning"/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 