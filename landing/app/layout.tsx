import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'رجیستری پروکسی - دسترسی آزاد به تمام پکیج‌ها',
  description: 'پروکسی رجیستری برای دسترسی بدون محدودیت به Docker، NPM، PyPI و سایر پکیج‌ها. ویژه توسعه‌دهندگان ایرانی',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="font-vazir antialiased">{children}</body>
    </html>
  )
}

