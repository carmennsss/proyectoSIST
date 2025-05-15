#----------------------------------
# @Author: Carmen
# 21/03/2025
#----------------------------------
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from controller.CoBaseDatos import CoBaseDatos

app = Flask(__name__)
CORS(app)

#----------------------------------
# CONEXION A LA BASE DE DATOS
#----------------------------------
def crear_conexion():
    try:
        connection = mysql.connector.connect(
            host="82.223.102.153",
            user="2DAMRestaurante",
            password="2DAMRestaurante9876",
            database="2DAMRestaurante"
        )
        return CoBaseDatos(connection, connection.cursor())
    except mysql.connector.Error as err:
        print(f"Database connection error: {err}")
        return None

#----------------------------------
# RUTAS
#----------------------------------

# Obtiene las mesas
@app.route('/mesas', methods=['GET'])
def obtener_mesas():
    try:
        bd = crear_conexion()
        if bd is None:
            return jsonify({"error": "La conexión a la base de datos ha fallado"}), 500
        
        mesas = bd.listarMesas()
        
        # Devuelve una lista con los IDs de las mesas
        mesas_list = [mesa[0] for mesa in mesas] if mesas else []
        return jsonify(mesas_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Obtiene los productos de un grupo
@app.route('/productos/<int:id_grupo>', methods=['GET'])
def obtener_productos(id_grupo):
    try:
        bd = crear_conexion()
        if bd is None:
            return jsonify({"error": "La conexión a la base de datos ha fallado"}), 500
        
        productos = bd.listarProductos(id_grupo)
        
        # Devuelve una lista con los IDs y nombres de los productos
        productos_list = [{"id": prod[0], "nombre": prod[1]} for prod in productos] if productos else []
        return jsonify(productos_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if bd:
            bd.cerrar_conexion()

# Obtiene el nombre de un producto        
@app.route('/productosNombre/<int:id_producto>', methods=['GET'])
def obtener_nombre_producto(id_producto):
    try:
        bd = crear_conexion()
        if bd is None:
            return jsonify({"error": "La conexión a la base de datos ha fallado"}), 500
        
        producto = bd.obtenerProducto(id_producto)
        
        # Devuelve el nombre del producto
        return jsonify({"nombre": producto[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if bd:
            bd.cerrar_conexion()

# Obtiene los grupos        
@app.route('/grupos', methods=['GET'])
def obtener_grupos():
    try:
        bd = crear_conexion()
        if bd is None:
            return jsonify({"error": "La conexión a la base de datos ha fallado"}), 500
        
        tipos = bd.listarCategorias()
        
        # Devuelve una lista con los IDs y nombres de los tipos
        tipos_list = [{"id": tipo[0], "nombre": tipo[1]} for tipo in tipos] if tipos else []
        return jsonify(tipos_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Obtiene los tipos de un producto
@app.route('/tipos/<int:id_producto>', methods=['GET'])
def obtener_tipos(id_producto):
    try:
        bd = crear_conexion()
        if bd is None:
            return jsonify({"error": "La conexión a la base de datos ha fallado"}), 500
        
        tipos = bd.listarTipos(id_producto)
        
        # Devuelve una lista con los IDs y nombres de los tipos
        tipos_list = [{"nombre": tipo[0], "id": tipo[1]} for tipo in tipos] if tipos else []
        return jsonify(tipos_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
# Obtiene el nombre de un tipo   
@app.route('/tiposNombre/<int:id_tipo>', methods=['GET'])
def obtener_nombre_tipo(id_tipo):
    try:
        bd = crear_conexion()
        if bd is None:
            return jsonify({"error": "La conexión a la base de datos ha fallado"}), 500
        
        tipo = bd.obtenerTipo(id_tipo)
            
        # Devuelve el nombre del tipo
        return jsonify({"nombre": tipo[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Obtiene los pedidos de una mesa
@app.route('/pedidos/<int:id_mesa>', methods=['GET'])
def obtener_pedidos_mesa(id_mesa):
    try:
        bd = crear_conexion()
        if bd is None:
            return jsonify({"error": "La conexión a la base de datos ha fallado"}), 500
        
        pedidos = bd.obtenerPedidos(id_mesa)

        # Devuelve una lista con el ID del pedido
        # el nombre del producto y el nombre del tipo
        pedidos_list = []
        for ped in pedidos:
            pedido_dict = {
                "id_pedido": ped[0],
                "producto": {
                    "nombre": ped[1]
                },
                "tipo": {
                    "nombre": ped[2]
                }
            }
            pedidos_list.append(pedido_dict)
            
        return jsonify(pedidos_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if bd:
            bd.cerrar_conexion()

# Crea un pedido
@app.route('/pedidos', methods=['POST'])
def crear_pedido():
    try:
        data = request.get_json()

        if not data or 'idMesa' not in data or 'idProducto' not in data or 'tipo' not in data:
            return jsonify({"error": "Datos de pedido no válidos"}), 400

        bd = crear_conexion()
        if bd is None:
            return jsonify({"error": "La conexión a la base de datos ha fallado"}), 500

        # Inserta el pedido en la base de datos
        bd.crearPedido(data['idMesa'], data['idProducto'], data['tipo'])
        return jsonify({"message": "Pedido creado exitosamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)