const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth.routes");
const courseRoutes = require("./routes/courses.routes");
const lectureRoutes = require("./routes/lectures.routes");
const enrollmentRoutes = require('./routes/enrollments.routes');
const reviewRoutes = require("./routes/reviews.routes");
const paymentRoutes = require("./routes/payments.routes");
const instructorProfileRoutes = require('./routes/instructorProfile.routes');
const categoriesRoutes = require('./routes/categories.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/courses/:courseId/lectures", lectureRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);
app.use('/api/instructor-profiles', instructorProfileRoutes);
app.use("/api/categories", categoriesRoutes)


// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("All the models were synchronized successfully.");
    startServer();
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// server listening
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
  });
};
