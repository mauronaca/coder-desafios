
Puerto 8080 para desarrollo y puerto 3030 definido por ``process.env.PORT``en Glitch.

---

## Usuario

La variable global ``admin`` puede ser ``true`` (defecto) o ``false``. Se puede modificar a traves de la ruta POST ``/api/login``, la cual recibe como parametro query ``ùser`` y si su valor es ``admin``, la variable cambia a estado ``true``.

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
  
  Si no están todos los campos, se envía un error de parametros faltantes.
  Ejemplo del ``body``:
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

- GET ``/``: Devuelve todos los carritos existentes.
- GET ``/:id_carrito/productos``: Devuelve el producto especificado por su id del carrito con ``id_carrito``.
 
  Esta ruta recibe al id del producto como un parametro que debe llamarse ``id_prod``. El formato de la ruta será: ``/api/carrito/ID_CARRITO/productos?id_prod=ID_PROD``. Si ``id_prod`` no se especifica se enviará un error.
 
  Un ejemplo de uso: ``http://localhost:8080/api/carrito/2/productos?id_prod=1``

- POST ``/``: Genera un carrito nuevo vacío con la siguiente estructura:

  ```json
    {
        "id": 1,
        "timestamp": "YY-MM-DDTHH",
        "productos": []
    }
  ```
