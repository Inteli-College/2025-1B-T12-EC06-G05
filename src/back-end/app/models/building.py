from ...config.database import db 

#Criando a tabela
class Building(db.Model):
    __tablename__ = 'building' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_expedicao = db.Column(db.Integer, db.ForeignKey('expedition.id'), nullable=False)
    nome = db.Column(db.String(200), nullable=False)
    complemento = db.Column(db.String(), nullable=False)
    descricao = db.Column(db.String(), nullable=True)
    foto_fachada = db.Column(db.String(), nullable=True)

    # Relacionamentos
    imagens = db.relationship('Image', backref='building', lazy=True)
    
    
    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'id_expedicao': self.id_expedicao,
            'nome': self.nome,
            'complemento': self.complemento,
            'descricao': self.descricao,
            'foto_fachada': self.foto_fachada
            }
