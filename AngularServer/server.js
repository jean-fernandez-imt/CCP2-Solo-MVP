const express = require('express');
const path = require('path');

const { PrismaClient } =  require('@prisma/client');
const prisma = new PrismaClient()

const app = express();
app.use(express.json())

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "dist", "CCP2-Solo-MVP")));

// From here it will get redirected to "/manager"
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "dist", "CCP2-Solo-MVP", "index.html"));
});

// API Basic Interface
app.get("/api", (req, res) => {
  res.sendFile(path.resolve(__dirname, "api.html"));
});

/* Projects CRUD Operations */
// Get all projects information
app.get("/api/projects", async (req, res) => {
  const result = await prisma.project.findMany({
    include: {
      Items: true,
    }
  });

  res.json(result);
});

// Get project by Id
app.get("/api/project/:id", async (req, res) => {
  const { id } = req.params;

  const result = await prisma.project.findUnique({
    where: {
      Id: id,
    },
    include: {
      Items: true,
    }
  });

  res.json(result);
});

// Create a new project
app.post(`/project`, async (req, res) => {
  const { name } = req.body;

  const result = await prisma.project.create({
    data: {
      Name: name,
    }
  });

  res.json(result);
});

// Delete a project
app.delete(`/project/:id`, async (req, res) => {
  const { id } = req.params;

  const result = await prisma.project.delete({
    where: {
      Id: id,
    }
  });

  res.json(result);
});

(() => {
  try {
    app.listen(process.env.PORT || 8080, () => {
      if (process.env.PORT) {
        console.log(`App listening on port ${process.env.PORT}!`);
      } else {
        console.log(`Server running on http://localhost:8080`);
      }
    }
    );
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();