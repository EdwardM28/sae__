import { pool } from '../db.js'


export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Algo va mal' });
  }
}

export const getUsuario = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [usuarioId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Algo va mal' });
  }
}


  export const createUsuarios = async (req, res) => {
    const { nombre, correo, contrasena, direccion } = req.body;
    try {
      await pool.query('INSERT INTO usuarios (nombre, correo, contrasena, direccion) VALUES (?, ?, ?, ?)', [nombre, correo, contrasena, direccion]);
      res.json({ message: 'Usuario agregado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }

  export const updateUsuarios = async (req, res) => {
    const usuarioId = req.params.id;
    const { nombre, correo, contrasena, direccion } = req.body;
    try {
      let query = 'UPDATE usuarios SET ';
      const values = [];
  
      if (nombre) {
        query += 'nombre = ?, ';
        values.push(nombre);
      }
  
      if (correo) {
        query += 'correo = ?, ';
        values.push(correo);
      }
  
      if (contrasena) {
        query += 'contrasena = ?, ';
        values.push(contrasena);
      }
  
      if (direccion) {
        query += 'direccion = ?, ';
        values.push(direccion);
      }
  
      query = query.slice(0, -2) + ' WHERE id = ?';
      values.push(usuarioId);
  
      const result = await pool.query(query, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
  
      res.json({ message: 'Usuario actualizado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }


  export const deleteUsuarios = async (req, res) => {
    const usuarioId = req.params.id;
    try {
      const result = await pool.query('DELETE FROM Usuarios WHERE id = ?', [usuarioId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      res.json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }