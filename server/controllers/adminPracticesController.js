import { pool } from "../db.js";

/*Obtenemos todos las prácticas de la db*/
export const getPractices = async (req, res) => {
  try {
    const [result] = await pool.query(`
        SELECT *
        FROM practicas;`);
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const createPractice = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const [result] = await pool.query(
      `INSERT INTO 
        practicas 
        (nombre,descripcion)
        VALUES
        (?,?)`,
      [nombre, descripcion]
    );
    res.send(result.data);
  } catch (error) {
    res.send(error);
  }
};

export const getPractice = async (req, res) => {
  const search = req.query.search
  try {
    const [result] = await pool.query(
      `SELECT * 
        FROM practicas
        WHERE id = (?)`,
      [search]
    );
    res.send(result)
  } catch (error) {
    res.send(error);
  }
};

export const updatePractice = async (req, res) => {
  try {
    const columnsToUpdate = Object.keys(req.body)
      .map((key) => `${key} = ?`)
      .join(", ");
    const [result] = await pool.query(
      `UPDATE practicas
        SET ${columnsToUpdate}
        WHERE id = (?)`,
        [...Object.values(req.body), req.params.id]
    );
    if (result.affectedRows > 0) {
      // Send a success response with additional information
      res.send({
        success: true,
        message: "Update successful",
        updatedRows: result.affectedRows,
      });
    } else {
      res.send({
        success: true,
        message: "No rows updated",
      });
    }
  } catch (error) {
    // Send an error response with details
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error updating DataBase",
      error: {
        code: error.code,
        errno: error.errno,
        message: error.message,
      },
    });
  }
};

export const deletePractice = async(req,res) =>{
    try {
        const [result] = await pool.query(`DELETE FROM
        practicas
        WHERE
        id = ?`,[req.params.id]);
        res.send(result.status)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
};
