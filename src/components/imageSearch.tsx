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

function getNiceImages(responseText: string): PixabayImageJSON[] {
    console.log(responseText);
    
    const responseJSON: PixabayResponse = JSON.parse(responseText)
    return responseJSON.hits
}

export default function ImageSearch() {
    const [images, setImages] = useState<PixabayImageJSON[]>([])
    const [showImageDetails, setShowImageDetails] = useState<Boolean>(false)

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault()

        fetch(PIXABAY_BASE_URL + new URLSearchParams({
            key: PIXABAY_API_KEY,
            q: e.currentTarget.value,
        }))
        .then((response) => response.text())
        .then((responseText) => setImages(getNiceImages(responseText)))
    }

    const imageListItems = images ? images.map(image => 
        <li className='list-image-none' key={image.id}>
            <img src={image.previewURL} />
        </li>
    ) : <label></label>

    return (
        <>
            <div>
                <label className='underline'>Image Search</label>
                <input
                    type='search'
                    id='imageSearchQuery'
                    placeholder='What kind of image are you looking for?'
                    onChange={handleChange}
                />
                <ul className='list-image-none'>
                    {imageListItems}
                </ul>
            </div>
        </>
    )
}