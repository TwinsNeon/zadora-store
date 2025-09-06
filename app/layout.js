
export const metadata = {
  title: 'ZADORA Store',
  description: 'B2B Homeware Wholesale Storefront',
}

import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
