import dotenv from "dotenv";

dotenv.config();

export default {
  app:{
    
  },
  mongodb: {
    connection: "mongodb://localhost:27017",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
};
