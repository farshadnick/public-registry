'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const quickStartCommands = [
  {
    title: 'استفاده از Docker Registry',
    commands: [
      '# ورود به رجیستری',
      'docker login docker.adlas.cloud',
      '',
      '# دانلود image',
      'docker pull docker.adlas.cloud/nginx:latest',
      '',
      '# آپلود image',
      'docker tag myapp:latest docker.adlas.cloud/myapp:latest',
      'docker push docker.adlas.cloud/myapp:latest',
    ],
  },
  {
    title: 'استفاده از NPM Registry',
    commands: [
      '# تنظیم یکبار رجیستری NPM',
      'npm config set registry https://npm.adlas.cloud',
      '',
      '# حالا می‌توانید مثل همیشه از npm استفاده کنید',
      'npm install express',
      'npm install -g typescript',
      '',
      '# یا در فایل .npmrc پروژه',
      'echo "registry=https://npm.adlas.cloud" > .npmrc',
    ],
  },
  {
    title: 'استفاده از PyPI Registry',
    commands: [
      '# تنظیم یکبار pip',
      'pip config set global.index-url https://pip.adlas.cloud',
      '',
      '# حالا می‌توانید مثل همیشه از pip استفاده کنید',
      'pip install django',
      'pip install requests pandas numpy',
      '',
      '# یا در فایل pip.conf',
      'echo "[global]\\nindex-url = https://pip.adlas.cloud" > ~/.pip/pip.conf',
    ],
  },
  {
    title: 'استفاده در پروژه‌ها',
    commands: [
      '# Docker Compose',
      'services:',
      '  app:',
      '    image: docker.adlas.cloud/node:18',
      '',
      '# package.json scripts',
      '"scripts": {',
      '  "install": "npm install --registry=https://npm.adlas.cloud"',
      '}',
    ],
  },
]

export default function QuickStart() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section id="quick-start" className="py-24 sm:py-32 px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            راه‌اندازی سریع
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            دستورات لازم برای شروع کار با رجیستری خصوصی
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {quickStartCommands.map((section, sectionIndex) => (
            <div
              key={section.title}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 p-6 shadow-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-primary-500 via-purple-500 to-pink-500"></div>
              
              <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                {section.title}
                <button
                  onClick={() => copyToClipboard(section.commands.filter(cmd => !cmd.startsWith('#')).join('\n'), sectionIndex)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="کپی کردن"
                >
                  {copiedIndex === sectionIndex ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </h3>

              <div className="relative rounded-lg bg-black/30 p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-gray-300 leading-relaxed">
                  {section.commands.map((cmd, idx) => (
                    <div key={idx} className={cmd.startsWith('#') ? 'text-green-400 mt-2' : cmd === '' ? 'h-2' : 'text-gray-300'}>
                      {cmd || ' '}
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              همین حالا شروع کنید!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              تنها کافیست رجیستری پیش‌فرض ابزار خود را تغییر دهید و از دسترسی بدون محدودیت به تمام پکیج‌ها لذت ببرید.
              دیگر نیازی به VPN یا تنظیمات پیچیده نیست.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#registries"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:from-primary-500 hover:to-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200 hover:scale-105"
              >
                مشاهده رجیستری‌ها
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

