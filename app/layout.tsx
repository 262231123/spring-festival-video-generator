import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: '春节拜年视频生成器',
  description: '上传照片，选择风格，生成专属春节拜年视频',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
