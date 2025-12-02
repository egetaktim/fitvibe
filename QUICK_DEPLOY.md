# Hızlı Deploy - Netlify Drop

## En Hızlı Yol (2 Dakika)

1. **Netlify Drop'a gidin:**
   https://app.netlify.com/drop

2. **Dosyaları sürükleyin:**
   - index.html
   - styles.css
   - script.js
   - netlify.toml
   
   Bu 4 dosyayı tarayıcı penceresine sürükleyip bırakın.

3. **Hazır!**
   Netlify size otomatik olarak bir link verecek (örn: `random-name-12345.netlify.app`)

## Alternatif: GitHub + Netlify (Otomatik Deploy)

1. GitHub'da repository oluşturun
2. Şu komutları çalıştırın:
```bash
cd /Users/alitektas/Desktop/sena
git remote add origin https://github.com/KULLANICI_ADINIZ/fitvibe.git
git push -u origin main
```
3. Netlify'da "New site from Git" seçin
4. Repository'nizi bağlayın
5. Deploy!

Bu yöntemle her GitHub'a push yaptığınızda otomatik deploy olur.

