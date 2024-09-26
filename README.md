# User Management

## Teknolojiler
- NestJS
- MySQL
- React

### Gereksinimler
- Node.js (v14 veya üstü)
- MySQL (v5.7 veya üstü)

# `Depoyu Klonlayın`

```
clone https://github.com/kullaniciadi/proje-adi.git
```
  
## Backend Projesini Çalıştırma

### Kurulum Adımları

   cd backend

 # `Projeyi Başlatma`

```
npm run start
 ```
## Frontend Projesini Çalıştırma

### Kurulum Adımları

   cd Frontend

 # `Projeyi Başlatma`

 ```
 npm run dev
```

## Proje Özeti

Bu proje, **Node.js** ve **Nest.js** kullanarak bir RESTful API geliştirmeyi ve **React** ile etkileşimde bulunacak bir frontend uygulaması oluşturmayı amaçlıyor.

## Backend

- **Veritabanı**: MySQL veya PostgreSQL. ORM kullanılmadan query builder ile işlem yapılacak.

- **API Endpoint'leri**:

  - **GET /users**: Tüm kullanıcıları paginasyon ve arama ile döndürür.
  - **GET /users/**: Belirli bir kullanıcıyı döndürür.
  - **POST /users/save**: Yeni kullanıcı verilerini encrypt ederek kaydeder.
  - **POST /users/update/<id>**: Mevcut kullanıcı verilerini günceller.
  - **POST /users/delete/<id>**: Mevcut kullanıcıyı siler.

## Frontend

- **Teknoloji**: React (Ant Design).

- **Özellikler**:

  - Kullanıcı verilerinin listelenmesi.
  - Arama input'u.
  - Kayıt düzenleme.
  - Yeni kayıt ekleme, güncelleme ve silme.