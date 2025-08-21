import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { axiosRequest, getConfig } from '../helpers/config'
import { toast } from 'react-toastify'
import { addCouponIdToCartItem, setValidCoupon } from '../../redux/slices/cartSlice'

export default function Coupon() {
    const { token } = useSelector(state => state.user)
    const [coupon, setCoupon] = useState({
        name: ''
    })
    const dispatch = useDispatch()

    const applyCoupon = async () => {
        try {
            const response = await axiosRequest.post('apply/coupon', coupon, 
                getConfig(token))
            if(response.data.error){
                toast.error(response.data.error)         
                setCoupon({
                    name:''
                })
            } else {
                dispatch(setValidCoupon(response.data.coupon))
                dispatch(addCouponIdToCartItem(response.data.id))
                setCoupon({
                name: ''
                })
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='row mb-3'>
            <div className='col-md-12'>
                <div className='d-flex'>
                    <input type="text" value={coupon.name}
                        onChange={(e) => setCoupon({
                            ...coupon, name: e.target.value
                        })}
                        className='form-control rounded-0'
                        placeholder='Introducir el cupón de descuento'
                    />
                    <button className='btn btn-dark rounded-0'
                        disabled={!coupon.name}
                        onClick={() => applyCoupon()}
                    >Aplicar</button>
                </div>
            </div>
        </div>
    )
}   