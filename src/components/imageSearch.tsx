import React, { useState } from "react"
import { PIXABAY_API_KEY, PIXABAY_BASE_URL } from "../constants"

type PixabayImageJSON = {
    id: number,
	pageURL: string,
	type: string,
	tags: string,
	previewURL: string,
	previewWidth: number,
	previewHeight: number,
	webformatURL: string,
	webformatWidth: number,
	webformatHeight: number,
	largeImageURL: string,
	fullHDURL: string,
	imageURL: string,
	imageWidth: number,
	imageHeight: number,
	imageSize: number,
	views: number,
	downloads: number,
	likes: number,
	comments: number,
	user_id: number,
	user: string,
    userImageURL: string,
}

type PixabayResponse = {
    total: number,
    totalHits: number,
    hits: PixabayImageJSON[],
}

export default function ImageSearch() {
    const [images, setImages] = useState<PixabayImageJSON[]>([])
    const [showImageDetails, setShowImageDetails] = useState<Boolean>(false)
    const [modalImage, setModalImage] = useState<PixabayImageJSON>()

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault()
        fetch(PIXABAY_BASE_URL + new URLSearchParams({
            key: PIXABAY_API_KEY,
            q: e.currentTarget.value,
        }))
        .then((response) => response.text())
        .then((responseText) => {
            setImages((JSON.parse(responseText) as PixabayResponse).hits)
        })
    }

    function openModal(image: PixabayImageJSON) {
        return (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault()
        setShowImageDetails(true)
        setModalImage(image)
    }}

    function closeModal(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setShowImageDetails(false)
    }

    const imageListItems = images ? images.map(image => 
        <li className='list-image-none' key={image.id}>
            <img src={image.previewURL} onClick={openModal(image)} />
        </li>
    ) : <label></label>

    const imageDetailsModal = (
        <div>
            <img src={modalImage?.webformatURL} />
            <p>
                This image was posted by {modalImage?.user}
                <br />
                Tags: {modalImage?.tags}
            </p>
            <button onClick={closeModal}>Close details</button>
        </div>
    )

    return (
        <>
            <div>
                <h3 className='underline'>Image {showImageDetails ? 'Details' : 'Search'}</h3>
                {showImageDetails ?
                imageDetailsModal : 
                (
                    <>
                        <input
                            type='search'
                            id='imageSearchQuery'
                            placeholder='What kind of image are you looking for?'
                            onChange={handleChange}
                        />
                        <ul className='list-image-none'>
                            {imageListItems}
                        </ul>
                    </>
                )}
            </div>
        </>
    )
}