import { pool } from '../db.js'


export const getPedidos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Algo va mal' });
  }
}

export const getPedido = async (req, res) => {
  const productId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [productId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Algo va mal' });
  }
}


  export const createPedidos = async (req, res) => {
    const { usuario_id, fecha_pedido, estado } = req.body;
    try {
      await pool.query('INSERT INTO pedidos (usuario_id, fecha_pedido, estado) VALUES (?, ?, ?)', [usuario_id, fecha_pedido, estado]);
      res.json({ message: 'Pedido agregado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }

  export const updatePedidos = async (req, res) => {
    const pedidoId = req.params.id;
    const { usuario_id, fecha_pedido, estado } = req.body;
  
    try {
      // Verifica si el pedido existe antes de actualizarlo
      const [existingPedido] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [pedidoId]);
  
      if (existingPedido.length === 0) {
        return res.status(404).json({ error: 'Pedido no encontrado.' });
      }
  
      let query = 'UPDATE pedidos SET ';
      const values = [];
  
      if (usuario_id !== undefined) {
        query += 'usuario_id = ?, ';
        values.push(usuario_id);
      }
  
      if (fecha_pedido !== undefined) {
        query += 'fecha_pedido = ?, ';
        values.push(fecha_pedido);
      }
  
      if (estado !== undefined) {
        query += 'estado = ?, ';
        values.push(estado);
      }
  
      query = query.slice(0, -2) + ' WHERE id = ?';
      values.push(pedidoId);
  
      const result = await pool.query(query, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Pedido no encontrado.' });
      }
  
      res.json({ message: 'Pedido actualizado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal.' });
    }
  }


  export const deletePedidos = async (req, res) => {
    const productId = req.params.id;
    try {
      const result = await pool.query('DELETE FROM pedidos WHERE id = ?', [productId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Pedido no encontrado.' });
      }
      res.json({ message: 'Pedido eliminado correctamente.' });
    } catch (error) {
      return res.status(500).json({ message: 'Algo va mal' });
    }
  }