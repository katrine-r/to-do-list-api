import React from "react"

const SortActiveIcon = ({ fill = "#5B5D72" }) => {
    return (
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                d="M19 17H22L18 21L14 17H17V3H19V17ZM7 3C4.79 3 3 4.79 3 7C3 9.21 4.79 11 7 11C9.21 11 11 9.21 11 7C11 4.79 9.21 3 7 3ZM7 9C5.9 9 5 8.1 5 7C5 5.9 5.9 5 7 5C8.1 5 9 5.9 9 7C9 8.1 8.1 9 7 9ZM7 13C4.79 13 3 14.79 3 17C3 19.21 4.79 21 7 21C9.21 21 11 19.21 11 17C11 14.79 9.21 13 7 13Z" 
                fill={fill}
            />
        </svg>
    )
}

export default SortActiveIcon