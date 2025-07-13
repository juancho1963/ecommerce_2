import React, { useEffect, useState } from 'react'
import ProductosList from './productos/ProductosList'
import { axiosRequest } from './helpers/config'
import { useDebounce } from 'use-debounce'
import Alert from './layouts/Alert'
import Spinner from './layouts/Spinner'

export default function Home() {
        const [productos, setProductos] = useState([])
        const [colors, setColors] = useState([])
        const [sizes, setSizes] = useState([])
        const [loading, setLoading] = useState(false)

        const [selectColor, setSelectColor] = useState('')
        const [selectSize, setSelectSize] = useState('')
        const [searchTerm, setSearchTerm,] = useState('')
        const [message, setMessage,] = useState('')
        const debouncedSearchTerm = useDebounce(searchTerm, 1000)

        const handleColorSelecBox = (e) => {
            setSelectSize('')
            setSearchTerm('')
            setSelectColor(e.target.value)
        }

        const handleSizeSelecBox = (e) => {
            setSelectColor('')
            setSearchTerm('')
            setSelectSize(e.target.value)
        }
            
        const clearFilter = () => {
            setSelectColor('')
            setSelectSize('')
        }

        useEffect(() => {
            const fetchAllProductos = async () => {
                setMessage('')
                setLoading(true)
                try {
                    if(selectColor) {
                        const response = await axiosRequest.get(`productos/${selectColor}/color`)
                        setProductos(response.data.data)
                        setColors(response.data.colors)
                        setSizes(response.data.sizes)
                        setLoading(false)
                    }else  if(selectSize) {
                        const response = await axiosRequest.get(`productos/${selectSize}/size`)
                        setProductos(response.data.data)
                        setColors(response.data.colors)
                        setSizes(response.data.sizes)
                        setLoading(false)
                    }else  if(debouncedSearchTerm[0]) {
                        const response = await axiosRequest.get(`productos/${searchTerm}/find`)
                        if(response.data.data.length > 0){
                            setProductos(response.data.data)
                            setColors(response.data.colors)
                            setSizes(response.data.sizes)
                            setLoading(false)
                        }else{
                            setMessage('Lo sentimos, no hemos encontrado productos que coincidan con tu busqueda.')
                            setLoading(false)
                        }
                                     
                    }
                    else{
                        const response = await axiosRequest.get('productos')
                        setProductos(response.data.data)
                        setColors(response.data.colors)
                        setSizes(response.data.sizes)
                        setLoading(false)
                    }

                } catch (error) {
                   console.log(error) 
                }
            }
            fetchAllProductos()
        },[selectColor, selectSize, debouncedSearchTerm[0]])

    return (
        <div className='row my-5'> 
            <div className='col-md-12'> 
                <div className='row'>
                    <div className='col-md-8 mx-auto'>
                        <div className='row'>

                            <div className='col-md-4 mb-2'>
                                <div className='mb-2'>
                                    <span className='fw-bold'>
                                        Filtrar por color:
                                    </span>
                                </div>
                                <select name="color_id" id="color_id"
                                    defaultValue=""
                                    onChange={(e) => handleColorSelecBox(e)}
                                    disabled={selectSize || searchTerm}
                                    className='form-select'
                                >
                                    <option value="" disabled={!selectColor}
                                        onChange={() => clearFilter}
                                        >
                                            Todos los Colores
                                        </option>
                                        {
                                            colors.map(color =>( 
                                                <option value={color.id} key={color.id}>
                                                    {color.name}
                                                </option>
                                            ))
                                        }
                                </select>
                            </div>

                            <div className='col-md-4 mb-2'>
                                <div className='mb-2'>
                                    <span className='fw-bold'>
                                        Filtrar por tamaño:
                                    </span>
                                </div>
                                <select name="size_id" id="size_id"
                                    defaultValue=""
                                    onChange={(e) => handleSizeSelecBox(e)}
                                    disabled={selectColor || searchTerm}
                                    className='form-select'
                                >
                                    <option value="" disabled={!selectSize}
                                        onChange={() => clearFilter}
                                        >
                                            Todos los Tamaños
                                        </option>
                                        {
                                            sizes.map(size =>( 
                                                <option value={size.id} key={size.id}>
                                                    {size.name}
                                                </option>
                                            ))
                                        }
                                </select>
                            </div>

                            <div className='col-md-4 mb-2'>
                                <div className='mb-2'>
                                    <span className='fw-bold'>
                                        Buscar producto:
                                    </span>
                                </div>
                                <form className='d-flex'>
                                    <input type="search" className='form-control me-2'
                                        value={searchTerm}
                                        disabled={selectColor || selectSize}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder='Busca...'
                                    />
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                {
                    message ?
                    <Alert type="primary" content={message}/>
                    :
                    loading ?
                    <Spinner/>
                    :
                    <ProductosList productos={productos}/>
                }                                    
               
            </div>
        </div>
       
    )
}
