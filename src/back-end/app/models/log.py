from ...config.database import db

class Log(db.Model):
    __tablename__ = 'log'

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_responsavel = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    data = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Integer, nullable=False)
    descricao = db.Column(db.String(500), nullable=False)

    responsavel = db.relationship('User', back_populates='logs')


    def as_dict(self):
        return {
            'id': self.id,
            'id_responsavel': self.id_responsavel,
            'data': self.data,
            'status': self.status,
            'descricao': self.descricao,
        }
