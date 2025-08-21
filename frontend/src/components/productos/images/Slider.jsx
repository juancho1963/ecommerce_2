import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

export default function Slider({producto}) {
        const [images, setImages] = useState([])
        const [loaded, setLoaded] = useState(false)

        useEffect(() => {
           handleProductoImages ()
        },[])

        const handleProductoImages = () => {
            let updateImages = [
                {
                    original: producto?.first_image,
                    thumbnail: producto?.first_image,
                }
            ]
            if (producto?.second_image){
                updateImages = [
                    ...updateImages, {
                        original: producto?.second_image,
                        thumbnail: producto?.second_image,
                    }
                ]
            }
            if (producto?.third_image){
                updateImages = [
                    ...updateImages, {
                        original: producto?.third_image,
                        thumbnail: producto?.third_image,
                    }
                ]
            }
            setImages(updateImages)
            setLoaded(true)
        }
    return (
        <ImageGallery
            showPlayButton={loaded}
            showFullscreenButton={loaded}
            items={images}
        />
    )
}