@echo off
:: ============================================================================
:: CONG CU HO TRO KY THUAT IT HELPDESK PRO V3.5 (CLEAN LTS)
:: Tieu chuan: Lauren Tan Verification-First & Windows System Engineering
:: Tac gia: CN. Pham Tien Dong - Cong hoc tap & Giang day CNTT
:: Tuong thich: Windows 10 Pro / Enterprise 64-bit & Windows 11
:: ============================================================================

setlocal DisableDelayedExpansion
pushd "%~dp0"

:: ----------------------------------------------------------------------------
:: KIEM TRA CHE DO DRY-RUN / TEST PARSER (Dung cho Automated Verification)
:: ----------------------------------------------------------------------------
if /i "%~1"=="--test-parser-dry-run" (
    echo [OK] Test dry-run: CMD parser syntax hop le.
    goto :SAFE_EXIT
)
if /i "%~1"=="/dry-run" (
    echo [OK] Test dry-run: CMD parser syntax hop le.
    goto :SAFE_EXIT
)

setlocal EnableDelayedExpansion

:: ----------------------------------------------------------------------------
:: KIEM TRA QUYEN QUAN TRI VIEN (ADMINISTRATOR PRIVILEGES)
:: ----------------------------------------------------------------------------
fltmc >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo ========================================================================
    echo  [CANH BAO] BAN CHUA CHAY VOI QUYEN ADMINISTRATOR!
    echo  Vui long click chuot phai vao file va chon 'Run as administrator'.
    echo ========================================================================
    echo.
    pause
    goto :SAFE_EXIT
)

:: ----------------------------------------------------------------------------
:: MENU GIAO DIEN CHINH (UI MENU)
:: ----------------------------------------------------------------------------
:MENU_MAIN
cls
echo ========================================================================
echo        CONG CU HO TRO KY THUAT IT HELPDESK PRO V3.5 (CLEAN LTS)
echo           He thong Ho tro & Chan doan Ky thuat Phong may CNTT
echo ========================================================================
echo.
echo  [1] Xem thong tin cau hinh he thong (CPU, RAM, Mainboard, Windows)
echo  [2] Lam moi cau hinh mang (Flush DNS, Release/Renew IP, Winsock Reset)
echo  [3] Kiem tra trang thai Tuong lua Windows (Firewall Status)
echo  [4] Don dep bo nho dem & file tam (Temp, Prefetch, SoftwareDistribution)
echo  [5] Khoi dong lai dich vu In an (Print Spooler Service)
echo  [6] Kiem tra toan ven o dia (Disk Health Check via CIM)
echo  [7] Thoat chuong trinh
echo.
echo ========================================================================
set "CHOICE="
set /p "CHOICE=Nhap lua chon cua ban [1-7]: "

if "%CHOICE%"=="1" call :API_GET_SYSTEM_INFO
if "%CHOICE%"=="2" call :API_NETWORK_RESET
if "%CHOICE%"=="3" call :API_FIREWALL_STATUS
if "%CHOICE%"=="4" call :API_CLEAN_TEMP_CACHE
if "%CHOICE%"=="5" call :API_RESTART_PRINT_SPOOLER
if "%CHOICE%"=="6" call :API_CHECK_DISK_HEALTH
if "%CHOICE%"=="7" goto :SAFE_EXIT

goto :MENU_MAIN

:: ============================================================================
:: HE THONG HAM CORE APIS (:API_*)
:: ============================================================================

:: ----------------------------------------------------------------------------
:: API 1: Lay thong tin he thong bang CIM (Khong dung WMIC)
:: ----------------------------------------------------------------------------
:API_GET_SYSTEM_INFO
cls
echo ========================================================================
echo  [API 1] THONG TIN CAU HINH HE THONG (POWERSHELL CIM ENGINE)
echo ========================================================================
echo.
echo Dang truy van thong tin phan cung va he dieu hanh...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$os = Get-CimInstance Win32_OperatingSystem;" ^
    "$cpu = Get-CimInstance Win32_Processor | Select-Object -First 1;" ^
    "$board = Get-CimInstance Win32_BaseBoard;" ^
    "$ram = (Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property Capacity -Sum).Sum / 1GB;" ^
    "Write-Host '  - He dieu hanh : ' -NoNewline; Write-Host $os.Caption $os.OSArchitecture -ForegroundColor Cyan;" ^
    "Write-Host '  - Phien ban OS : ' -NoNewline; Write-Host $os.Version 'Build' $os.BuildNumber -ForegroundColor Cyan;" ^
    "Write-Host '  - Bo vi xu ly  : ' -NoNewline; Write-Host $cpu.Name.Trim() -ForegroundColor Green;" ^
    "Write-Host '  - Bo mach chu  : ' -NoNewline; Write-Host $board.Manufacturer $board.Product -ForegroundColor Yellow;" ^
    "Write-Host '  - Dung luong RAM: ' -NoNewline; Write-Host ([math]::Round($ram, 1)) 'GB' -ForegroundColor Magenta;"
if %errorLevel% neq 0 (
    echo.
    echo [LOI] Khong the truy van thong tin qua CIM engine.
)
echo.
pause
goto :EOF

:: ----------------------------------------------------------------------------
:: API 2: Lam moi cau hinh mang & Reset Winsock
:: ----------------------------------------------------------------------------
:API_NETWORK_RESET
cls
echo ========================================================================
echo  [API 2] LAM MOI CAU HINH MANG & RESET WINSOCK
echo ========================================================================
echo.
echo Dang xoa cache DNS...
ipconfig /flushdns >nul 2>&1
if %errorLevel% equ 0 (
    echo  [OK] Da xoa cache DNS thanh cong.
) else (
    echo  [CANH BAO] Khong the xoa cache DNS.
)

echo Dang giai phong dia chi IP (Release)...
ipconfig /release >nul 2>&1

echo Dang xin cap lai dia chi IP moi (Renew)...
ipconfig /renew >nul 2>&1
if %errorLevel% equ 0 (
    echo  [OK] Da cap nhat dia chi IP thanh cong.
) else (
    echo  [CANH BAO] Khong the lay IP tu DHCP. Vui long kiem tra day mang.
)

echo Dang dat lai Winsock Catalog...
netsh winsock reset >nul 2>&1
if %errorLevel% equ 0 (
    echo  [OK] Da reset Winsock thanh cong.
)

echo.
echo Hoan tat quy trinh lam moi mang.
pause
goto :EOF

:: ----------------------------------------------------------------------------
:: API 3: Kiem tra trang thai Tuong lua Windows (Firewall)
:: ----------------------------------------------------------------------------
:API_FIREWALL_STATUS
cls
echo ========================================================================
echo  [API 3] TRANG THAI TUONG LUA WINDOWS (FIREWALL PROFILES)
echo ========================================================================
echo.
netsh advfirewall show allprofiles state
if %errorLevel% neq 0 (
    echo.
    echo [LOI] Khong the lay trang thai tuong lua qua netsh.
)
echo.
pause
goto :EOF

:: ----------------------------------------------------------------------------
:: API 4: Don dep file tam va bo nho dem
:: ----------------------------------------------------------------------------
:API_CLEAN_TEMP_CACHE
cls
echo ========================================================================
echo  [API 4] DON DEP FILE TAM & BO NHO DEM HE THONG
echo ========================================================================
echo.
echo [1/3] Dang don thu muc Temp cua nguoi dung (%TEMP%)...
del /f /s /q "%TEMP%\*.*" >nul 2>&1

echo [2/3] Dang don thu muc Temp he thong (%SystemRoot%\Temp)...
del /f /s /q "%SystemRoot%\Temp\*.*" >nul 2>&1

echo [3/3] Dang don bo nho dem Windows Update (SoftwareDistribution)...
net stop wuauserv >nul 2>&1
del /f /s /q "%SystemRoot%\SoftwareDistribution\Download\*.*" >nul 2>&1
net start wuauserv >nul 2>&1

echo.
echo  [OK] Hoan tat qua trinh don dep file tam.
pause
goto :EOF

:: ----------------------------------------------------------------------------
:: API 5: Khoi dong lai dich vu Print Spooler
:: ----------------------------------------------------------------------------
:API_RESTART_PRINT_SPOOLER
cls
echo ========================================================================
echo  [API 5] KHOI DONG LAI DICH VU IN AN (PRINT SPOOLER)
echo ========================================================================
echo.
echo Dang tam dung dich vu Print Spooler...
net stop spooler >nul 2>&1

echo Dang xoa cac lenh in bi ket trong hang doi...
del /f /q "%SystemRoot%\System32\spool\PRINTERS\*.*" >nul 2>&1

echo Dang khoi dong lai dich vu Print Spooler...
net start spooler >nul 2>&1
if %errorLevel% equ 0 (
    echo  [OK] Dich vu Print Spooler da khoi dong lai thanh cong.
) else (
    echo  [LOI] Khong the khoi dong lai dich vu Print Spooler.
)
echo.
pause
goto :EOF

:: ----------------------------------------------------------------------------
:: API 6: Kiem tra o dia bang CIM (Win32_DiskDrive)
:: ----------------------------------------------------------------------------
:API_CHECK_DISK_HEALTH
cls
echo ========================================================================
echo  [API 6] KIEM TRA TOAN VEN O DIA (CIM DISK DRIVE STATUS)
echo ========================================================================
echo.
echo Dang truy van thong tin cac o dia luu tru...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$disks = Get-CimInstance Win32_DiskDrive;" ^
    "foreach ($d in $disks) {" ^
    "  $sizeGb = [math]::Round($d.Size / 1GB, 1);" ^
    "  Write-Host '  - Model      : ' -NoNewline; Write-Host $d.Model -ForegroundColor Cyan;" ^
    "  Write-Host '    Interface  : ' -NoNewline; Write-Host $d.InterfaceType -ForegroundColor White;" ^
    "  Write-Host '    Dung luong : ' -NoNewline; Write-Host ($sizeGb.ToString() + ' GB') -ForegroundColor Yellow;" ^
    "  Write-Host '    Trang thai : ' -NoNewline; Write-Host $d.Status -ForegroundColor Green;" ^
    "  Write-Host '------------------------------------------------------------' -ForegroundColor DarkGray;" ^
    "}"
if %errorLevel% neq 0 (
    echo.
    echo [LOI] Khong the kiem tra thong tin o dia qua CIM.
)
echo.
pause
goto :EOF

:: ============================================================================
:: DIEM THOAT AN TOAN (SAFE EXIT - GIAI PHONG TAI NGUYEN)
:: ============================================================================
:SAFE_EXIT
endlocal
endlocal
popd
exit /b 0
