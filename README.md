
```md
# 🛒 Freshcart MERN

A full-stack e-commerce grocery application built with the **MERN stack**: **MongoDB**, **Express.js**, **React**, and **Node.js**. It features secure authentication, dynamic product browsing, cart management, and order placement.

---

## 🚀 Features

### 🖥️ Frontend
- Built with **React**
- **React Router** for client-side navigation
- **JWT-based authentication**
- Product listing, filtering, and searching
- Shopping cart and checkout

### 🔧 Backend
- **Node.js** and **Express** server
- **MongoDB** with **Mongoose** for data modeling
- RESTful API endpoints
- **JWT authentication** with user roles (Admin / Customer)
- Product management (CRUD)
- Protected routes and middleware

---

## 📁 Project Structure

```

freshcart-mern/
├── client/              # React frontend
│   ├── src/
│   └── ...
├── server/              # Node + Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── ...
├── .gitignore
├── package.json
└── README.md

````

---

## 💻 How to Run Locally

### 🛠️ Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

---

### 📦 Step 1: Clone the Repository

```bash
git clone https://github.com/Samarahul/Freshcart-mern.git
cd Freshcart-mern
````

---

### 🔧 Step 2: Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the server:

```bash
npm run dev
```

---

### 🎨 Step 3: Setup Frontend

```bash
cd ../client
npm install
npm start
```

> 🖥️ React app runs on: `http://localhost:3000`
> 🛠️ API runs on: `http://localhost:5000`

---

## 🔐 Environment Variables

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## 🛠️ Tech Stack

| Technology | Description           |
| ---------- | --------------------- |
| React      | Frontend library      |
| Node.js    | Backend runtime       |
| Express.js | Backend framework     |
| MongoDB    | NoSQL database        |
| Mongoose   | MongoDB ODM           |
| JWT        | Authentication system |

---

## ✅ To-Do

* [ ] Admin dashboard
* [ ] Product image uploads
* [ ] Payment integration
* [ ] Unit & integration tests

---

---

## 🙌 Author

**S Rahul** — [GitHub](https://github.com/Samarahul)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```
