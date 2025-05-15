#----------------------------------
# @Author: Carmen
# 21/03/2025
#----------------------------------

class Pedido:
    def __init__(self, id_pedido, id_mesa, id_producto, id_tipo):
        self.id_pedido = id_pedido
        self.id_mesa = id_mesa
        self.id_producto = id_producto
        self.id_tipo = id_tipo
    
    def getIdPedido(self):
        return self.id_pedido
    
    def getIdMesa(self):
        return self.id_mesa
    
    def getIdProducto(self):
        return self.id_producto
    
    def getIdTipo(self):
        return self.id_tipo
    
    def setIdTipo(self, id_tipo):
        self.id_tipo = id_tipo