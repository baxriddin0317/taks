import React from 'react'
import Navigation from './Navigation'

const AppLayout = ({children}) => {
  return (
    <>
    <Navigation />
      <main>
        {children}
      </main>
    </>
  )
}

export default AppLayout