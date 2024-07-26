import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "react-hot-toast";


const josefin = Josefin_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'khit and beads',
  description: 'Art Shop Called Artistry Market',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider className="bg-[#F2E5D8]">
    <html lang="en" className="bg-[#F2E5D8]">
      <body className={josefin.className}>
      <Toaster position="bottom-center " />
        {children}
       
      </body>
    </html>
    </ClerkProvider>
  )
}
