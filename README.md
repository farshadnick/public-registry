# 🚀 رجیستری خصوصی - Private Package Registry

یک راه‌حل یکپارچه و حرفه‌ای برای مدیریت پکیج‌های Docker، NPM، PyPI و سایر فرمت‌ها با استفاده از Nexus Repository Manager.

## ✨ ویژگی‌ها

- 🐳 **رجیستری Docker** - میزبانی و مدیریت تصاویر Docker
- 📦 **رجیستری NPM** - پکیج‌های Node.js و JavaScript
- 🐍 **رجیستری PyPI** - پکیج‌های Python
- 📚 **رجیستری‌های دیگر** - Maven, Gradle, NuGet, RubyGems, Go و...
- 🔒 **امنیت بالا** - احراز هویت و کنترل دسترسی پیشرفته
- ⚡ **کش هوشمند** - کاهش زمان دانلود و افزایش سرعت
- 📊 **گزارش‌گیری** - آمار و تحلیل جامع
- 🌐 **رابط کاربری فارسی** - صفحه معرفی زیبا به زبان فارسی

## 📋 پیش‌نیازها

- Docker (نسخه 20.10 یا بالاتر)
- Docker Compose (نسخه 2.0 یا بالاتر)
- حداقل 4GB RAM
- حداقل 20GB فضای دیسک

## 🚀 نصب و راه‌اندازی

### 1. دانلود پروژه

\`\`\`bash
git clone <repository-url>
cd "public registry"
\`\`\`

### 2. کپی فایل محیطی

\`\`\`bash
cp .env.example .env
\`\`\`

سپس فایل `.env` را ویرایش کنید و مقادیر مورد نیاز را تنظیم کنید.

### 3. راه‌اندازی سرویس‌ها

\`\`\`bash
docker-compose up -d
\`\`\`

### 4. دریافت رمز عبور اولیه

پس از راه‌اندازی، رمز عبور اولیه admin در فایل زیر قرار دارد:

\`\`\`bash
docker exec nexus-registry cat /nexus-data/admin.password
\`\`\`

### 5. دسترسی به سرویس‌ها

- **صفحه اصلی (Landing)**: http://localhost:3000
- **پنل مدیریت Nexus**: http://localhost:8081
- **رجیستری Docker**: http://localhost:8082
- **رجیستری NPM**: http://localhost:8084
- **رجیستری PyPI**: http://localhost:8085

## 🔧 پیکربندی

### پیکربندی Docker

#### 1. اضافه کردن Insecure Registry (برای محیط توسعه)

در فایل `/etc/docker/daemon.json`:

\`\`\`json
{
  "insecure-registries": ["localhost:8082"]
}
\`\`\`

سپس Docker را ریستارت کنید:

\`\`\`bash
sudo systemctl restart docker
\`\`\`

#### 2. ورود به رجیستری

\`\`\`bash
docker login localhost:8082
# نام کاربری: admin
# رمز عبور: رمزی که از فایل admin.password دریافت کردید
\`\`\`

#### 3. استفاده

\`\`\`bash
# تگ‌گذاری تصویر
docker tag myapp:latest localhost:8082/myapp:latest

# ارسال به رجیستری
docker push localhost:8082/myapp:latest

# دریافت از رجیستری
docker pull localhost:8082/myapp:latest
\`\`\`

### پیکربندی NPM

#### 1. تنظیم رجیستری

\`\`\`bash
npm config set registry http://localhost:8084/repository/npm-group/
\`\`\`

یا با استفاده از فایل `.npmrc` در ریشه پروژه:

\`\`\`
registry=http://localhost:8084/repository/npm-group/
\`\`\`

#### 2. انتشار پکیج

\`\`\`bash
npm publish --registry http://localhost:8084/repository/npm-hosted/
\`\`\`

### پیکربندی PyPI

#### 1. تنظیم pip

در فایل `~/.pip/pip.conf` (Linux/Mac) یا `%APPDATA%\pip\pip.ini` (Windows):

\`\`\`ini
[global]
index-url = http://localhost:8085/repository/pypi-group/simple
trusted-host = localhost
\`\`\`

#### 2. نصب پکیج

\`\`\`bash
pip install mypackage
\`\`\`

#### 3. انتشار پکیج

با استفاده از `twine`:

\`\`\`bash
pip install twine
twine upload --repository-url http://localhost:8085/repository/pypi-hosted/ dist/*
\`\`\`

## 🏗️ ساختار پروژه

\`\`\`
public-registry/
├── docker-compose.yml          # تنظیمات Docker Compose
├── .env.example                # نمونه فایل محیطی
├── nginx/
│   ├── nginx.conf              # پیکربندی Nginx
│   └── ssl/                    # گواهی SSL (اختیاری)
└── landing/                    # صفحه معرفی
    ├── app/                    # Next.js App Directory
    ├── components/             # کامپوننت‌های React
    ├── package.json
    ├── Dockerfile
    └── ...
\`\`\`

## 🔐 امنیت

### توصیه‌های امنیتی

1. **تغییر رمز عبور پیش‌فرض**: حتماً پس از اولین ورود، رمز عبور admin را تغییر دهید
2. **استفاده از HTTPS**: در محیط تولید حتماً از HTTPS استفاده کنید
3. **محدود کردن دسترسی**: دسترسی به پورت‌های Nexus را محدود کنید
4. **بکاپ منظم**: از داده‌های Nexus به صورت منظم بکاپ بگیرید
5. **به‌روزرسانی**: Nexus را به‌روز نگه دارید

### تنظیم SSL

برای استفاده از SSL، فایل‌های گواهی را در `nginx/ssl/` قرار دهید و فایل `nginx.conf` را بر اساس نیاز خود ویرایش کنید.

## 📊 مدیریت و نگهداری

### مشاهده لاگ‌ها

\`\`\`bash
# لاگ‌های Nexus
docker-compose logs -f nexus

# لاگ‌های صفحه معرفی
docker-compose logs -f landing

# لاگ‌های Nginx
docker-compose logs -f nginx
\`\`\`

### بکاپ

\`\`\`bash
# بکاپ از volume داده‌های Nexus
docker run --rm -v public-registry_nexus-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/nexus-backup-$(date +%Y%m%d).tar.gz /data
\`\`\`

### ریستور

\`\`\`bash
# ریستور بکاپ
docker run --rm -v public-registry_nexus-data:/data -v $(pwd):/backup \
  alpine tar xzf /backup/nexus-backup-YYYYMMDD.tar.gz -C /
\`\`\`

### توقف و حذف

\`\`\`bash
# توقف سرویس‌ها
docker-compose down

# توقف و حذف volume‌ها (احتیاط: تمام داده‌ها پاک می‌شود!)
docker-compose down -v
\`\`\`

## 🛠️ توسعه صفحه معرفی

### نصب وابستگی‌ها

\`\`\`bash
cd landing
npm install
\`\`\`

### اجرای محیط توسعه

\`\`\`bash
npm run dev
\`\`\`

صفحه در آدرس http://localhost:3000 در دسترس خواهد بود.

### بیلد برای تولید

\`\`\`bash
npm run build
npm start
\`\`\`

## 📚 منابع و مستندات

- [مستندات Nexus Repository Manager](https://help.sonatype.com/repomanager3)
- [Docker Registry Documentation](https://docs.docker.com/registry/)
- [NPM Registry Documentation](https://docs.npmjs.com/cli/v8/using-npm/registry)
- [PyPI Documentation](https://packaging.python.org/en/latest/guides/hosting-your-own-index/)

## 🤝 مشارکت

برای مشارکت در پروژه:

1. Fork کنید
2. برنچ جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request باز کنید

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 💬 پشتیبانی

برای سوالات و مشکلات:

- ایجاد Issue در GitHub
- ارسال ایمیل به support@example.com

## 🙏 تشکر

- [Sonatype Nexus](https://www.sonatype.com/products/nexus-repository) - Repository Manager
- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Lucide Icons](https://lucide.dev/) - Icon Library
- [Vazir Font](https://github.com/rastikerdar/vazir-font) - فونت فارسی

---

<div align="center">
  ساخته شده با ❤️ برای جامعه توسعه‌دهندگان ایران
</div>

