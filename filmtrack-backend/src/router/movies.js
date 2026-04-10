import { Router } from "express";
import { getMovies, createMovie, deleteMovie, updateMovie} from "../controller/movieController.js";

const router = Router();

router.get("/movies", getMovies);
router.post("/movies", createMovie);
router.delete("/movies/:id", deleteMovie);
router.put("/movies/:id", updateMovie);

export default router;
