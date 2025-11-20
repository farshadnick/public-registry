#!/bin/bash

# رنگ‌ها برای خروجی
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║         توقف رجیستری خصوصی - Private Registry       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${YELLOW}🛑 در حال توقف سرویس‌ها...${NC}"
docker compose down

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ سرویس‌ها با موفقیت متوقف شدند${NC}"
    
    echo ""
    read -p "$(echo -e ${YELLOW}آیا می‌خواهید داده‌ها را هم حذف کنید؟ \(y/N\): ${NC})" -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}⚠️  در حال حذف داده‌ها...${NC}"
        docker compose down -v
        echo -e "${GREEN}✅ داده‌ها حذف شدند${NC}"
    else
        echo -e "${GREEN}✅ داده‌ها حفظ شدند${NC}"
    fi
else
    echo -e "${RED}❌ خطا در توقف سرویس‌ها${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ تمام!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

