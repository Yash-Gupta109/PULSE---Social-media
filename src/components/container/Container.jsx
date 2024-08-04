import React from 'react'

function Container({children}) {
    // if in our return statement there is only one line so we can remove () as we do in if and else as it is 
    return (
        <div className='w-full max-w-7xl mx-auto px-4'>
            {children}
        </div>
    )
}

export default Container


// container accepts properties as a children
// container is a box jiske upar aur niche kuch hota hai