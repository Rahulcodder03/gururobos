Gururobos Backend (Contacts + Admin)
===================================

Setup:
1. Copy .env.example to .env and set MONGO_URI and JWT_SECRET
2. npm install
3. npm run seed   # to create default admin (admin@gururobos.com / Admin@123)
4. npm run dev    # or npm start

API:
- POST /api/contacts                create contact (public)
- POST /api/admin/login             admin login -> returns { token }
- GET /api/contacts?search=&page=.. (admin only)
- GET /api/contacts/:id             (admin only)
- PUT /api/contacts/:id             (admin only)
- DELETE /api/contacts/:id          (admin only)

Auth:
- Protected routes require header: Authorization: Bearer <token>

