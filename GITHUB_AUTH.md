# GitHub Kimlik Doğrulama ve Push

## Seçenek 1: Personal Access Token Oluşturma (Önerilen)

1. **Token Oluştur Sayfası:**
   https://github.com/settings/tokens/new

2. **Ayarlar:**
   - Note: `fitvibe-push` (veya istediğiniz isim)
   - Expiration: İstediğiniz süre (90 gün önerilir)
   - Scopes: **`repo`** seçeneğini işaretleyin (tüm repo yetkileri)

3. **"Generate token" butonuna tıklayın**

4. **Token'ı kopyalayın** (bir daha gösterilmeyecek!)

5. **Push yapın:**
   ```bash
   cd /Users/alitektas/Desktop/sena
   git push origin main
   ```
   - Username: `egetaktim`
   - Password: Token'ı yapıştırın

## Seçenek 2: GitHub Settings

**Genel Ayarlar:**
https://github.com/settings/profile

**Developer Settings:**
https://github.com/settings/apps

**Personal Access Tokens:**
https://github.com/settings/tokens

## Seçenek 3: GitHub Desktop Kullanın

GitHub Desktop ile push yapmak daha kolay:
1. GitHub Desktop'u açın
2. File → Add Local Repository
3. `/Users/alitektas/Desktop/sena` klasörünü seçin
4. "Publish repository" veya "Push origin" butonuna tıklayın

