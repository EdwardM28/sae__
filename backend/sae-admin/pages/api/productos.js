import {Producto} from "@/models/Producto";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const {method} = req;
  mongooseConnect();

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Producto.findOne({_id:req.query?.id}));
    } else {
      res.json(await Producto.find());
    }
  }


  if (method === 'POST') {
    const {titulo,descripcion,precio} = req.body;
    const productoDoc = await Producto.create({
      titulo,descripcion,precio,
    })
    res.json(productoDoc);
  }

  if (method === 'PUT') {
    const {titulo,descripcion,precio,_id} = req.body;
    await Producto.updateOne({_id}, {titulo,descripcion,precio});
    res.json(true)
  }
}