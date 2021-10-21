const express = require('express');
const path = require('path');

const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "dist", "ng-blog")));

// Always return the main index.html, since we are developing a single page application
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "dist", "ng-blog", "index.html"));
});

(() => {
  try {
    app.listen(process.env.PORT || 8080, () =>
      console.log(`App listening on port ${process.env.PORT}!`)
    );
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();