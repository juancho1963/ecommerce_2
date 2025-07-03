import React, { useEffect, useState } from 'react'
import ProductosList from './productos/ProductosList'
import { axiosRequest } from './helpers/config'

export default function Home() {
        const [productos, setProductos] = useState([])
        const [colors, setColors] = useState([])
        const [sizes, setSizes] = useState([])
        const [loading, setLoading] = useState(false)

        useEffect(() =>{
            const fetchAllProductos = async () => {
                try {
                    const response = await axiosRequest.get('productos')
                    setProductos(response.data.data)
                    setColors(response.data.colors)
                    setSizes(response.data.sizes)
                } catch (error) {
                   console.log(error) 
                }
            }
            fetchAllProductos()
        })

    return (
        <ProductosList productos={productos}/>
    )
}