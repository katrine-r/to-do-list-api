import React from "react"

const SortAlphabeticalAscendingIcon = ({ fill = "#5B5D72" }) => {
    return (
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M19 17H22L18 21L14 17H17V3H19V17ZM11 13V15L7.67 19H11V21H5V19L8.33 15H5V13H11ZM9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 4.46957 10.7893 3.96086 10.4142 3.58579C10.0391 3.21071 9.53043 3 9 3ZM9 7H7V5H9V7Z" 
                fill={fill}
            />
        </svg>
    )
}

export default SortAlphabeticalAscendingIcon