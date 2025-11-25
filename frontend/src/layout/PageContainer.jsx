import React from 'react'
import { Outlet } from 'react-router-dom'

const PageContainer = () => {
  return (
    <div className="page-container p-3">
      <Outlet />
    </div>
  )
}

export default PageContainer