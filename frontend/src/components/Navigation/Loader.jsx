import React from 'react'
import { BeatLoader } from 'react-spinners';
function Loader() {
    return (
        <>
            <span>Loading </span>
            <BeatLoader color="#212121" />
        </>
    )
}

export default Loader