#!/bin/bash

# رنگ‌ها برای خروجی
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║     راه‌اندازی رجیستری خصوصی - Private Registry     ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}"

# بررسی نصب Docker
echo -e "${YELLOW}⏳ در حال بررسی پیش‌نیازها...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker نصب نیست. لطفاً ابتدا Docker را نصب کنید.${NC}"
    exit 1
fi

if ! command -v docker compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose نصب نیست. لطفاً ابتدا Docker Compose را نصب کنید.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker و Docker Compose یافت شد${NC}"

# بررسی فایل .env
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  فایل .env یافت نشد. در حال ایجاد از .env.example...${NC}"
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✅ فایل .env ایجاد شد${NC}"
    else
        echo -e "${RED}❌ فایل .env.example یافت نشد${NC}"
        exit 1
    fi
fi

# ایجاد دایرکتوری SSL اگر وجود ندارد
if [ ! -d "nginx/ssl" ]; then
    mkdir -p nginx/ssl
    echo -e "${GREEN}✅ دایرکتوری nginx/ssl ایجاد شد${NC}"
fi

# راه‌اندازی سرویس‌ها
echo -e "${YELLOW}🚀 در حال راه‌اندازی سرویس‌ها...${NC}"
docker compose up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ سرویس‌ها با موفقیت راه‌اندازی شدند${NC}"
    
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}📝 اطلاعات دسترسی:${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "  🌐 صفحه اصلی:           ${GREEN}http://localhost:3000${NC}"
    echo -e "  🔧 پنل مدیریت Nexus:    ${GREEN}http://localhost:8081${NC}"
    echo -e "  🐳 رجیستری Docker:      ${GREEN}http://localhost:8082${NC}"
    echo -e "  📦 رجیستری NPM:         ${GREEN}http://localhost:8084${NC}"
    echo -e "  🐍 رجیستری PyPI:        ${GREEN}http://localhost:8085${NC}"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}⏳ لطفاً چند دقیقه صبر کنید تا Nexus به طور کامل راه‌اندازی شود...${NC}"
    echo ""
    echo -e "${BLUE}💡 برای دریافت رمز عبور اولیه admin:${NC}"
    echo -e "   ${GREEN}docker exec nexus-registry cat /nexus-data/admin.password${NC}"
    echo ""
    echo -e "${BLUE}📊 برای مشاهده لاگ‌ها:${NC}"
    echo -e "   ${GREEN}docker compose logs -f${NC}"
    echo ""
    echo -e "${BLUE}🛑 برای توقف سرویس‌ها:${NC}"
    echo -e "   ${GREEN}docker compose down${NC}"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✨ موفق باشید!${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
else
    echo -e "${RED}❌ خطا در راه‌اندازی سرویس‌ها${NC}"
    echo -e "${YELLOW}برای مشاهده جزئیات خطا:${NC}"
    echo -e "   ${GREEN}docker compose logs${NC}"
    exit 1
fi

