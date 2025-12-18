@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   StardewPriceDB 一键更新脚本
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] 检查数据格式...
call npm run verify
if errorlevel 1 (
    echo.
    echo ❌ 数据有问题！请检查 items.json 文件
    pause
    exit /b 1
)

echo.
echo [2/4] 构建网站...
call npm run build
if errorlevel 1 (
    echo.
    echo ❌ 构建失败！
    pause
    exit /b 1
)

echo.
echo [3/4] 部署到 Cloudflare Pages...
call npx wrangler pages deploy out --project-name=stardewpricedb
if errorlevel 1 (
    echo.
    echo ❌ 部署失败！请检查网络连接或 Cloudflare 登录状态
    pause
    exit /b 1
)

echo.
echo [4/4] 完成！
echo.
echo ========================================
echo ✅ 网站已更新并部署！
echo.
echo 访问: https://stardewpricedb.pages.dev
echo ========================================
echo.
pause
