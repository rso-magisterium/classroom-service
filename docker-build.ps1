$image = Get-Content -Path .\package.json | ConvertFrom-Json | Select-Object -ExpandProperty dockerImage
$version = Get-Content -Path .\package.json | ConvertFrom-Json | Select-Object -ExpandProperty version
$source = (Get-Content -Path .\package.json | ConvertFrom-Json | Select-Object -ExpandProperty repository | Select-Object -ExpandProperty url) -replace "git\+" -replace "\.git$"

docker buildx build . --push `
	-t "${image}:${version}" -t "${image}:latest" `
	--label "org.opencontainers.image.source=${source}" `
	--label "org.opencontainers.image.version=${version}" `

Write-Output "Docker image: ${image}:${version}"
