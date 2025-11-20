# 🐳 راهنمای راه‌اندازی Docker Registry با دامنه docker.adlas.cloud

## 📋 پیش‌نیازها

1. دامنه `docker.adlas.cloud` به IP سرور شما اشاره کند
2. پورت 80 (و 443 برای HTTPS) باز باشد
3. سرویس‌ها با docker compose در حال اجرا باشند

## 🔧 مرحله 1: پیکربندی DNS

رکورد DNS زیر را برای دامنه خود اضافه کنید:

```
Type: A
Name: docker.adlas.cloud
Value: [IP سرور شما]
TTL: 3600
```

برای تست:
```bash
ping docker.adlas.cloud
nslookup docker.adlas.cloud
```

## 🚀 مرحله 2: راه‌اندازی سرویس‌ها

سرویس‌ها را راه‌اندازی یا ریستارت کنید:

```bash
cd "/Users/farshad-adlas/apps/public registry"
docker compose restart nginx
# یا
docker compose down && docker compose up -d
```

## 🔐 مرحله 3: پیکربندی Docker Client

### نصب گواهی یا استفاده از Insecure Registry

#### روش 1: Insecure Registry (برای محیط توسعه)

فایل `/etc/docker/daemon.json` را ویرایش کنید:

```json
{
  "insecure-registries": [
    "docker.adlas.cloud",
    "docker.adlas.cloud:80"
  ]
}
```

سپس Docker را ریستارت کنید:
```bash
sudo systemctl restart docker
```

#### روش 2: استفاده از HTTPS (پیشنهادی برای Production)

1. گواهی SSL دریافت کنید (Let's Encrypt یا خرید)
2. فایل‌های گواهی را در `nginx/ssl/` قرار دهید
3. فایل `nginx.conf` را برای HTTPS بروزرسانی کنید (کامنت‌ها را باز کنید)

## 📝 مرحله 4: استفاده از Registry

### ورود به Registry

```bash
docker login docker.adlas.cloud
# Username: admin (یا کاربر Nexus شما)
# Password: رمز عبور Nexus
```

### تگ‌گذاری Image

```bash
# Pull یک image از Docker Hub
docker pull nginx:latest

# تگ‌گذاری برای registry خصوصی
docker tag nginx:latest docker.adlas.cloud/nginx:latest
```

### Push به Registry

```bash
docker push docker.adlas.cloud/nginx:latest
```

### Pull از Registry

```bash
docker pull docker.adlas.cloud/nginx:latest
```

## 🔒 مرحله 5: پیکربندی HTTPS (پیشنهادی)

### با Let's Encrypt

```bash
# نصب certbot
sudo apt-get update
sudo apt-get install certbot

# دریافت گواهی
sudo certbot certonly --standalone -d docker.adlas.cloud

# کپی گواهی‌ها
sudo cp /etc/letsencrypt/live/docker.adlas.cloud/fullchain.pem \
  "nginx/ssl/docker.adlas.cloud.crt"
sudo cp /etc/letsencrypt/live/docker.adlas.cloud/privkey.pem \
  "nginx/ssl/docker.adlas.cloud.key"

# تنظیم دسترسی‌ها
sudo chmod 644 nginx/ssl/docker.adlas.cloud.crt
sudo chmod 600 nginx/ssl/docker.adlas.cloud.key
```

### بروزرسانی nginx.conf

بخش HTTPS را در فایل `nginx/docker.adlas.cloud.conf` فعال کنید و nginx را ریستارت کنید:

```bash
docker compose restart nginx
```

### پیکربندی Auto-renewal

```bash
# اضافه کردن به crontab
sudo crontab -e

# اضافه کردن خط زیر
0 0 1 * * certbot renew --quiet && \
  cp /etc/letsencrypt/live/docker.adlas.cloud/fullchain.pem \
  "/path/to/nginx/ssl/docker.adlas.cloud.crt" && \
  cp /etc/letsencrypt/live/docker.adlas.cloud/privkey.pem \
  "/path/to/nginx/ssl/docker.adlas.cloud.key" && \
  docker compose -f "/path/to/docker-compose.yml" restart nginx
```

## 🧪 تست اتصال

```bash
# بررسی دسترسی به registry
curl http://docker.adlas.cloud/v2/

# خروجی موردانتظار:
# {}
# یا درخواست احراز هویت
```

## 🎯 استفاده در CI/CD

### GitHub Actions

```yaml
- name: Login to Private Registry
  uses: docker/login-action@v2
  with:
    registry: docker.adlas.cloud
    username: ${{ secrets.REGISTRY_USERNAME }}
    password: ${{ secrets.REGISTRY_PASSWORD }}

- name: Build and Push
  uses: docker/build-push-action@v4
  with:
    push: true
    tags: docker.adlas.cloud/myapp:${{ github.sha }}
```

### GitLab CI

```yaml
variables:
  DOCKER_REGISTRY: docker.adlas.cloud
  IMAGE_NAME: $DOCKER_REGISTRY/myapp

before_script:
  - echo "$REGISTRY_PASSWORD" | docker login -u "$REGISTRY_USERNAME" --password-stdin $DOCKER_REGISTRY

build:
  script:
    - docker build -t $IMAGE_NAME:$CI_COMMIT_SHA .
    - docker push $IMAGE_NAME:$CI_COMMIT_SHA
```

### Docker Compose

```yaml
services:
  app:
    image: docker.adlas.cloud/myapp:latest
    # ... other config
```

## 🐳 استفاده در Kubernetes

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: registry-secret
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: <base64-encoded-docker-config>
---
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
  - name: myapp
    image: docker.adlas.cloud/myapp:latest
  imagePullSecrets:
  - name: registry-secret
```

ایجاد secret:
```bash
kubectl create secret docker-registry registry-secret \
  --docker-server=docker.adlas.cloud \
  --docker-username=admin \
  --docker-password=your-password \
  --docker-email=admin@example.com
```

## 📊 مدیریت و نظارت

### مشاهده Images در Nexus

1. ورود به پنل Nexus: http://localhost:8081
2. Browse → docker-hosted

### لاگ‌های Nginx

```bash
docker compose logs -f nginx
```

### لاگ‌های Nexus

```bash
docker compose logs -f nexus
```

## ❓ عیب‌یابی

### خطای "x509: certificate signed by unknown authority"

برای HTTPS، گواهی را به Docker اضافه کنید:
```bash
sudo mkdir -p /etc/docker/certs.d/docker.adlas.cloud
sudo cp nginx/ssl/docker.adlas.cloud.crt \
  /etc/docker/certs.d/docker.adlas.cloud/ca.crt
sudo systemctl restart docker
```

### خطای "connection refused"

بررسی کنید:
1. DNS به درستی تنظیم شده است
2. سرویس nginx در حال اجرا است
3. پورت 80 باز است

```bash
docker compose ps
sudo netstat -tlnp | grep :80
```

### خطای "unauthorized"

1. مطمئن شوید با docker login وارد شده‌اید
2. کاربر در Nexus دسترسی لازم را دارد
3. Realm "Docker Bearer Token Realm" در Nexus فعال است

## 🔗 منابع مفید

- [Docker Registry API](https://docs.docker.com/registry/spec/api/)
- [Nexus Docker Repository](https://help.sonatype.com/repomanager3/nexus-repository-administration/formats/docker-registry)
- [Nginx Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)

---

موفق باشید! 🚀

