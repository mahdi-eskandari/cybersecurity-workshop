import React from 'react'

export default function LoginFormLayout({children}) {
  return (
        <div className="flex flex-col gap-4 rounded-xl p-6 w-full items-center mt-[120px]">
      {children}
    </div>
      )
}
