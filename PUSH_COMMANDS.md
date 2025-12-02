# GitHub'a Push Etme Komutları

GitHub'a push etmek için terminal'de şu komutları çalıştırın:

```bash
cd /Users/alitektas/Desktop/sena
git push -u origin main
```

Eğer authentication hatası alırsanız:

## Seçenek 1: Personal Access Token Kullanın

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token (classic)" tıklayın
3. Token'a bir isim verin (örn: "fitvibe-deploy")
4. `repo` yetkisini seçin
5. "Generate token" tıklayın
6. Token'ı kopyalayın
7. Push yaparken şifre yerine bu token'ı kullanın

## Seçenek 2: SSH Kullanın

Eğer SSH key'iniz varsa:

```bash
git remote set-url origin git@github.com:egetaktim/fitvibe.git
git push -u origin main
```

## Push Sonrası

Push başarılı olduktan sonra, Netlify'da deploy edebiliriz!

