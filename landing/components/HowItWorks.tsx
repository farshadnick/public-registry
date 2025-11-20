'use client'

import { Download, Upload, Settings, CheckCircle } from 'lucide-react'

const steps = [
  {
    name: 'انتخاب رجیستری',
    description: 'رجیستری مورد نظر خود را انتخاب کنید: Docker، NPM، PyPI یا سایر موارد',
    icon: Download,
    step: 1,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    name: 'تغییر تنظیمات',
    description: 'با یک دستور ساده، آدرس رجیستری پیش‌فرض را تغییر دهید',
    icon: Settings,
    step: 2,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    name: 'دانلود و استفاده',
    description: 'مثل همیشه از ابزارهای خود استفاده کنید، بدون محدودیت',
    icon: CheckCircle,
    step: 3,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    name: 'لذت ببرید!',
    description: 'دیگر نگران فیلترینگ و قطعی نباشید، همه چیز در دسترس شماست',
    icon: Upload,
    step: 4,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            چگونه کار می‌کند؟
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            در چند مرحله ساده، رجیستری خصوصی خود را راه‌اندازی کنید
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-12 right-0 left-0 h-0.5 bg-gradient-to-l from-green-500 via-purple-500 to-blue-500 opacity-20 hidden lg:block"></div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.name} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full ${step.bgColor} shadow-lg mb-6`}>
                    <step.icon className={`h-10 w-10 ${step.color}`} />
                    <div className="absolute -bottom-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-purple-500 text-white text-sm font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-6 lg:hidden">
                    <svg className="w-6 h-6 text-gray-400 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

