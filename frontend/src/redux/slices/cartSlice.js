import { createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-toastify'

const initialState = {
    cartItems: [],
    validCoupon: {
        name: '',
        discount: 0
    }
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state,action){
            const item = action.payload
            let productoItem = state.cartItems.find(producto => producto.producto_id === item.producto_id
                && producto.color === item.color && producto.size === item.size
            )
            if (productoItem) {
                toast.info('Este producto ya esta en tu carrito.')
            }else {
                state.cartItems = [item,...state.cartItems]
                toast.success('El producto ha sido añadido a tu carrito.')
            }
        },
        incrementQty(state,action){
            const item = action.payload
            let productoItem = state.cartItems.find(producto => producto.producto_id === item.producto_id
                && producto.color === item.color && producto.size === item.size
            )
            if (productoItem.qty === productoItem.maxQty) {
                toast.info(`Solo contamos con ${productoItem.maxQty} productos disponible.`)
            }else {
                productoItem.qty += 1
            }
        },
        decrementQty(state,action){
            const item = action.payload
            let productoItem = state.cartItems.find(producto => producto.producto_id === item.producto_id
                && producto.color === item.color && producto.size === item.size
            )
            productoItem.qty -= 1
            if (productoItem.qty === 0) {
                state.cartItems = state.cartItems.filter(producto => producto.producto_id !== item.producto_id
                || producto.color !== item.color || producto.size !== item.size)            
            }
        },
        removeFromtQty(state, action){
            const item = action.payload

            state.cartItems = state.cartItems.filter(producto => producto.producto_id !== item.producto_id
                || producto.color !== item.color || producto.size !== item.size)
            toast.warning('El producto ha sido eliminado del carrito de compras.')           
            
        },
        setValidCoupon(state, action){
            state.validCoupon = action.payload
        },
        addCouponIdToCartItem(state, action){
            const coupon_id = action.payload
            state.cartItems = state.cartItems.map(item => {
                return {...item, coupon_id}
            })
        },
        clearCartItems(state, action){
            state.cartItems = []
        }
    }
})

const cartReducer = cartSlice.reducer
export const { addToCart, incrementQty, decrementQty, removeFromtQty,
                setValidCoupon, addCouponIdToCartItem, clearCartItems
 } = cartSlice.actions
export default cartReducer