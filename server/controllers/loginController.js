import { pool } from "../db.js";

export const login = async(req,res) => {
    try {
        const [result] = await pool.query(`
        SELECT concat_ws(" ", nombre,apellido_1,apellido_2) as nombre, rol.rol
        from usuario
        INNER JOIN rol on usuario.rol_id = rol.id
        WHERE usuario.codigo = ?;
        `,[req.codigo])

        res.send(result);
    } catch (error) {
        res.send([error.code, error.errno]);
    }
}