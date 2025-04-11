import { House, Logout } from '@mui/icons-material'
import Link from 'next/link'
import React from 'react'

function Nav() {
  return (
    <nav className="text-white p-4">
        <Link href={'/'} className="flex">
            <House/>
        </Link>
        <Link href="href"><Logout/> Log Out</Link>
    </nav>
  )
}

export default Nav