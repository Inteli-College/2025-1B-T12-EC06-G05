from ...config.database import db 

#Criando a tabela
class Fissure(db.Model):
    __tablename__ = 'fissure' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    confiabilidade = db.Column(db.Integer, nullable=False)
    categoria = db.Column(db.String(200), nullable=False)
    id_image = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)
    url_fissura = db.Column(db.String(), nullable=False)

    image = db.relationship('Image', back_populates='fissuras')
    audits = db.relationship('Audit', back_populates='fissura', lazy=True)

    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'confiabilidade': self.confiabilidade,
            'categoria': self.categoria,
            'id_image': self.id_image,
            'url_fissura': self.url_fissura
            }