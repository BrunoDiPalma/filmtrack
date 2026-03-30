import pool from "../database/database.js";

export async function getMovies(req, res) {
  try {
    const [rows] = await pool.query("SELECT * from movies");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
}

export async function createMovie(req, res) {
  try {
    const { title, genre } = req.body;

    const [result] = await pool.query(
      `INSERT INTO movies (title, genre)
            VALUES(?, ?)`,
      [title, genre],
    );

    console.log(result);

    return res
      .status(201)
      .json({ message: `Filme ${title} adicionado com sucesso!` });
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar filme" });
  }
}

export async function deleteMovie(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM movies WHERE ID = ?", [id]);
    return res.status(200).json({ message: "Filme excluído com sucesso!" });
  } catch (error) {
    return res.status(404).json({ error: "Erro ao excluir filme" });
  }
}

export async function updateMovie(req, res) {
  try {
    const { id } = req.params;
    const { title, genre } = req.body;

    const [result] = await pool.query(
      "UPDATE movies SET title = ?, genre = ? WHERE id = ?",
      [title, genre, id],
    );

    return res.status(200).json({ message: "Filme atualizado com sucesso!"})
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar filme" });
  }
}