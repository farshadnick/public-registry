# 🌐 راهنمای پیکربندی Nginx در Edge Network

این راهنما برای پیکربندی Nginx در لایه Edge شبکه شما (خارج از Docker Compose) است.

## 📋 پورت‌های در دسترس

پس از اجرای `docker-compose up -d`، سرویس‌های زیر در دسترس خواهند بود:

- **Nexus UI**: `localhost:8081`
- **Docker Registry**: `localhost:8082`
- **Docker Registry Group**: `localhost:8083`
- **NPM Registry**: `localhost:8084`
- **PyPI Registry**: `localhost:8085`
- **Landing Page**: `localhost:3000`

## 🔧 پیکربندی Nginx در Edge

### فایل پیکربندی اصلی

در سرور Edge خود، فایل‌های زیر را ایجاد کنید:

#### 1. Landing Page - `/etc/nginx/sites-available/adlas-registry`

\`\`\`nginx
server {
    listen 80;
    server_name adlas.cloud www.adlas.cloud;
    
    location / {
        proxy_pass http://[IP-DOCKER-HOST]:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# HTTPS (با Let's Encrypt)
server {
    listen 443 ssl http2;
    server_name adlas.cloud www.adlas.cloud;
    
    ssl_certificate /etc/letsencrypt/live/adlas.cloud/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/adlas.cloud/privkey.pem;
    
    location / {
        proxy_pass http://[IP-DOCKER-HOST]:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
\`\`\`

#### 2. Docker Registry - `/etc/nginx/sites-available/docker-adlas`

\`\`\`nginx
server {
    listen 80;
    server_name docker.adlas.cloud;
    
    location / {
        proxy_pass http://[IP-DOCKER-HOST]:8082;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        client_max_body_size 0;
        chunked_transfer_encoding on;
        proxy_read_timeout 900;
        proxy_buffering off;
    }
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name docker.adlas.cloud;
    
    ssl_certificate /etc/letsencrypt/live/docker.adlas.cloud/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/docker.adlas.cloud/privkey.pem;
    
    # SSL optimization
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    client_max_body_size 0;
    chunked_transfer_encoding on;
    
    location / {
        proxy_pass http://[IP-DOCKER-HOST]:8082;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-Host $host;
        
        proxy_read_timeout 900;
        proxy_buffering off;
        proxy_request_buffering off;
    }
}
\`\`\`

#### 3. NPM Registry - `/etc/nginx/sites-available/npm-adlas`

\`\`\`nginx
server {
    listen 80;
    server_name npm.adlas.cloud;
    
    location / {
        proxy_pass http://[IP-DOCKER-HOST]:8084;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        client_max_body_size 500M;
    }
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name npm.adlas.cloud;
    
    ssl_certificate /etc/letsencrypt/live/npm.adlas.cloud/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/npm.adlas.cloud/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    client_max_body_size 500M;
    
    location / {
        proxy_pass http://[IP-DOCKER-HOST]:8084;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
\`\`\`

#### 4. PyPI Registry - `/etc/nginx/sites-available/pip-adlas`

\`\`\`nginx
server {
    listen 80;
    server_name pip.adlas.cloud;
    
    location / {
        proxy_pass http://[IP-DOCKER-HOST]:8085;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        client_max_body_size 500M;
    }
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name pip.adlas.cloud;
    
    ssl_certificate /etc/letsencrypt/live/pip.adlas.cloud/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pip.adlas.cloud/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    client_max_body_size 500M;
    
    location / {
        proxy_pass http://[IP-DOCKER-HOST]:8085;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
\`\`\`

#### 5. Nexus Admin UI (اختیاری) - `/etc/nginx/sites-available/nexus-admin`

\`\`\`nginx
server {
    listen 80;
    server_name nexus.adlas.cloud;
    
    # فقط از IP های مشخص اجازه دسترسی
    allow [YOUR-ADMIN-IP];
    deny all;
    
    location / {
        proxy_pass http://[IP-DOCKER-HOST]:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        client_max_body_size 1G;
    }
}
\`\`\`

## 🚀 فعال‌سازی تنظیمات

\`\`\`bash
# ایجاد symlink برای فعال‌سازی
sudo ln -s /etc/nginx/sites-available/adlas-registry /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/docker-adlas /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/npm-adlas /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/pip-adlas /etc/nginx/sites-enabled/

# تست کنفیگ
sudo nginx -t

# ریلود Nginx
sudo systemctl reload nginx
\`\`\`

## 🔒 راه‌اندازی SSL با Let's Encrypt

\`\`\`bash
# نصب certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# دریافت گواهی برای تمام دامنه‌ها
sudo certbot --nginx -d adlas.cloud -d www.adlas.cloud
sudo certbot --nginx -d docker.adlas.cloud
sudo certbot --nginx -d npm.adlas.cloud
sudo certbot --nginx -d pip.adlas.cloud

# تست auto-renewal
sudo certbot renew --dry-run
\`\`\`

Certbot به صورت خودکار تنظیمات HTTPS را به فایل‌های nginx اضافه می‌کند.

## 🔥 پیکربندی Firewall

\`\`\`bash
# اجازه دسترسی به Nginx
sudo ufw allow 'Nginx Full'

# بستن پورت‌های مستقیم (اختیاری برای امنیت بیشتر)
# فقط اگر Docker host و Edge Nginx روی سرورهای مختلف هستند
sudo ufw deny 3000
sudo ufw deny 8081
sudo ufw deny 8082
sudo ufw deny 8083
sudo ufw deny 8084
sudo ufw deny 8085
\`\`\`

## 📊 مانیتورینگ و لاگ‌ها

\`\`\`bash
# مشاهده لاگ‌های Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# لاگ‌های مخصوص هر سایت (اگر تعریف کرده باشید)
sudo tail -f /var/log/nginx/docker-registry-access.log
sudo tail -f /var/log/nginx/npm-registry-access.log
\`\`\`

## 🎯 بهینه‌سازی‌های پیشنهادی

در `/etc/nginx/nginx.conf` تنظیمات زیر را اضافه کنید:

\`\`\`nginx
http {
    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss 
               application/rss+xml application/atom+xml image/svg+xml 
               text/x-component text/x-cross-domain-policy;
    
    # Rate limiting (محافظت در برابر abuse)
    limit_req_zone $binary_remote_addr zone=registry_limit:10m rate=10r/s;
    
    # Proxy settings
    proxy_connect_timeout 600;
    proxy_send_timeout 600;
    proxy_read_timeout 600;
    send_timeout 600;
    
    # Buffer sizes
    proxy_buffer_size 128k;
    proxy_buffers 4 256k;
    proxy_busy_buffers_size 256k;
    
    # ... existing config ...
}
\`\`\`

## 🔍 تست اتصال

\`\`\`bash
# تست Landing page
curl -I https://adlas.cloud

# تست Docker registry
curl -I https://docker.adlas.cloud/v2/

# تست NPM registry
curl -I https://npm.adlas.cloud

# تست PyPI registry
curl -I https://pip.adlas.cloud
\`\`\`

## ⚠️ نکات امنیتی

1. **محدود کردن دسترسی به Nexus UI**: فقط از IP های مشخص
2. **استفاده از HTTPS**: برای تمام دامنه‌ها اجباری
3. **Rate Limiting**: محدود کردن تعداد درخواست‌ها
4. **Monitoring**: نصب ابزارهایی مثل fail2ban برای محافظت از abuse
5. **Firewall**: بستن پورت‌های غیرضروری

## 📝 DNS Records

مطمئن شوید رکوردهای DNS زیر تنظیم شده‌اند:

\`\`\`
Type  | Name                 | Value
------|---------------------|------------------
A     | adlas.cloud         | [YOUR-EDGE-IP]
A     | docker.adlas.cloud  | [YOUR-EDGE-IP]
A     | npm.adlas.cloud     | [YOUR-EDGE-IP]
A     | pip.adlas.cloud     | [YOUR-EDGE-IP]
AAAA  | adlas.cloud         | [YOUR-IPv6] (optional)
\`\`\`

---

موفق باشید! 🚀

