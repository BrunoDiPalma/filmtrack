import { Router } from "express";
import { getMovies, createMovie, deleteMovie, updateMovie} from "../controller/movieController.js";

const router = Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.delete("/:id", deleteMovie);
router.put("/:id", updateMovie);

export default router;
