import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import routes from "./routes";
import paymentRoutes from "./routes/payment.routes";


dotenv.config();
connectDB();

const app: express.Application = express();

app.use(cors());
// app.use("/payments/webhook", paymentRoutes);
app.use(express.json());
// Route created for APIs
app.use("/api", routes);

export default app;
