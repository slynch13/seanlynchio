import React from "react"
import { Link } from "gatsby"


let Badge = ({ children }) =>
    <span class="inline-flex items-center px-2.5  mx-1 py-0.5 rounded-full text-xs font-medium leading-4 bg-cyan-900 text-gray-50">
        {children}
    </span>

export default Badge
