import React from 'react'
// making a custom button

function Button({
    // which proprertypes our custom button can take
    children,
    type ='button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = "",
    // if user will give any additional properties
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {/* // we can use anything over here not just children that is just a word */}
            {children}
        </button>
    )
}


export default Button


// forwordRef hook 
// many time happen like we have a form and the state of user like one input box is diiferent from another and a login button
// but wherever our page will be there input will be combine and there we need the access of there state because whatevere components we will make separately 
// we will keep state there because that is an indivisual componant so component si somewhere else and use kahi ho rha hai so agar components yaha hai to uski state yahi honi chahiye thi
// so we need that reference that's why we use this hook