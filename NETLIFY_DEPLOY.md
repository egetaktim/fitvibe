# Netlify Deploy Adımları

GitHub'a yüklendi! Şimdi Netlify'a deploy edelim:

## Adım 1: Netlify'a Giriş Yapın
1. https://app.netlify.com adresine gidin
2. GitHub hesabınızla giriş yapın (egetaktim hesabı)

## Adım 2: Yeni Site Oluşturun
1. "Add new site" butonuna tıklayın
2. "Import an existing project" seçeneğini seçin
3. "Deploy with GitHub" butonuna tıklayın
4. GitHub hesabınızı bağlayın (gerekirse izin verin)

## Adım 3: Repository Seçin
1. Repository listesinden **fitvibe** repository'sini seçin
2. "Deploy site" butonuna tıklayın

## Adım 4: Build Ayarları (Otomatik)
- **Build command:** (boş bırakın)
- **Publish directory:** `.` (nokta)
- **Branch:** `main`

## Adım 5: Deploy!
1. "Deploy site" butonuna tıklayın
2. Birkaç saniye içinde siteniz canlı olacak!
3. Netlify size otomatik bir URL verecek (örn: `fitvibe-12345.netlify.app`)

## Otomatik Deploy
Her GitHub'a push yaptığınızda, Netlify otomatik olarak yeni versiyonu deploy edecek!

```bash
git add .
git commit -m "Yeni özellik"
git push
```

## Site URL'i
Deploy tamamlandıktan sonra, Netlify dashboard'da sitenizin URL'ini göreceksiniz.

