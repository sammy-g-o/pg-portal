# PowerShell script to remove fas fa-table icons from admin pages
$adminDir = "admin"
$files = Get-ChildItem -Path $adminDir -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Remove the fas fa-table icon
    $content = $content -replace '<i class="fas fa-table"></i>', ''
    
    # Only write if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "Table icon removal completed!"
