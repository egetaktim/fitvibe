# GitHub ve Netlify Deploy Talimatları

## 1. GitHub'a Push Etme

### Adım 1: GitHub'da Repository Oluşturun
1. https://github.com/new adresine gidin
2. Repository adı: `fitvibe` (veya istediğiniz isim)
3. Public veya Private seçin
4. "Create repository" butonuna tıklayın

### Adım 2: Terminal Komutları
GitHub'da repository oluşturduktan sonra, size verilen komutları çalıştırın. Genellikle şöyle olur:

```bash
cd /Users/alitektas/Desktop/sena
git remote add origin https://github.com/KULLANICI_ADINIZ/fitvibe.git
git push -u origin main
```

**Not:** `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın.

## 2. Netlify'da Deploy Etme

### Adım 1: Netlify'a Giriş Yapın
1. https://app.netlify.com adresine gidin
2. GitHub hesabınızla giriş yapın

### Adım 2: Yeni Site Oluşturun
1. "Add new site" butonuna tıklayın
2. "Import an existing project" seçeneğini seçin
3. "Deploy with GitHub" butonuna tıklayın
4. GitHub hesabınızı bağlayın (gerekirse izin verin)

### Adım 3: Repository Seçin
1. Repository listesinden `fitvibe` repository'sini seçin
2. "Deploy site" butonuna tıklayın

### Adım 4: Build Ayarları (Otomatik olarak ayarlanmış olmalı)
- **Build command:** (boş bırakın)
- **Publish directory:** `.` (nokta)
- **Branch:** `main`

### Adım 5: Deploy
1. "Deploy site" butonuna tıklayın
2. Birkaç saniye içinde siteniz canlı olacak!
3. Netlify size otomatik bir URL verecek (örn: `fitvibe-12345.netlify.app`)

## 3. Özel Domain Ekleme (Opsiyonel)

1. Netlify dashboard'da sitenize gidin
2. "Domain settings" sekmesine tıklayın
3. "Add custom domain" butonuna tıklayın
4. Domain adınızı girin ve ayarları yapın

## 4. Otomatik Deploy

Her GitHub'a push yaptığınızda, Netlify otomatik olarak yeni versiyonu deploy edecek!

```bash
git add .
git commit -m "Yeni özellik eklendi"
git push
```

## Sorun Giderme

### Build Hatası Alırsanız:
- Netlify dashboard'da "Deploys" sekmesine gidin
- Hata mesajını kontrol edin
- Build command boş olmalı
- Publish directory `.` (nokta) olmalı

### Site Açılmıyorsa:
- Netlify'ın build log'larını kontrol edin
- `index.html` dosyasının root dizinde olduğundan emin olun
- Browser console'da hata var mı kontrol edin

