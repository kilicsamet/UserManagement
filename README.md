# User Management

## Teknolojiler
- NestJS
- MySQL
- React

### Gereksinimler
- Node.js (v14 veya üstü)
- MySQL (v5.7 veya üstü)

### Depoyu Klonlayın:

    ```
     clone https://github.com/kullaniciadi/proje-adi.git

    ```
  
## Backend Projesini Çalıştırma

### Kurulum Adımları

   cd backend

 **Projeyi Başlatma:**

    ```
   npm run start

    ```
## Frontend Projesini Çalıştırma

### Kurulum Adımları

   cd Frontend

 **Projeyi Başlatma:**

    ```
   npm run dev

    ```

## Proje Özeti

Bu proje, **Node.js** ve **Nest.js** kullanarak bir RESTful API geliştirmeyi ve **React** ile etkileşimde bulunacak bir frontend uygulaması oluşturmayı amaçlıyor.

## Backend

- **Veritabanı**: MySQL veya PostgreSQL. ORM kullanılmadan query builder ile işlem yapılacak.
- **API Endpoint'leri**:
  1. **GET /users**: Tüm kullanıcıları paginasyon ve arama ile döndürür.
  2. **GET /users/**: Belirli bir kullanıcıyı döndürür.
  3. **POST /users/save**: Yeni kullanıcı verilerini encrypt ederek kaydeder.
  4. **POST /users/update/<id>**: Mevcut kullanıcı verilerini günceller.
  5. **POST /users/delete/<id>**: Mevcut kullanıcıyı siler.

## Frontend

- **Teknoloji**: React (Ant Design).
- **Özellikler**:
  1. Kullanıcı verilerinin listelenmesi.
  2. Arama input'u.
  3. Kayıt düzenleme.
  4. Yeni kayıt ekleme, güncelleme ve silme.