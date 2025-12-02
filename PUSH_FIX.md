# Git Push Sorunu Çözümü

## Sorun
Git config'de farklı kullanıcı var (federmaa) ama repository egetaktim hesabına ait.

## Çözüm 1: Personal Access Token (En Kolay)

1. **Token Oluşturun:**
   - https://github.com/settings/tokens adresine gidin
   - "Generate new token (classic)" tıklayın
   - Token'a isim verin: "fitvibe-push"
   - `repo` yetkisini seçin
   - "Generate token" tıklayın
   - Token'ı kopyalayın (bir daha gösterilmeyecek!)

2. **Push Yapın:**
   ```bash
   cd /Users/alitektas/Desktop/sena
   git push origin main
   ```
   
   - Username: `egetaktim`
   - Password: Token'ı yapıştırın

## Çözüm 2: GitHub Desktop

1. GitHub Desktop'u açın
2. Repository'yi ekleyin: File → Add Local Repository
3. `/Users/alitektas/Desktop/sena` klasörünü seçin
4. "Publish repository" veya "Push origin" butonuna tıklayın

## Çözüm 3: SSH Key (Kalıcı Çözüm)

Eğer SSH key'iniz varsa:

```bash
cd /Users/alitektas/Desktop/sena
git remote set-url origin git@github.com:egetaktim/fitvibe.git
git push origin main
```

## Çözüm 4: Git Credential Helper

Kimlik bilgilerini kaydetmek için:

```bash
git config --global credential.helper osxkeychain
git push origin main
```

Sonra username ve token'ı girin, bir daha sormayacak.

