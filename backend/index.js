  const express = require('express');
  const cors = require('cors');
  const { sequelize } = require('./models')
  const authRoutes = require('./routes/auth.routes');
  const courseRoutes = require('./routes/courses.routes');
  const lectureRoutes = require('./routes/lectures.routes');

  const app = express();
  const PORT = process.env.PORT || 3000;  

  // Middleware
  app.use(cors());    
  app.use(express.json());

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/courses', courseRoutes);
  app.use('/api/courses/:courseId/lectures', lectureRoutes);


  // Database connection
  sequelize.authenticate()
  .then(() => {
      console.log('Database connected successfully');
      return sequelize.sync({ alter: true});
  })
  .then(() => {
      console.log('All the models were synchronized successfully.');
      startServer();
  })
  .catch((error) => {
      console.error('Unable to connect to the database:', error); 
  })


  // server listening
  const startServer = () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  }
