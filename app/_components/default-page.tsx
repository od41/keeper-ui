import React from 'react'
import { Navbar } from './navbar'

const DefaultPage = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <Navbar />
            {children}
        </main>
    </div>
  )
}

export default DefaultPage