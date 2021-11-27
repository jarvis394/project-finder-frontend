import React, { SVGProps } from 'react'

const Wifi: React.FC<SVGProps<SVGSVGElement>> = ({ children, ...props }) => {
  return (
    <svg
      width="22"
      height="19"
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.99 7.21C18.15 3.37 12.8 1.97 7.84 2.99L10.36 5.51C13.83 5.34 17.35 6.56 19.99 9.21L21.99 7.21ZM17.99 11.21C16.7 9.92 15.15 9.08 13.5 8.65L17.03 12.18L17.99 11.21ZM1 1.26L4.07 4.31C2.6 5.03 1.22 5.99 0 7.21L1.99 9.21C3.23 7.97 4.66 7.05 6.19 6.44L8.43 8.68C6.81 9.1 5.27 9.94 4 11.21V11.22L5.99 13.21C7.35 11.85 9.13 11.17 10.91 11.15L17.98 18.21L19.25 16.95L2.29 0L1 1.26ZM8 15.21L11 18.21L14 15.21C12.35 13.55 9.66 13.55 8 15.21Z"
        fill="#FF1744"
      />
    </svg>
  )
}

export default React.memo(Wifi)
