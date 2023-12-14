const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({ datasources: {  db: { url: "mysql://postgresql://postgres:postgres@localhost:5432/postgres?schema=public" } } });
const app = express();

//json
app.use(express.json());

//cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

//test api
app.get("/test", (req, res) => {
    try {
        res.status(200).json({ message: "API is working" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get all notes
app.get("/notes", async (req, res) => {
    try {
        const notes = await prisma.note.findMany();
        res.status(200).json(notes);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get a note by id
app.get("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const note = await prisma.note.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json(note);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// create note
app.post("/notes", async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await prisma.note.create({
            data: {
                title,
                content,
            },
        });
        res.status(201).json(note);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// update note
app.put("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const note = await prisma.note.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                content,
            },
        });
        res.status(200).json(note);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// delete note
app.delete("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const note = await prisma.note.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json(note);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));