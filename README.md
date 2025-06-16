# 📋 Booxee — Task & Notes Management Web App

Booxee is a smart, minimalistic productivity web app designed to help individuals **manage tasks, notes, and daily focus**. It's built with modern web technologies (React + Express + MongoDB) and includes powerful features like **dynamic dashboards**, **note linking**, and **command automation**.

---

## 🌟 Features

- ✅ **User Registration & Login** with JWT auth
- 🗂️ **Task Lists** with priority, date, and time
- 📝 **Note Lists** with rich content and categories
- 📆 **Today Tasks** dashboard widget
- 🧠 **Recent Notes** widget
- 🖼️ **Mobile Responcive** UI
- ⚙️ In development:
  - AI assistant for smart suggestions
  - Scripting system for productivity automation
  - Personal dashboard customization

---

## 📸 Screenshots (coming soon)
<!-- Add screenshots here if available -->

---

## 🚀 Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Frontend    | React + Vite        |
| Backend     | Express + Node.js   |
| Database    | MongoDB + Mongoose  |
| Auth        | JWT (JSON Web Token)|
| Validation  | express-validator   |

---

## 📁 Project Structure

| Directory   | Description            |
|-------------|------------------------|
| /client     | # React frontend (Vite) |
| /components |                        |
| /pages  |                        |
| /server        | # Express backend      |
| /models  |     |
| /routes  |     |
| /middlewares  |     |

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/booxee.git
cd booxee
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run backend

```bash
npm run server:dev
```

### 4. Run frontend

```bash
npm run dev
```

Frontend: `https://booxee-app.vercel.app/`  
Backend API: `https://booxee-server.onrender.com/api`

---

## 📦 API Routes

### Auth
- `POST /api/auth/register` — Register user  
- `POST /api/auth/login` — Login user  

### Task Lists
- `GET /api/tasklists`  
- `POST /api/tasklists`  

### Notes
- `GET /api/notelists`  
- `POST /api/notelists`  

(*Full API documentation coming soon*)

---

## 📌 Roadmap

- [x] Registration & Login system  
- [x] Task & Note List models  
- [x] Dashboard widgets  
- [ ] AI assistant for suggestions  
- [ ] Command/script automation  
- [x] Mobile responsive UI  
- [ ] Dark/light mode toggle  

---

## 📄 License

This project available under the All rights **reserved** license.

---

## 🙌 Author

**Booxee** was created with ❤️ by Artem Yablunin.
