import { pool } from '../db.js'

export const getCarrito = async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM carrito');
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }
  
  export const getcarrito = async (req, res) => {
    const carritoId = req.params.id;
    try {
      const [rows] = await pool.query('SELECT * FROM carrito WHERE id = ?',  carritoId);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
      }
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }
  
  
  export const createCarrito = async (req, res) => {
    const { usuario_id, producto_id, cantidad } = req.body;
    try {
      await pool.query('INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)', [usuario_id, producto_id, cantidad]);
      res.json({ message: 'Carrito agregado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }

  export const updateCarrito = async (req, res) => {
    const carritoId = req.params.id;
    const { usuario_id, producto_id, cantidad } = req.body;
    try {
      let query = 'UPDATE carrito SET ';
      const values = [];
  
      if (usuario_id !== undefined) {
        query += 'usuario_id = ?, ';
        values.push(usuario_id);
      }
  
      if (producto_id !== undefined) {
        query += 'producto_id = ?, ';
        values.push(producto_id);
      }
  
      if (cantidad !== undefined) {
        query += 'cantidad = ?, ';
        values.push(cantidad);
      }
  
      if (values.length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron datos para actualizar.' });
      }
  
      query = query.slice(0, -2) + ' WHERE id = ?';
      values.push(carritoId);
  
      const result = await pool.query(query, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Carrito no encontrado.' });
      }
  
      res.json({ message: 'Carrito actualizado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }
  

      export const deleteCarrito = async (req, res) => {
        const carritoId = req.params.id;
        try {
          const result = await pool.query('DELETE FROM carrito WHERE id = ?', [carritoId]);
          if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Carrito no encontrado.' });
          }
          res.json({ message: 'Carrito eliminado correctamente.' });
        } catch (error) {
          return res.status(500).json({ message: 'Algo va mal' });
        }
      }