# Joe's Movie Database

---

# Movie Management App

A full-stack application to manage a list of movies. You can add, edit, delete, and search for movies.

## Features

- Add new movies
- Edit existing movies
- Delete movies
- List all movies

---

## Technologies

- React
- Node.js
- Express
- MySQL

---

## Screenshots

![screenshot1](https://github.com/Skaikru0518/vizsgak/blob/main/movies/frontend/screenshots/1.png)
![screenshot1](https://github.com/Skaikru0518/vizsgak/blob/main/movies/frontend/screenshots/2.png)
![screenshot1](https://github.com/Skaikru0518/vizsgak/blob/main/movies/frontend/screenshots/3.png)

---

## How to Use

### Backend

1. Go to the backend directory:

   ```sh
   cd ./backend
   npm install
   ```

2. Create a `.env` file with the following content:

   ```
   DB_URI = your database ip
   DB_USR = your database user
   DB_PASS = your database password
   PORT = 2020 # or your express server port
   JWT_SECRET = your jwt secret
   ```

3. Start the backend server:
   ```sh
   npm run backend
   ```

### Frontend

1. Go to the frontend directory:

   ```sh
   cd ./frontend
   npm install
   ```

2. In `apiPath.js`, set:

   ```js
   export const BASE_URL = 'your express url/api';
   ```

   _(Replace `'your express url'` with the actual Express backend URL, e.g. `http://localhost:2020/api`)_

3. Start the frontend:
   ```sh
   npm run dev
   ```

---

## Database Table Structures

### `users` table

| Column Name | Type         | Attributes                            | Description       |
| ----------- | ------------ | ------------------------------------- | ----------------- |
| id          | int(11)      | NOT NULL, AUTO_INCREMENT, PRIMARY KEY | User identifier   |
| username    | varchar(255) | UNIQUE                                | Username          |
| email       | varchar(255) | UNIQUE                                | Email address     |
| PASSWORD    | varchar(255) |                                       | Password (hashed) |

---

### `movies` table

| Column Name | Type         | Attributes                            | Description      |
| ----------- | ------------ | ------------------------------------- | ---------------- |
| id          | int(11)      | NOT NULL, AUTO_INCREMENT, PRIMARY KEY | Movie identifier |
| director    | varchar(255) |                                       | Director         |
| title       | varchar(255) |                                       | Movie title      |
| price       | int(11)      |                                       | Price (HUF)      |
| image       | varchar(255) |                                       | Image URL        |

---

### `favourites` table

| Column Name | Type    | Attributes                            | Description         |
| ----------- | ------- | ------------------------------------- | ------------------- |
| id          | int(11) | NOT NULL, AUTO_INCREMENT, PRIMARY KEY | Favourite record ID |
| user_id     | int(11) | FOREIGN KEY (`users`.`id`)            | User identifier     |
| movie_id    | int(11) | FOREIGN KEY (`movies`.`id`)           | Movie identifier    |

**Indexes and Relationships:**

- `favourites.user_id` is a foreign key referencing `users.id`
- `favourites.movie_id` is a foreign key referencing `movies.id`

---

**Character Set:**  
All tables use `utf8mb4_general_ci`

**Engine:**  
All tables use `InnoDB`
