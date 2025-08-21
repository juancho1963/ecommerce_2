import React from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import Alert from '../layouts/Alert'
import { colorTranslations } from '../helpers/colorTranslation'
import { decrementQty, incrementQty, removeFromtQty } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

export default function Cart() {
        const { cartItems } = useSelector(state => state.cart)
        const dispatch = useDispatch()
        const total = cartItems.reduce((acc, item) => acc += item.price * item.qty,0) 
    return (
        <div className='row my-4'>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-body'>
                        {
                            cartItems.length > 0 ?

                            <table className='table'>
                                <thead>                                    
                                    <tr>
                                        <th>#</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Color</th>
                                        <th>Tamaño</th>
                                        <th>SubTotal</th>
                                        <th>Accion</th>
                                    </tr>                                    
                                </thead>
                                <tbody>
                                    {
                                       cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index += 1 } </td>
                                             <td>
                                                <img src={item.image}
                                                    width={60} height={60}
                                                    className='img-fluid rounded'
                                                />
                                             </td>
                                            <td>{item.name}</td>
                                            <td>
                                                <i className='bi bi-caret-down'
                                                    onClick={() => dispatch(decrementQty(item))}
                                                    style={{ cursor: "pointer"}}
                                                ></i>
                                                <span className='mx-2'>{item.qty}</span>
                                                <i className='bi bi-caret-up'
                                                    onClick={() => dispatch(incrementQty(item))}
                                                    style={{ cursor: "pointer"}}
                                                ></i>
                                                </td>
                                            <td>Bs. {item.price}</td>
                                            <td>
                                                <div className='border border-dark-subtle border-1'
                                                    style={{
                                                         backgroundColor: colorTranslations [item.color], 
                                                         height: '20px', 
                                                         width: '20px'
                                                         }}>

                                                </div> 
                                            </td>
                                            <td>
                                                <span  className='bg-dark-subtle text-dark me-2 pe-1 ps-1 fw-bold'>
                                                    <small>{item.size}</small>
                                                </span>
                                            </td>
                                            <td>Bs. {item.qty * item.price}</td>
                                            <td>
                                                  <i className='bi bi-trash text-dander'
                                                    onClick={() => dispatch(removeFromtQty(item))}
                                                    style={{ cursor: "pointer"}}
                                                ></i>
                                            </td>

                                        </tr>
                                      
                                        
                                       )) 
                                    }
                                    <tr>
                                        <td colSpan={9} className='text-center'>
                                            <div className='border border-dark fw-bold p-2 rounded d-inline-block'>
                                                Total: Bs. {total}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            :
                            <Alert content="Tu carrito de compras esta vacio."
                                    type="primary"
                            />
                        }
                    </div>
                    <div className='my-3 d-flex justify-content-end'>
                            <Link to="/" className='btn btn-secondary rounded-2 mx-2'>
                                Seguir comprando
                            </Link>
                            {
                                cartItems.length > 0 &&
                                <Link to="/checkout" className='btn btn-warning rounded-2 mx-'>
                                    Pagar
                                </Link>
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}