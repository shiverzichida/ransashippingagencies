[System.Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null
Add-Type -AssemblyName System.Runtime.WindowsRuntime

$asTaskGeneric = ([System.Windows.Runtime.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq "AsTask" -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq "IAsyncOperation`1" })[0]

function AwaitOp($asyncOp) {
    $iface = $asyncOp.GetType().GetInterfaces() | Where-Object { $_.IsGenericType -and $_.GetGenericTypeDefinition().Name -eq "IAsyncOperation`1" } | Select-Object -First 1
    $targetType = $iface.GetGenericArguments()[0]
    $asTask = $asTaskGeneric.MakeGenericMethod($targetType)
    return $asTask.Invoke($null, @($asyncOp)).Result
}

[Windows.Media.Ocr.OcrEngine, Windows.Foundation.UniversalApiContract, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation.UniversalApiContract, ContentType=WindowsRuntime] | Out-Null

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new("en-US"))

for ($i = 1; $i -le 10; $i++) {
    $imgPath = (Get-Item "scratch/rat_pages/page_$i.png").FullName
    $file = AwaitOp ([Windows.Storage.StorageFile]::GetFileFromPathAsync($imgPath))
    $stream = AwaitOp ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read))
    $decoder = AwaitOp ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream))
    $bmp = AwaitOp ($decoder.GetSoftwareBitmapAsync())
    $res = AwaitOp ($engine.RecognizeAsync($bmp))
    Write-Host "==================== PAGE $i ===================="
    Write-Host $res.Text
}
