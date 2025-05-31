from ...config.database import db 

#Criando a tabela
class Expedition(db.Model):
    __tablename__ = 'expedition' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    nome = db.Column(db.String(200), nullable=False)
    localizacao = db.Column(db.String(), nullable=False)
    data_criacao = db.Column(db.Date, nullable=False)
    ultima_att = db.Column(db.Date, nullable=True)
    id_responsavel = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    descricao = db.Column(db.String(), nullable=True)
    foto_capa = db.Column(db.String(), nullable=True)
    
    # Relacionamentos
    predios = db.relationship('Building', backref='expedition', lazy=True)
    responsavel = db.relationship('User', back_populates='expedicoes')

    
    # Função para transformar em json
    def as_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'localizacao': self.localizacao,            
            'data_criacao': self.data_criacao,   
            'ultima_att': self.ultima_att,
            'id_responsavel': self.id_responsavel,
            'nome_responsavel': self.responsavel.nome_completo,
            'descricao': self.descricao,
            'foto_capa': self.foto_capa
        }
