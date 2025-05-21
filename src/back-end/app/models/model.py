from ...config.database import db 

#Criando a tabela
class Model(db.Model):
    __tablename__ = 'model' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    url = db.Column(db.Integer, db.ForeignKey('expedition.id'), nullable=False)
    nome = db.Column(db.String(200), nullable=False)
    tipo = db.Column(db.String(), nullable=False)
    loss = db.Column(db.String(), nullable=False)
    loss_tipo = db.Column(db.String(), nullable=False)
    
    # Relacionamentos
    imagens = db.relationship('Image', backref='model', lazy=True)

    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'url': self.url,
            'nome': self.nome,
            'tipo': self.tipo,
            'loss': self.loss,
            'loss_tipo': self.loss_tipo
            }