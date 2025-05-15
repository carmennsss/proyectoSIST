#----------------------------------
# @Author: Carmen
# 21/03/2025
#----------------------------------

class Tipo:
    def __init__(self, id_tipo, nombreTipo):
        self.id_tipo = id_tipo
        self.nombreTipo = nombreTipo
    
    def getIdTipo(self):
        return self.id_tipo
    
    def getNombreTipo(self):
        return self.nombreTipo
    
    def setNombreTipo(self, nombreTipo):
        self.nombreTipo = nombreTipo