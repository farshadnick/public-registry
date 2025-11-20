'use client'

import { Shield, Zap, Lock, Users, BarChart3, RefreshCw, Cloud, CheckCircle2 } from 'lucide-react'

const features = [
  {
    name: 'دسترسی بدون محدودیت',
    description: 'دانلود پکیج‌ها بدون نگرانی از فیلترینگ و محدودیت‌های شبکه',
    icon: Shield,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'سرعت بالا',
    description: 'سرورهای داخلی با کش هوشمند برای دانلود سریع‌تر پکیج‌ها',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'اتصال پایدار',
    description: 'دسترسی مداوم و پایدار به تمام منابع بدون قطعی',
    icon: Lock,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'پشتیبانی کامل',
    description: 'پشتیبانی از تمام Package Manager های محبوب',
    icon: Users,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'بدون تنظیمات پیچیده',
    description: 'تنها با یک دستور ساده، رجیستری را تغییر دهید',
    icon: BarChart3,
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    name: 'همیشه آنلاین',
    description: 'سرویس 24/7 با آپتایم بالا و قابلیت اطمینان',
    icon: RefreshCw,
    gradient: 'from-red-500 to-pink-500',
  },
  {
    name: 'رایگان و آزاد',
    description: 'استفاده کاملا رایگان برای تمام توسعه‌دهندگان ایرانی',
    icon: Cloud,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'سازگار با همه ابزارها',
    description: 'سازگار با تمام ابزارهای توسعه و سیستم‌های CI/CD',
    icon: CheckCircle2,
    gradient: 'from-teal-500 to-green-500',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            چرا از ما استفاده کنید؟
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            راهکار ساده و موثر برای دسترسی به پکیج‌ها بدون محدودیت
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative">
                <div className={`inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3 shadow-lg mb-5`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

