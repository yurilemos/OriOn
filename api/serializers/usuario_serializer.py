from api import ma, Usuario

# Esquematiza modelo que será retornado para o front
class UsuarioSerializer(ma.SQLAlchemyAutoSchema):
    class Meta:
        exclude = (
            "senha",
        )
        model = Usuario