import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the E-Commerce API 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
