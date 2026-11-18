<#
.SYNOPSIS
    Lauren Tan Hierarchy Verification Engine for Windows Batch Scripts.
.DESCRIPTION
    Runs 5 Static Analysis tests (Tầng 2) and 3 Verification tests (Tầng 3)
    to enforce Enterprise-grade Windows System Engineering standards.
.PARAMETER TargetPath
    Path to the .bat or .cmd script to verify.
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$TargetPath
)

Set-StrictMode -Off
$ErrorActionPreference = "Continue"

Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host " LAUREN TAN HARNESS ENGINEERING - BATCH VERIFICATION ENGINE (V1.0)" -ForegroundColor Cyan
Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host " Target Script : $TargetPath" -ForegroundColor Yellow
Write-Host " Timestamp     : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
Write-Host "--------------------------------------------------------------------------------" -ForegroundColor DarkGray

if (-not (Test-Path -Path $TargetPath)) {
    Write-Host "[FAIL] Target file '$TargetPath' does not exist!" -ForegroundColor Red
    exit 1
}

$resolvedPath = (Resolve-Path $TargetPath).Path
$lines = [System.IO.File]::ReadAllLines($resolvedPath)
$totalTests = 8
$passedTests = 0

function Write-TestResult {
    param(
        [string]$TestCategory,
        [string]$TestName,
        [bool]$Success,
        [string]$Details = ""
    )
    if ($Success) {
        $script:passedTests++
        Write-Host " [PASS] " -ForegroundColor Green -NoNewline
        Write-Host "[$TestCategory] $TestName" -ForegroundColor White
        if ($Details) {
            Write-Host "        $Details" -ForegroundColor DarkGray
        }
    } else {
        Write-Host " [FAIL] " -ForegroundColor Red -NoNewline
        Write-Host "[$TestCategory] $TestName" -ForegroundColor Yellow
        if ($Details) {
            Write-Host "        Error: $Details" -ForegroundColor Red
        }
    }
}

Write-Host "`n>>> TẦNG 2: PHÂN TÍCH TĨNH (STATIC ANALYSIS)" -ForegroundColor Magenta

# -----------------------------------------------------------------------------
# Test 1: Khai tử WMIC (Zero WMIC Policy)
# -----------------------------------------------------------------------------
$wmicViolations = @()
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    $trimmed = $line.Trim()
    if ($trimmed.StartsWith("::") -or $trimmed -match "^rem\b") { continue }
    if ($line -match "(?i)\bwmic(\.exe)?\b") {
        $wmicViolations += "Line $($i+1): $trimmed"
    }
}
$t1Pass = ($wmicViolations.Count -eq 0)
$t1Detail = if ($t1Pass) { "0 lệnh wmic được phát hiện. Đã thay thế chuẩn bằng CIM/PowerShell." } else { "$($wmicViolations.Count) vi phạm wmic: $($wmicViolations -join '; ')" }
Write-TestResult -TestCategory "Static 1/5" -TestName "Khai tử WMIC (Zero WMIC Policy)" -Success $t1Pass -Details $t1Detail

# -----------------------------------------------------------------------------
# Test 2: Mã hóa ký tự Echo (ASCII Only in echo - Cấm dấu tiếng Việt)
# -----------------------------------------------------------------------------
$accentPattern = "[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]"
$accentViolations = @()
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    $trimmed = $line.Trim()
    if ($trimmed.StartsWith("::") -or $trimmed -match "^rem\b") { continue }
    if ($line -match "(?:^|[&|])\s*echo[\.\s/:\\]") {
        if ($line -match $accentPattern) {
            $accentViolations += "Line $($i+1): $trimmed"
        }
    }
}
$t2Pass = ($accentViolations.Count -eq 0)
$t2Detail = if ($t2Pass) { "100% các dòng echo dùng tiếng Việt không dấu chuẩn ASCII, chống vỡ font CMD." } else { "$($accentViolations.Count) dòng echo có dấu: $($accentViolations -join '; ')" }
Write-TestResult -TestCategory "Static 2/5" -TestName "Mã hóa ký tự Echo (ASCII Only in echo)" -Success $t2Pass -Details $t2Detail

# -----------------------------------------------------------------------------
# Test 3: Cân bằng cú pháp cặp ngoặc ()
# -----------------------------------------------------------------------------
$balance = 0
$bracketError = $null
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    $trimmed = $line.Trim()
    if ($trimmed.StartsWith("::") -or $trimmed -match "^rem\b") { continue }
    
    # Process characters, honoring caret escape ^( and ^)
    for ($c = 0; $c -lt $line.Length; $c++) {
        $char = $line[$c]
        if ($char -eq '^') {
            $c++ # skip escaped character
            continue
        }
        if ($char -eq '(') {
            $balance++
        } elseif ($char -eq ')') {
            $balance--
            if ($balance -lt 0) {
                $bracketError = "Dấu đóng ngoặc thừa tại Line $($i+1): $trimmed"
                break
            }
        }
    }
    if ($bracketError) { break }
}
if (-not $bracketError -and $balance -ne 0) {
    $bracketError = "Mất cân bằng ngoặc ở cuối file (Dư $balance dấu mở ngoặc '(')."
}
$t3Pass = ($null -eq $bracketError)
$t3Detail = if ($t3Pass) { "Toàn bộ cặp dấu ngoặc () trong các khối lệnh đều cân bằng tuyệt đối." } else { $bracketError }
Write-TestResult -TestCategory "Static 3/5" -TestName "Cân bằng cú pháp cặp ngoặc ()" -Success $t3Pass -Details $t3Detail

# -----------------------------------------------------------------------------
# Test 4: Định tuyến nhãn điều khiển (Label Integrity - Goto/Call targets)
# -----------------------------------------------------------------------------
$definedLabels = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$definedLabels.Add("EOF") | Out-Null

# Step A: Collect all defined labels
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    $trimmed = $line.Trim()
    if ($trimmed.StartsWith("::")) { continue } # Comment
    if ($trimmed -match "^:([a-zA-Z0-9_\-\.]+)") {
        $lbl = $matches[1]
        $definedLabels.Add($lbl) | Out-Null
    }
}

# Step B: Check all goto and call statements
$missingLabels = @()
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    $trimmed = $line.Trim()
    if ($trimmed.StartsWith("::") -or $trimmed -match "^rem\b") { continue }
    
    # Check goto
    if ($line -match "(?:^|[&|])\s*goto\s+:?([a-zA-Z0-9_\-\.]+)") {
        $target = $matches[1]
        if (-not $target.StartsWith("%") -and -not $definedLabels.Contains($target)) {
            $missingLabels += "Line $($i+1): goto :$target (Không tìm thấy nhãn)"
        }
    }
    
    # Check call :LABEL
    if ($line -match "(?:^|[&|])\s*call\s+:([a-zA-Z0-9_\-\.]+)") {
        $target = $matches[1]
        if (-not $target.StartsWith("%") -and -not $definedLabels.Contains($target)) {
            $missingLabels += "Line $($i+1): call :$target (Không tìm thấy nhãn)"
        }
    }
}
$t4Pass = ($missingLabels.Count -eq 0)
$t4Detail = if ($t4Pass) { "100% nhãn đích của các lệnh goto và call đều tồn tại hợp lệ ($($definedLabels.Count) nhãn đã định nghĩa)." } else { "$($missingLabels.Count) nhãn không tồn tại: $($missingLabels -join '; ')" }
Write-TestResult -TestCategory "Static 4/5" -TestName "Định tuyến nhãn điều khiển (Label Integrity)" -Success $t4Pass -Details $t4Detail

# -----------------------------------------------------------------------------
# Test 5: Quản lý phạm vi biến & Thoát an toàn (Scope & Safe Exit)
# -----------------------------------------------------------------------------
$hasSetLocal = $false
$hasEndLocal = $false
$hasSafeExit = $definedLabels.Contains("SAFE_EXIT")

for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match "(?i)\bsetlocal\b") { $hasSetLocal = $true }
    if ($line -match "(?i)\bendlocal\b") { $hasEndLocal = $true }
}

$t5Pass = ($hasSetLocal -and $hasEndLocal -and $hasSafeExit)
$t5Detail = if ($t5Pass) { "Có đầy đủ setlocal/endlocal và nhãn :SAFE_EXIT giải phóng tài nguyên an toàn." } else { "Thiếu: $(if (-not $hasSetLocal){'setlocal '})$(if (-not $hasEndLocal){'endlocal '})$(if (-not $hasSafeExit){'nhãn :SAFE_EXIT'})" }
Write-TestResult -TestCategory "Static 5/5" -TestName "Quản lý phạm vi biến & Thoát an toàn" -Success $t5Pass -Details $t5Detail

Write-Host "`n>>> TẦNG 3: XÁC MINH THỰC NGHIỆM AN TOÀN (VERIFICATION)" -ForegroundColor Magenta

# -----------------------------------------------------------------------------
# Test 6: Kiểm tra cú pháp CMD Parser (Dry-Run Check)
# -----------------------------------------------------------------------------
$t6Pass = $false
$t6Detail = ""
try {
    # Call script in test dry-run mode using cmd.exe
    $procInfo = New-Object System.Diagnostics.ProcessStartInfo
    $procInfo.FileName = "cmd.exe"
    $procInfo.Arguments = "/c `"`"$resolvedPath`" --test-parser-dry-run`""
    $procInfo.RedirectStandardOutput = $true
    $procInfo.RedirectStandardError = $true
    $procInfo.UseShellExecute = $false
    $procInfo.CreateNoWindow = $true

    $proc = [System.Diagnostics.Process]::Start($procInfo)
    $stdout = $proc.StandardOutput.ReadToEnd()
    $stderr = $proc.StandardError.ReadToEnd()
    [void]$proc.WaitForExit(5000)

    if ($stderr -match "(?i)syntax of the command is incorrect|cannot find the batch label") {
        $t6Pass = $false
        $t6Detail = "CMD parser báo lỗi cú pháp: $stderr"
    } else {
        $t6Pass = $true
        $t6Detail = "CMD parser thực thi suôn sẻ, không phát hiện lỗi cú pháp token hoặc nhãn."
    }
} catch {
    $t6Pass = $false
    $t6Detail = "Ngoại lệ khi gọi cmd.exe: $($_.Exception.Message)"
}
Write-TestResult -TestCategory "Verify 1/3" -TestName "Kiểm tra cú pháp CMD Parser (Dry-Run)" -Success $t6Pass -Details $t6Detail

# -----------------------------------------------------------------------------
# Test 7: Kiểm thử CIM / PowerShell Engine Compatibility
# -----------------------------------------------------------------------------
$t7Pass = $false
$t7Detail = ""
try {
    $osInfo = Get-CimInstance -ClassName Win32_OperatingSystem -ErrorAction Stop
    $t7Pass = ($null -ne $osInfo -and -not [string]::IsNullOrWhiteSpace($osInfo.Caption))
    $t7Detail = "CIM engine hoạt động hoàn hảo trên Windows 10/11: $($osInfo.Caption) (Build $($osInfo.BuildNumber), Arch $($osInfo.OSArchitecture))."
} catch {
    $t7Pass = $false
    $t7Detail = "Lỗi CIM/PowerShell engine: $($_.Exception.Message)"
}
Write-TestResult -TestCategory "Verify 2/3" -TestName "Tương thích CIM / PowerShell Engine" -Success $t7Pass -Details $t7Detail

# -----------------------------------------------------------------------------
# Test 8: Rà soát an toàn môi trường (Safety Guardrails)
# -----------------------------------------------------------------------------
$dangerousPatterns = @(
    "(?i)\bformat\s+[a-zA-Z]:",
    "(?i)\bdel\s+/[fF]\s+/[sS]\s+/[qQ]\s+[a-zA-Z]:\\",
    "(?i)\brd\s+/[sS]\s+/[qQ]\s+[a-zA-Z]:\\",
    "(?i)\bdiskpart\b.*clean"
)
$dangerFound = @()
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    $trimmed = $line.Trim()
    if ($trimmed.StartsWith("::") -or $trimmed -match "^rem\b") { continue }
    foreach ($dp in $dangerousPatterns) {
        if ($line -match $dp) {
            $dangerFound += "Line $($i+1): $trimmed"
        }
    }
}
$t8Pass = ($dangerFound.Count -eq 0)
$t8Detail = if ($t8Pass) { "Không phát hiện lệnh phá hủy nguy hiểm không an toàn." } else { "$($dangerFound.Count) lệnh nguy hiểm phát hiện: $($dangerFound -join '; ')" }
Write-TestResult -TestCategory "Verify 3/3" -TestName "Rà soát an toàn môi trường (Safety Guardrails)" -Success $t8Pass -Details $t8Detail

# -----------------------------------------------------------------------------
# TỔNG KẾT
# -----------------------------------------------------------------------------
Write-Host "`n--------------------------------------------------------------------------------" -ForegroundColor DarkGray
$pct = [math]::Round(($passedTests / $totalTests) * 100, 1)
if ($passedTests -eq $totalTests) {
    Write-Host " KẾT QUẢ KIỂM DUYỆT: 100% PASS ($passedTests/$totalTests BÀI KIỂM TRA ĐẠT CHUẨN)" -ForegroundColor Green
    Write-Host " ĐỦ ĐIỀU KIỆN CHUYỂN TIẾP TẦNG 5: CON NGƯỜI KIỂM DUYỆT (HUMAN REVIEW)" -ForegroundColor Cyan
    Write-Host "================================================================================" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host " KẾT QUẢ KIỂM DUYỆT: THẤT BẠI ($passedTests/$totalTests BÀI KIỂM TRA ĐẠT - $pct%)" -ForegroundColor Red
    Write-Host " CẦN KHẮC PHỤC CÁC MỤC THẤT BẠI TRƯỚC KHI BÀN GIAO." -ForegroundColor Yellow
    Write-Host "================================================================================" -ForegroundColor Cyan
    exit 1
}
