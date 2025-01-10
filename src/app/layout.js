import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Cricket Hub',
  description: 'Live cricket scores and matches',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <Navbar />
        {children}
      </body>
    </html>
  )
}