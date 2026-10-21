@echo off
chcp 65001 >nul
echo ========================================================
echo   กำลังเปิดระบบ KSU Delivery (React + Vite + Tailwind)
echo   คณะผู้พัฒนา: นาย ทรงยศ กองชา และ นาย ชลดรงค์ ยศรุ่งเรือง
echo ========================================================
cd /d "%~dp0ksu-delivery"
if not exist "node_modules" (
    echo กำลังติดตั้งแพ็กเกจครั้งแรก...
    call npm install
)
start "" "http://localhost:5173"
call npm run dev
pause
