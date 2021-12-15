
Puerto 8080 para desarrollo y puerto 3030 definido por ``process.env.PORT``en Glitch.

---

## Rutas de ``/api/productos``

- GET ``/``: Muestra todos los productos disponibles.
- GET ``/:id``: Muestra el producto especificado por el id.
- POST ``/``:  Ingreso de un nuevo producto. Recibe un JSON por ``body`` con las siguientes propiedades:
  - ``nombre`` 
  - ``descripcion`` 
  - ``codigo`` 
  - ``foto`` 
  - ``precio`` 
  - ``stock`` 

  Ejemplo:<br>
  ```json
  {
      "nombre": "Remera",
      "descripcion": "Remera de algodon 4XL",
      "codigo" : 21312421,
      "foto": "https://cdn-prod.scalefast.com/public/assets/user/2072312/image/01091d2380ca732c08f763d9ec82fd9d.jpg",
      "precio" : 2100,
      "stock": 100
  }
  ```
- PUT ``/:id``: Recibe como parametros los campos del producto a modificar. Por ejemplo: ``http://localhost:8080/api/productos/1?stock=99``
- DELETE ``/id``: Elimina el producto con el id especificado.

---

## Rutas de ``/api/carrito``
