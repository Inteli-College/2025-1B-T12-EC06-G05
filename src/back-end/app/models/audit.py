from ...config.database import db 

#Criando a tabela
class Audit(db.Model):
    __tablename__ = 'audit' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_image = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id_resultado = db.Column(db.Integer, db.ForeignKey('result.id'), nullable=False, unique=True)
    
    # Relacionamentos
    resultado = db.relationship('Result', back_populates='audit', uselist=False)

    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'id_image': self.id_image,
            'id_user': self.id_user,
            'id_resultado': self.id_resultado
            }