#----------------------------------
# @Author: Carmen
# 21/03/2025
#----------------------------------

class Producto:
    def __init__(self, id_producto, id_grupo, nombre, unidad, tapa, media, racion):
        self.id_producto = id_producto
        self.id_grupo = id_grupo
        self.nombre = nombre
        self.unidad = unidad
        self.tapa = tapa
        self.media = media
        self.racion = racion
    
    def getIdProducto(self):
        return self.id_producto
    
    def getIdGrupo(self):
        return self.id_grupo
    
    def getNombre(self):
        return self.nombre
    
    def getUnidad(self):
        return self.unidad
    
    def getTapa(self):
        return self.tapa
    
    def getMedia(self):
        return self.media
    
    def getRacion(self):
        return self.racion
    
    def setNombre(self, nombre):
        self.nombre = nombre
    
    def setUnidad(self, unidad):
        self.unidad = unidad
    
    def setTapa(self, tapa):
        self.tapa = tapa
    
    def setMedia(self, media):
        self.media = media
    
    def setRacion(self, racion):
        self.racion = racion