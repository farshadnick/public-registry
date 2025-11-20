# 📖 راهنمای راه‌اندازی کامل

این راهنما شما را گام به گام در فرآیند راه‌اندازی رجیستری خصوصی همراهی می‌کند.

## 🎯 مرحله 1: نصب پیش‌نیازها

### نصب Docker

#### Ubuntu/Debian
\`\`\`bash
# حذف نسخه‌های قدیمی
sudo apt-get remove docker docker-engine docker.io containerd runc

# نصب وابستگی‌ها
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release

# اضافه کردن GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# اضافه کردن repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# نصب Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
\`\`\`

#### CentOS/RHEL
\`\`\`bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo systemctl start docker
sudo systemctl enable docker
\`\`\`

#### macOS
\`\`\`bash
# با استفاده از Homebrew
brew install --cask docker

# یا دانلود از سایت رسمی
# https://www.docker.com/products/docker-desktop
\`\`\`

### تست نصب Docker
\`\`\`bash
docker --version
docker compose version
\`\`\`

## 🎯 مرحله 2: راه‌اندازی پروژه

### دانلود و آماده‌سازی

\`\`\`bash
# دانلود پروژه
git clone <repository-url>
cd "public registry"

# کپی فایل محیطی
cp .env.example .env

# ویرایش فایل .env (اختیاری)
nano .env
\`\`\`

### راه‌اندازی سرویس‌ها

\`\`\`bash
# اجرای سرویس‌ها در background
docker compose up -d

# مشاهده وضعیت سرویس‌ها
docker compose ps

# مشاهده لاگ‌ها
docker compose logs -f
\`\`\`

صبر کنید تا سرویس‌ها به طور کامل راه‌اندازی شوند (ممکن است چند دقیقه طول بکشد).

## 🎯 مرحله 3: پیکربندی اولیه Nexus

### 1. دسترسی به پنل مدیریت

مرورگر خود را باز کنید و به آدرس زیر بروید:
\`\`\`
http://localhost:8081
\`\`\`

### 2. دریافت رمز عبور اولیه

\`\`\`bash
docker exec nexus-registry cat /nexus-data/admin.password
\`\`\`

این دستور رمز عبور موقت را نمایش می‌دهد.

### 3. ورود اولیه

- نام کاربری: `admin`
- رمز عبور: رمزی که از دستور بالا دریافت کردید

### 4. تکمیل Setup Wizard

1. کلیک بر روی "Next"
2. رمز عبور جدیدی انتخاب کنید
3. در مورد Anonymous Access، بسته به نیاز خود تصمیم بگیرید:
   - **Enable**: اجازه دسترسی بدون احراز هویت (توصیه نمی‌شود)
   - **Disable**: نیاز به احراز هویت برای همه عملیات
4. بر روی "Finish" کلیک کنید

## 🎯 مرحله 4: ایجاد رجیستری‌ها

### ایجاد Docker Registry

#### 1. Docker Hosted Repository
1. به **Server administration and configuration** → **Repositories** بروید
2. روی **Create repository** کلیک کنید
3. **docker (hosted)** را انتخاب کنید
4. تنظیمات:
   - **Name**: `docker-hosted`
   - **HTTP**: `8082` (یا پورت دلخواه)
   - **Enable Docker V1 API**: غیرفعال (توصیه می‌شود)
   - **Deployment policy**: `Allow redeploy`
5. **Create repository** را کلیک کنید

#### 2. Docker Proxy Repository
1. **docker (proxy)** را انتخاب کنید
2. تنظیمات:
   - **Name**: `docker-proxy`
   - **Remote storage**: `https://registry-1.docker.io`
   - **Docker Index**: `Use Docker Hub`
3. **Create repository** را کلیک کنید

#### 3. Docker Group Repository
1. **docker (group)** را انتخاب کنید
2. تنظیمات:
   - **Name**: `docker-group`
   - **HTTP**: `8083`
   - **Member repositories**: `docker-hosted` و `docker-proxy` را اضافه کنید
3. **Create repository** را کلیک کنید

### ایجاد NPM Registry

#### 1. NPM Hosted
1. **npm (hosted)** را انتخاب کنید
2. **Name**: `npm-hosted`
3. **Create repository**

#### 2. NPM Proxy
1. **npm (proxy)** را انتخاب کنید
2. **Name**: `npm-proxy`
3. **Remote storage**: `https://registry.npmjs.org`
4. **Create repository**

#### 3. NPM Group
1. **npm (group)** را انتخاب کنید
2. **Name**: `npm-group`
3. Members: `npm-hosted` و `npm-proxy`
4. **Create repository**

### ایجاد PyPI Registry

مشابه NPM، برای PyPI نیز سه repository ایجاد کنید:
- **pypi (hosted)**: `pypi-hosted`
- **pypi (proxy)**: `pypi-proxy` با Remote storage: `https://pypi.org`
- **pypi (group)**: `pypi-group`

## 🎯 مرحله 5: پیکربندی Realms و Security

### فعال‌سازی Realms

1. به **Security** → **Realms** بروید
2. Realms زیر را فعال کنید:
   - **npm Bearer Token Realm**
   - **Docker Bearer Token Realm**
   - **PyPI Bearer Token Realm** (اگر وجود دارد)
3. **Save** کنید

### ایجاد User و Role

#### ایجاد Role
1. به **Security** → **Roles** بروید
2. **Create role** → **Nexus role**
3. مثال:
   - **Role ID**: `developer`
   - **Role name**: `Developer`
   - **Privileges**: انتخاب دسترسی‌های مورد نیاز

#### ایجاد User
1. به **Security** → **Users** بروید
2. **Create local user**
3. مثال:
   - **ID**: `developer1`
   - **First name**: `Dev`
   - **Last name**: `User`
   - **Email**: `dev@example.com`
   - **Password**: رمز دلخواه
   - **Status**: `Active`
   - **Roles**: `developer`

## 🎯 مرحله 6: تست رجیستری‌ها

### تست Docker Registry

\`\`\`bash
# اضافه کردن insecure registry
# فایل /etc/docker/daemon.json را ویرایش کنید:
{
  "insecure-registries": ["localhost:8082", "localhost:8083"]
}

# ریستارت Docker
sudo systemctl restart docker

# ورود
docker login localhost:8082
# Username: admin یا developer1
# Password: رمز عبوری که تنظیم کردید

# تست push
docker pull alpine:latest
docker tag alpine:latest localhost:8082/alpine:test
docker push localhost:8082/alpine:test

# تست pull
docker pull localhost:8082/alpine:test
\`\`\`

### تست NPM Registry

\`\`\`bash
# تنظیم registry
npm config set registry http://localhost:8081/repository/npm-group/

# برای publish
npm login --registry http://localhost:8081/repository/npm-hosted/
# Username: admin یا developer1
# Password: رمز عبور
# Email: ایمیل شما

# تست install
npm install express
\`\`\`

### تست PyPI Registry

\`\`\`bash
# تنظیم pip
mkdir -p ~/.pip
cat > ~/.pip/pip.conf << EOF
[global]
index-url = http://localhost:8081/repository/pypi-group/simple
trusted-host = localhost
EOF

# تست install
pip install requests
\`\`\`

## 🎯 مرحله 7: دسترسی به صفحه معرفی

مرورگر خود را باز کنید و به آدرس زیر بروید:
\`\`\`
http://localhost:3000
\`\`\`

صفحه معرفی فارسی با تمام ویژگی‌ها و راهنماها نمایش داده می‌شود.

## 🎯 مرحله 8: پیکربندی برای محیط Production

### استفاده از Domain و SSL

1. فایل `nginx/nginx.conf` را ویرایش کنید
2. گواهی SSL خود را در `nginx/ssl/` قرار دهید
3. فایل `.env` را بروزرسانی کنید:
   \`\`\`
   DOMAIN=registry.yourdomain.com
   SSL_ENABLED=true
   \`\`\`

### محدود کردن دسترسی

در `docker-compose.yml`، پورت‌های Nexus را به localhost محدود کنید:
\`\`\`yaml
ports:
  - "127.0.0.1:8081:8081"
  - "127.0.0.1:8082:8082"
\`\`\`

### بکاپ خودکار

اسکریپت زیر را برای بکاپ روزانه استفاده کنید:

\`\`\`bash
#!/bin/bash
BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y%m%d-%H%M%S)

docker run --rm \
  -v public-registry_nexus-data:/data \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/nexus-$DATE.tar.gz /data

# حذف بکاپ‌های قدیمی‌تر از 30 روز
find $BACKUP_DIR -name "nexus-*.tar.gz" -mtime +30 -delete
\`\`\`

با cron تنظیم کنید:
\`\`\`bash
crontab -e
# اضافه کردن خط زیر برای بکاپ روزانه در ساعت 2 صبح
0 2 * * * /path/to/backup-script.sh
\`\`\`

## ❓ عیب‌یابی مشکلات متداول

### Nexus راه‌اندازی نمی‌شود
- بررسی لاگ‌ها: `docker compose logs nexus`
- بررسی منابع سیستم (حداقل 4GB RAM نیاز است)
- بررسی فضای دیسک

### خطای Connection Refused
- اطمینان از راه‌اندازی کامل سرویس‌ها
- بررسی پورت‌ها: `docker compose ps`
- بررسی فایروال

### خطای Authentication
- بررسی صحت نام کاربری و رمز عبور
- بررسی فعال بودن Realm مربوطه
- بررسی دسترسی‌های User

### مشکل در Push/Pull
- بررسی پیکربندی Insecure Registry
- بررسی دسترسی‌های Repository
- بررسی لاگ‌های Nexus

## 📞 دریافت کمک

اگر با مشکلی مواجه شدید:
1. لاگ‌ها را بررسی کنید
2. [مستندات رسمی Nexus](https://help.sonatype.com/repomanager3) را مطالعه کنید
3. Issue در GitHub ایجاد کنید
4. به انجمن‌های کاربری Nexus مراجعه کنید

---

موفق باشید! 🎉

