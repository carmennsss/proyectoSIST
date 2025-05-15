#----------------------------------
# @Author: Carmen
# 21/03/2025
#----------------------------------

import mysql.connector

class CoBaseDatos:
    
    #------------------------------
    # CONSTRUCTOR
    #------------------------------
    def __init__(self, connection, cursor):
        self.connection = connection
        self.cursor = cursor
      
    #------------------------------
    # METODOS
    #------------------------------
    
    # Devuelve todas las mesas     
    def listarMesas(self):
        try:
            query = "SELECT id FROM Mesas ORDER BY id ASC"
            self.cursor.execute(query)
            return self.cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error al listar las mesas: {err}")
            return []
    
    # Devuelve todos los productos de una categoria
    def listarProductos(self, idGrupo):
        try:
            query = "SELECT id, nombre FROM Carta WHERE idGrupo = %s ORDER BY id ASC"
            self.cursor.execute(query, (idGrupo,))
            return self.cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error al listar los productos: {err}")
            return []
    
    # Inserta el pedido dependiendo del id de la mesa, producto y presentacion
    def crearPedido(self, idMesa, idProducto, tipo):
        try:
            query = "INSERT INTO Pedidos (idMesa, idProductoCarta, idTipo) VALUES (%s, %s, %s)"
            self.cursor.execute(query, (idMesa, idProducto, tipo))
            self.connection.commit()
        except mysql.connector.Error as err:
            print(f"Error al crear el pedido: {err}")

    # Devuelve todas las presentaciones de un producto
    def listarTipos(self, idProducto):
        try:
            # Lo que hace la query es ver por cada id de tipo 
            # si el producto tiene esa presentacion (esta en 1)
            query = """
            SELECT T.nombreTipo, T.id
            FROM Carta C
            JOIN Tipos T ON (
                (T.id = 1 AND C.unidad = 1) OR
                (T.id = 2 AND C.tapa = 1) OR
                (T.id = 3 AND C.media = 1) OR
                (T.id = 4 AND C.racion = 1)
            )
            WHERE C.id = %s
            """
            self.cursor.execute(query, (idProducto,))
            return self.cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error al listar los tipos: {err}")
            return []
         
              
    # Devuelve todas las categorias     
    def listarCategorias(self):
        try:
            query = "SELECT * FROM Grupos ORDER BY id ASC"
            self.cursor.execute(query)
            return self.cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error al listar las categorias: {err}")
            return []
        
    # Devuelve los pedidos realizados en una mesa
    def obtenerPedidos(self, idMesa):
        try:
            query = """
            SELECT 
                p.id,
                c.nombre AS nombre_producto,
                t.nombreTipo AS nombre_tipo
            FROM 
                Pedidos p
            JOIN 
                Carta c ON p.idProductoCarta = c.id
            JOIN 
                Tipos t ON p.idTipo = t.id
            WHERE 
                p.idMesa = %s
            """
            self.cursor.execute(query, (idMesa,))
            return self.cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Error al listar los pedidos: {err}")
            return []
    
    # Devuelve el nombre del tipo
    def obtenerTipo(self, idTipo):
        try:
            query = "SELECT nombreTipo FROM Tipos WHERE id = %s"
            self.cursor.execute(query, (idTipo,))
            return self.cursor.fetchone()
        except mysql.connector.Error as err:
            print(f"Error al obtener el tipo: {err}")
            return []
    
    # Devuelve el nombre del producto
    def obtenerProducto(self, idProducto):
        try:
            query = "SELECT nombre FROM Carta WHERE id = %s"
            self.cursor.execute(query, (idProducto,))
            return self.cursor.fetchone()
        except mysql.connector.Error as err:
            print(f"Error al obtener el producto: {err}")
            return []
        
    # Cierra la conexion 
    def cerrar_conexion(self):
        """Cierra la conexión con la base de datos."""
        self.cursor.close()
        self.connection.close()