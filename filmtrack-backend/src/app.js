import express from "express";
import cors from "cors";
import router from "./router/movies.js"

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.use("/", router);
console.log("Teste servidor");

export default app;
