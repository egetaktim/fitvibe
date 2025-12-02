# Yeni GitHub Repository Kurulumu

## Adım 1: GitHub'da Yeni Repository Oluşturun

1. **Yeni repository oluştur sayfasına gidin:**
   https://github.com/new

2. **Repository bilgileri:**
   - Repository name: `fitvibe`
   - Description: (opsiyonel) "FitVibe - Spor Haritası & Rezervasyon Sistemi"
   - Public veya Private seçin
   - **ÖNEMLİ:** "Initialize this repository with a README" seçeneğini **İŞARETLEMEYİN** (zaten README var)

3. **"Create repository" butonuna tıklayın**

## Adım 2: Repository Oluşturulduktan Sonra

Repository oluşturulduktan sonra bana haber verin, ben remote'u güncelleyip push edeceğim.

Veya siz şu komutları çalıştırabilirsiniz:

```bash
cd /Users/alitektas/Desktop/sena
git remote add origin https://github.com/egetaktim/fitvibe.git
git push -u origin main
```

## Adım 3: Personal Access Token

Push yaparken GitHub kimlik doğrulaması istenirse:

1. **Token oluşturun:**
   https://github.com/settings/tokens/new

2. **Ayarlar:**
   - Note: `fitvibe-push`
   - Scopes: `repo` seçeneğini işaretleyin
   - "Generate token" tıklayın
   - Token'ı kopyalayın

3. **Push yaparken:**
   - Username: `egetaktim`
   - Password: Token'ı yapıştırın

