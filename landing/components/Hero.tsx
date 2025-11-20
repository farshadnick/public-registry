'use client'

import { Package, Shield, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
          <div className="absolute top-20 right-0 w-72 h-72 bg-primary-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 left-20 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl text-center">
        <div className="flex justify-center mb-8">
          <div className="relative rounded-full px-6 py-2 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-100/10">
            راهکار دسترسی آزاد برای توسعه‌دهندگان ایرانی
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6">
          دسترسی آزاد به{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
            تمام پکیج‌ها
          </span>
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          پروکسی رجیستری برای دسترسی بدون محدودیت به پکیج‌های Docker، NPM، PyPI و سایر منابع. 
          دیگر نگران فیلترینگ و محدودیت‌های اینترنتی نباشید.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#quick-start"
            className="rounded-full bg-primary-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200 hover:scale-105"
          >
            شروع سریع
          </a>
          <a
            href="#registries"
            className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-primary-600 transition-colors"
          >
            مشاهده رجیستری‌ها <span aria-hidden="true">←</span>
          </a>
        </div>

        {/* Feature badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Shield className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium">امنیت بالا</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Zap className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium">سرعت بالا</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Package className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium">پشتیبانی کامل</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}

