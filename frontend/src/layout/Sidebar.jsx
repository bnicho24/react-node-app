import React from 'react'

const Sidebar = () => {
  return (
    <div className='sidebar bg-success-subtle'>
        <ul className="menu-list">
            <li>
              <a href="/dashboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <mask
                    id="mask0_446_7"
                  style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <rect width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_446_7)">
                    <path
                      d="M13.25 9V3.5H20.5V9H13.25ZM3.5 12.5V3.5H10.75V12.5H3.5ZM13.25 20.5V11.5H20.5V20.5H13.25ZM3.5 20.5V15H10.75V20.5H3.5ZM5 11H9.25V5H5V11ZM14.75 19H19V13H14.75V19ZM14.75 7.5H19V5H14.75V7.5ZM5 19H9.25V16.5H5V19Z"
                      fill="#1C1B1F"
                    />
                  </g>
                </svg>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/products">
                <svg
                    width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round" aria-label="Product"
                >
                    <path d="M21 16V8a2 2 0 0 0-1.2-1.84l-6-2.67a2 2 0 0 0-1.6 0l-6 2.67A2 2 0 0 0 5 8v8a2 2 0 0 0 1.2 1.84l6 2.67a2 2 0 0 0 1.6 0l6-2.67A2 2 0 0 0 21 16Z" />
                    <path d="M3.3 7.3L12 11l8.7-3.7" />
                    <path d="M12 22V11" />
                </svg>
                <span>Products</span>
              </a>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar