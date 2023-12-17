## MyNote - A Note-Taking Application

MyNote is a personal note-taking application built with Next.js, Express, PostgreSQL, Prisma, and Docker. It provides a simple and convenient way to create, edit, and manage your notes.

### Features

* Create, edit, and delete notes
* Update the notes using ID

### Technologies

* **Frontend:** Next.js
* **Backend:** Express
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Containerization:** Docker
* **TypeScript:** For type safety

### Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/subrajeet-maharana/my-notes.git
```

2. **Navigate to the project directory:**

```bash
cd my-notes
```

3. **Install dependencies:**

```bash
npm install
```

4. **Build the frontend:**

```bash
npm run build
```

5. **Start the backend:**

```bash
npm run dev
```

6. **Open the application in your browser:**

```bash
open http://localhost:3000
```

### Run Using Docker

**Build commands:**

1. **Build frontend and backend images:**

   ```bash
   docker-compose build frontend backend
   ```

**Run commands:**

1. **Start all containers:**

   ```bash
   docker-compose up -d
   ```

Once all the containers are running, you can access the application in your browser by opening `http://localhost:4000`.

