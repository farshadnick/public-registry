'use client'

import { Package, Github, Mail, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg bg-gradient-to-br from-primary-600 to-purple-600 p-2">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Adlas Registry
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
              پروکسی رجیستری برای دسترسی آزاد و بدون محدودیت به تمام پکیج‌های Docker، NPM، PyPI و سایر منابع.
              ویژه توسعه‌دهندگان ایرانی. رایگان و همیشه در دسترس.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              لینک‌های مفید
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  ویژگی‌ها
                </a>
              </li>
              <li>
                <a href="#registries" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  رجیستری‌ها
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  نحوه استفاده
                </a>
              </li>
              <li>
                <a href="#quick-start" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  شروع سریع
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              رجیستری‌ها
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#registries" 
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Docker Registry
                </a>
              </li>
              <li>
                <a 
                  href="#registries" 
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  NPM Registry
                </a>
              </li>
              <li>
                <a 
                  href="#registries"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  PyPI Registry
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              ساخته شده با
              <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
              توسط تیم شما
            </p>
            
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@example.com"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

