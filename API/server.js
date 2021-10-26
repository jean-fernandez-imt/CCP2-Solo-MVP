const express = require('express');
const cors = require('cors')
const path = require('path');

const { PrismaClient } =  require('@prisma/client');
const prisma = new PrismaClient()

const app = express();

// Server Middleware
app.use(express.json());
app.use(cors()); 

// API Basic Interface
app.get("/api", (req, res) => {
  res.sendFile(path.resolve(__dirname, "api.html"));
});

/* Projects CRUD Operations */
// Get all projects information
app.get("/api/projects", async (req, res) => {
  const result = await prisma.project.findMany({
    include: {
      items: true,
    }
  });

  res.json(result);
});

// Get project by Id
app.get("/api/project/:id", async (req, res) => {
  const { id } = req.params;

  const result = await prisma.project.findUnique({
    where: {
      id: id,
    },
    include: {
      items: true,
    }
  });

  res.json(result);
});

// Create a new project
app.options('/api/project', cors());
app.post("/api/project", cors(), async (req, res) => {
  const { name } = req.body;

  const result = await prisma.project.create({
    data: {
      name: name,
    }
  });

  res.json(result);
});

// Update a project
app.options('/api/project/:id', cors());
app.put('/api/project/:id', cors(), async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedProject = await prisma.project.update({
      where: { 
        id: id, 
      },
      data: {
        name: name
      },
    });

    res.json(updatedProject);
  } catch (error) {
    res.json({ error: `Project with ID ${id} could not be updated.` });
  }
});

// Delete a project
app.delete(`/api/project/:id`, cors(), async (req, res) => {
  const { id } = req.params;

  const result = await prisma.project.delete({
    where: {
      id: id,
    }
  });

  res.json(result);
});

/* Items CRUD Operations */
// Create a new item in a project
app.post("/api/item", async (req, res) => {
  const { name, manufacturer, provider, price, description, projectId } = req.body;

  const result = await prisma.item.create({
    data: {
      name: name,
      manufacturer: manufacturer,
      provider: provider,
      price: price,
      description: description,
      project: {
        connect: {
          id: projectId,
        }
      }
    }
  });

  res.json(result);
});

// Update an item in a project
app.put('/api/item/:id', async (req, res) => {
  const { id } = req.params;
  const { name, manufacturer, provider, price, description } = req.body;

  try {
    const updatedItem = await prisma.item.update({
      where: { 
        id: id, 
      },
      data: {
        name: name,
        manufacturer: manufacturer,
        provider: provider,
        price: price,
        description: description
      },
    });

    res.json(updatedItem);
  } catch (error) {
    res.json({ error: `Item with ID ${id} could not be updated.` });
  }
});

// Delete an item from a project
app.delete(`/api/item/:id`, async (req, res) => {
  const { id } = req.params;

  const result = await prisma.item.delete({
    where: {
      id: id,
    }
  });

  res.json(result);
});

(() => {
  try {
    app.listen(process.env.PORT || 3000, () => {
      if (process.env.PORT) {
        console.log(`API listening on port ${process.env.PORT}!`);
      } else {
        console.log(`Server running on http://localhost:3000`);
      }
    }
    );
  } catch (err) {
    console.error("Error starting API!", err);
    process.exit(-1);
  }
})();