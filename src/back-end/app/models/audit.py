from ...config.database import db 

#Criando a tabela
class Audit(db.Model):
    __tablename__ = 'audit' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    data_auditoria = db.Column(db.Date, nullable=False)
    id_fissura = db.Column(db.Integer, db.ForeignKey('fissure.id'), nullable=False)
    id_auditor = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.Integer, nullable=False)
    modified = db.Column(db.Integer, nullable=True)
    
    responsavel = db.relationship('User', back_populates='audits')
    fissura = db.relationship('Fissure', back_populates='audits')
    
    # Função para transformar em json
    def as_dict(self):
        return {
            'id': self.id,            
            'data_auditoria': self.data_auditoria,   
            'id_fissura': self.id_fissura,
            'id_auditor': self.id_auditor,
            'status': self.status,
            'modified': self.modified,
        }
