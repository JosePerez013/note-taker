// Requiring our express module and routes
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlroutes.js");

// Creating port (use this port number throughout)
const app = express();
const PORT = process.env.PORT || 3000;

// route middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Get the express server started and lisening to the 3000 port.
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
