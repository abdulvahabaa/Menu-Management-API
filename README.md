# Menu Management API

This API allows users to manage menus and menu items. It supports CRUD operations for menus and menu items.

 <div>
    <img src="https://img.shields.io/badge/-Node JS-black?style=for-the-badge&logoColor=white&logo=Node.js&color=green" alt="Node.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=TypeScript&color=blue" alt="Typescript" />
    <img src="https://img.shields.io/badge/-Mongodb-black?style=for-the-badge&logoColor=white&logo=Mongodb&color=darkgreen" alt="Mongodb" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=black&logo=Prisma&color=grey" alt="tailwindcss" />
  </div>

---

## 📋 Table of Contents

- [Menu Management API](#menu-management-api)
  - [📋 Table of Contents](#-table-of-contents)
  - [⚙️ Technologies Used](#️-technologies-used)
  - [🌐 Live API](#-live-api)
  - [🔧 Project Setup](#-project-setup)
    - [Prerequisites](#prerequisites)
    - [🚀 Installation Steps](#-installation-steps)
  - [📚 API Endpoints](#-api-endpoints)
    - [Menu Endpoints](#menu-endpoints)
      - [1. Create a Menu](#1-create-a-menu)
      - [2. Get All Menus](#2-get-all-menus)
      - [3. Get a Menu by ID](#3-get-a-menu-by-id)
      - [4. Update a Menu](#4-update-a-menu)
      - [5. Delete a Menu](#5-delete-a-menu)
    - [Menu Item Endpoints](#menu-item-endpoints)
      - [1. Add a Menu Item](#1-add-a-menu-item)
      - [2. Update a Menu Item](#2-update-a-menu-item)
      - [3. Delete a Menu Item](#3-delete-a-menu-item)
  - [📊 Database Schema](#-database-schema)
    - [Menu](#menu)
    - [MenuItem](#menuitem)
  - [🛠️ Sample .env File](#️-sample-env-file)

## ⚙️ Technologies Used

- Backend: **Node.js**, **Express.js**, **TypeScript**
- Database: **MongoDB**, **Prisma ORM**

---
## 🌐 Live API

You can access the live API at [https://menu-management-api-eight.vercel.app/menus](https://menu-management-api-eight.vercel.app/menus).

---
## 🔧 Project Setup

### Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/).
- **MongoDB**: Set up a MongoDB database.

---

### 🚀 Installation Steps

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:

   ```plaintext
   DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority"
   PORT=3000
   ```

   Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your MongoDB details.

4. **Start the Server**:

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:3000`.

---


## 📚 API Endpoints

### Menu Endpoints

#### 1. Create a Menu

**POST** `http://localhost:3000/menus`

**Request Body**:

```json
{
  "menuName": "string",
  "description": "string"
}
```

**Response**:

```json
{
  "id": "string",
  "menuName": "string",
  "description": "string"
}
```

---

#### 2. Get All Menus

**GET** `http://localhost:3000/menus`

**Response**:

```json
[
  {
    "id": "string",
    "menuName": "string",
    "description": "string",
    "items": [
      {
        "id": "string",
        "itemName": "string",
        "description": "string",
        "price": 100
      }
    ]
  }
]
```

---

#### 3. Get a Menu by ID

**GET** `http://localhost:3000/menus/:menuId`

**Response**:

```json
{
  "id": "string",
  "menuName": "string",
  "description": "string",
  "items": [
    {
      "id": "string",
      "itemName": "string",
      "description": "string",
      "price": 100
    }
  ]
}
```

---

#### 4. Update a Menu

**PATCH** `http://localhost:3000/menus/:menuId`

**Request Body**:

```json
{
  "menuName": "string",
  "description": "string"
}
```

**Response**:

```json
{
  "id": "string",
  "menuName": "string",
  "description": "string"
}
```

---

#### 5. Delete a Menu

**DELETE** `http://localhost:3000/menus/:menuId`

**Response**:

```json
{
  "message": "Menu deleted successfully."
}
```

---

### Menu Item Endpoints

#### 1. Add a Menu Item

**POST** `http://localhost:3000/menus/:menuId/items`

**Request Body**:

```json
{
  "itemName": "string",
  "description": "string",
  "price": 100
}
```

**Response**:

```json
{
  "id": "string",
  "itemName": "string",
  "description": "string",
  "price": 100,
  "menuId": "string"
}
```

---

#### 2. Update a Menu Item

**PATCH** `http://localhost:3000/menus/:menuId/items/:itemId`

**Request Body**:

```json
{
  "itemName": "string",
  "description": "string",
  "price": 100
}
```

**Response**:

```json
{
  "id": "string",
  "itemName": "string",
  "description": "string",
  "price": 100,
  "menuId": "string"
}
```

---

#### 3. Delete a Menu Item

**DELETE** `http://localhost:3000/menus/:menuId/items/:itemId`

**Response**:

```json
{
  "message": "Menu item deleted successfully."
}
```

---

## 📊 Database Schema

### Menu

| Field         | Type     |
| ------------- | -------- |
| `id`          | ObjectId |
| `menuName`    | String   |
| `description` | String   |

### MenuItem

| Field         | Type     |
| ------------- | -------- |
| `id`          | ObjectId |
| `menuId`      | ObjectId |
| `itemName`    | String   |
| `description` | String   |
| `price`       | Int      |

---

## 🛠️ Sample .env File

```plaintext
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority"
PORT=3000
```

Replace `<username>`, `<password>`, `<cluster>`, and `<database>` with your MongoDB connection details.

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=60&section=footer"/>
</p>
