from ...config.database import db 

#Criando a tabela
class Result(db.Model):
    __tablename__ = 'result' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    resultado = db.Column(db.String(200), nullable=False)

    # Resultado
    audit = db.relationship('Audit', back_populates='resultado', uselist=False)

    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'resultado': self.resultado
            }