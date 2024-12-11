# Bunime - Anime Watchlist App

Bunime is an anime watchlist application designed to help users search for their favorite anime, track their progress, and manage their anime viewing journey. Built with modern tools and frameworks, Bunime offers a streamlined experience for anime enthusiasts.

## Features
- **Search Anime**: Look up anime from a vast database.
- **Track Progress**: Keep track of where you are in your anime journey.
- **User Authentication**: Securely log in and manage your account.
- **Optimistic Updates**: Enjoy a snappy and responsive user experience.

## Tech Stack Overview

| Technology       | Purpose                          |
|------------------|----------------------------------|
| Bun              | Server runtime and package manager |
| Hono             | Backend framework                  |
| PostgreSQL       | PostgreSQL database (hosted by Neon) |
| Drizzle ORM      | Database access and query builder  |
| Vite             | Frontend build tool                |
| React            | Frontend library                   |
| Tailwind CSS     | CSS framework                      |
| Zod              | Schema validation                  |
| TanStack Query   | Frontend caching and API integration |
| Kinde Auth       | User authentication                |
| Fly.io           | Application hosting                 |

## Project Structure
The project is structured into two main directories:

```
.
├── server/         # Backend server
├── client/         # Frontend client
│   └── src/        # Client source code
├── bun.lockb       # Bun lock file
├── package.json    # Project dependencies
```

## Installation

### Prerequisites
- [Bun](https://bun.sh/) must be installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bunime.git
   cd bunime
   ```

2. Install dependencies for the server:
   ```bash
   bun install
   ```

3. Navigate to the client folder and install dependencies:
   ```bash
   cd client
   bun install
   ```

4. Configure environment variables:
   - Create a `.env` file in the `server` folder and configure database and authentication settings.
   - Create a `.env` file in the `client` folder for frontend environment variables.

## Running the Project

### Backend Server
1. Start the backend server:
   ```bash
   bun run dev
   ```

### Frontend Client
1. Navigate to the `client` folder:
   ```bash
   cd client
   ```

2. Start the development server:
   ```bash
   bun run dev
   ```

3. Open the app in your browser:
   ```
   http://localhost:5173
   ```

## Deployment

### Hosting
- **Server**: Hosted on [Fly.io](https://fly.io/)
- **Frontend**: Hosted via Vite with a proxy setup for the backend.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for review.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Happy tracking your anime journey with Bunime! 🎥✨