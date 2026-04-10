import pool from "../database/database.js";
import { errorResponse, successResponse } from "../utils/response.js";

export async function getMovies(req, res) {
  try {
    const [rows] = await pool.query("SELECT * from movies");
    return successResponse(res, rows);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Erro ao buscar filmes", 500);
  }
}

export async function createMovie(req, res) {
  try {
    const { title, year, imdbID, poster_url, status, rating } = req.body;
    if (!title || !year || !imdbID || !status) {
      return errorResponse(res, "Todos os campos são obrigatórios!", 400);
    }

    const [result] = await pool.query(
      `INSERT INTO movies(title, year, imdbID, poster_url, status, rating) VALUES(?, ?, ?, ?, ?, ?)`,
      [title, year, imdbID, poster_url, status, rating],
    );

    return successResponse(
      res,
      {
        message: `O filme ${title} foi adicionado com sucesso!`,
      },
      201,
    );
  } catch (error) {
    return errorResponse(
      res,
      "Não foi possível adicionar o filme à lista",
      500,
    );
  }
}

export async function deleteMovie(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return errorResponse(res, "Nenhum filme foi encontrado", 400);
    }
    const [result] = await pool.query("DELETE FROM movies where id = ?", [id]);
    if (result.affectedRows === 0) {
      return errorResponse(res, "Filme não encontrado", 404);
    }

    return successResponse(
      res,
      {
        message: "Filme excluído com sucesso!",
      },
      200,
    );
  } catch (error) {
    return errorResponse(res, "Erro ao excluir filme", 500);
  }
}

export async function updateMovie(req, res) {
  try {
    const { id } = req.params;
    const { title, year } = req.body;
    if (!id) {
      return errorResponse(res, "ID é obrigatório!", 400);
    }
    if (!title || !year) {
      return errorResponse(res, "Todos os campos devem ser preenchidos", 400);
    }
    const [result] = await pool.query(
      "UPDATE movies SET title = ?, year = ? WHERE id = ?",
      [title, year, id],
    );

    if (result.affectedRows === 0) {
      return errorResponse(res, "Filme não encontrado", 404);
    }

    if (result.changedRows === 0) {
      return successResponse(
        res,
        {
          message: "Nenhuma alteração foi realizada",
        },
        200,
      );
    }

    return successResponse(
      res,
      {
        message: "Alteração realizada com sucesso",
      },
      200,
    );
  } catch (error) {
    return errorResponse(res, "Não foi possível atualizar", 500);
  }
}
