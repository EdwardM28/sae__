import Layout from "@/components/Layout";
import ProductoForm from "@/components/ProductoForm";
import axios from "axios";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";


export default function EditProductoPage() {
  const [productoInfo, setProductoInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/productos?id='+id).then(response => {
      setProductoInfo(response.data);
    });
  }, [id]);
  return (
      <Layout>
        <h1>Editar Producto</h1>
        {productoInfo && (
            <ProductoForm {...productoInfo} />
          )}
      </Layout>
    );
}