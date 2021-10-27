const express = require('express');
const path = require('path');

const { PrismaClient } =  require('@prisma/client');
const prisma = new PrismaClient()

const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "dist", "CCP2-Solo-MVP")));

// From here it will get redirected to "/manager"
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "dist", "CCP2-Solo-MVP", "index.html"));
});

(() => {
  try {
    app.listen(process.env.PORT || 5000, () => {
      if (process.env.PORT) {
        console.log(`App listening on port ${process.env.PORT}!`);
      } else {
        console.log(`App running on http://localhost:5000`);
      }
    }
    );
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();