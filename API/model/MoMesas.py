#----------------------------------
# @Author: Carmen
# 21/03/2025
#----------------------------------

class MoMesa:
    def __init__(self, id_mesa, nombreMesa):
        self.id_mesa = id_mesa
        self.nombreMesa = nombreMesa
    
    def getIdMesa(self):
        return self.id_mesa
    
    def getNombreMesa(self):
        return self.nombreMesa
    
    def setNombreMesa(self, nombreMesa):
        self.nombreMesa = nombreMesa