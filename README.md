# Secret Christmas Cookie Recipes API

This project is a Node.js and Express API for securely managing secret Christmas cookie recipes. Users can register, log in, and store their own cookie recipes. The API is built with TypeScript and uses JWT for authentication and authorization.

## Features

- **User Registration**: Register new users with hashed passwords.
- **User Login**: Log in users with JWT-based authentication.
- **Recipe Storage**: Store and retrieve secret cookie recipes.
- **JWT Authentication**: Secure access to protected routes with JSON Web Tokens.
- **Data Storage**: Stores user data and recipes in a in memory variable.

## Project Structure

```
project/
├── src/
│   ├── index.ts           # Main server file
│   ├── auth.ts            # JWT handling and authentication functions
│   ├── routes.ts          # API routes
│   ├── services/
│   │   ├── user.service.ts   # User-related functionality
│   │   └── cookie.service.ts # Recipe-related functionality
├── .env                   # Environment variables (JWT secret, etc.)
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies and scripts
└── README.md              # Project README file
```

## Requirements

- Node.js and npm installed
- A text editor or IDE (like VS Code)
- Postman (for API testing) or another API client

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/rajuAhmed1705/secret-cookie-recipe.git
   cd secret-cookie-recipe
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the project root and add the following:
     ```plaintext
     JWT_SECRET_KEY=your_secret_key
     PORT=3000
     ```
   - Replace `your_secret_key` with a strong secret key.

## Scripts

- **`npm run dev`**: Start the server in development mode (using `nodemon` for auto-reloading).
- **`npm run build`**: Compile TypeScript files to JavaScript.
- **`npm start`**: Start the compiled server in production mode.

## API Documentation

### Endpoints

1. **Register a New User**

   - **URL**: `/register`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "username": "testuser",
       "password": "password123"
     }
     ```
   - **Response**: `{ "message": "User registered successfully" }`

2. **Login**

   - **URL**: `/login`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
       "username": "testuser",
       "password": "password123"
     }
     ```
   - **Response**:
     ```json
     {
       "token": "your_jwt_token"
     }
     ```

3. **Store a Recipe (Protected Route)**

   - **URL**: `/recipe`
   - **Method**: `POST`
   - **Headers**:
     - `Authorization`: `Bearer <your_jwt_token>`
   - **Body**:
     ```json
     {
       "recipe": "add some flour and eggs"
     }
     ```
   - **Response**: `{ "message": "Recipe stored successfully!" }`

4. **Access Protected Recipe (Protected Route)**

   - **URL**: `/secret`
   - **Method**: `GET`
   - **Headers**:
     - `Authorization`: `Bearer <your_jwt_token>`
   - **Response**:
     ```json
     {
       "recipe": "your recipe"
     }
     ```

### Authentication

- **JWT Token**: The token must be provided in the `Authorization` header as `Bearer <token>` to access protected routes.

## Development Notes

- **Environment Variables**: Set `JWT_SECRET_KEY` in `.env` for JWT signing.
- **Data Persistence**: This project uses a JSON file (`users.json`) for simplicity, which resets when the server stops.
- **Error Handling**: The project includes basic error handling, with responses sent as JSON objects for easier API debugging.

## License

This project is licensed under the MIT License.
