import express from 'express';
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Running..."
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes)

export default app;