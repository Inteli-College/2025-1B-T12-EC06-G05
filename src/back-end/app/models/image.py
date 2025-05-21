from ...config.database import db 

#Criando a tabela
class Image(db.Model):
    __tablename__ = 'image' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    url = db.Column(db.String(), nullable=False)
    nome = db.Column(db.String(200), nullable=False)
    hora_coleta = db.Column(db.String(), nullable=False)
    orientacao = db.Column(db.String(), nullable=False)
    id_predio = db.Column(db.Integer, db.ForeignKey('expedition.id'), nullable=False)
    img_resultado = db.Column(db.String(), nullable=False)
    anotacao = db.Column(db.String(), nullable=False)
    confiabilidade = db.Column(db.String(), nullable=False)
    id_modelo = db.Column(db.Integer, db.ForeignKey('model.id'), nullable=True)
    
    # Relacionamentos
    fissuras = db.relationship('Fissure', backref='image', lazy=True)
    auditorias = db.relationship('Audit', backref='image', lazy=True)

    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'url': self.url,
            'nome': self.nome,
            'hora_coleta': self.hora_coleta,
            'orientacao': self.orientacao,
            'id_predio': self.id_predio,
            'img_resultado': self.img_resultado,
            'anotacao': self.anotacao,
            'confiabilidade': self.confiabilidade,
            'id_modelo': self.id_modelo
            }