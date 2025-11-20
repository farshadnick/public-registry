'use client'

import { Container, Package, Box, Layers } from 'lucide-react'

const registries = [
  {
    name: 'Docker Registry',
    description: 'مدیریت و ذخیره‌سازی تصاویر Docker با امکان ایجاد رجیستری‌های متعدد',
    icon: Container,
    color: 'from-blue-600 to-cyan-600',
    port: 'docker.adlas.cloud',
    examples: [
      'docker login docker.adlas.cloud',
      'docker push docker.adlas.cloud/myapp:latest',
    ],
  },
  {
    name: 'NPM Registry',
    description: 'دسترسی آزاد به پکیج‌های Node.js و JavaScript بدون محدودیت',
    icon: Package,
    color: 'from-red-600 to-pink-600',
    port: 'npm.adlas.cloud',
    examples: [
      'npm config set registry https://npm.adlas.cloud',
      'npm install express',
    ],
  },
  {
    name: 'PyPI Registry',
    description: 'دسترسی آزاد به پکیج‌های Python بدون فیلترینگ',
    icon: Box,
    color: 'from-yellow-600 to-orange-600',
    port: 'pip.adlas.cloud',
    examples: [
      'pip config set global.index-url https://pip.adlas.cloud',
      'pip install django',
    ],
  },
  {
    name: 'سایر فرمت‌ها',
    description: 'Maven، Gradle، NuGet، RubyGems، Go Modules و بسیاری دیگر',
    icon: Layers,
    color: 'from-purple-600 to-indigo-600',
    port: '8081',
    examples: [
      'Maven, Gradle, NuGet',
      'RubyGems, Go Modules, Helm',
    ],
  },
]

export default function RegistryTypes() {
  return (
    <section id="registries" className="py-24 sm:py-32 px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            رجیستری‌های در دسترس
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            دسترسی آزاد به تمام پکیج‌های محبوب بدون فیلتر و محدودیت
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {registries.map((registry) => (
            <div
              key={registry.name}
              className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Gradient border effect */}
              <div className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-l ${registry.color}`}></div>
              
              <div className="flex items-start gap-6">
                <div className={`flex-shrink-0 rounded-2xl bg-gradient-to-br ${registry.color} p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <registry.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {registry.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {registry.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">پورت:</span>
                      <code className="text-sm bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-lg text-primary-600 dark:text-primary-400 font-mono">
                        {registry.port}
                      </code>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-4 space-y-2">
                      {registry.examples.map((example, idx) => (
                        <code
                          key={idx}
                          className="block text-xs text-gray-700 dark:text-gray-300 font-mono break-all"
                        >
                          {example}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

