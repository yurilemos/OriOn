from app import ma, Usuario


class UsuarioSerializer(ma.SQLAlchemyAutoSchema):
    class Meta:
        exclude = (
            "senha",
        )
        model = Usuario