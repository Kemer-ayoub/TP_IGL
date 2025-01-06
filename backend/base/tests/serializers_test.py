from base.serializers import DPISerializer


def test_dpi_serializer_invalid():
    data = {
        "nom": "Doe",
        "prenom": "John",
        # Missing date_naissance
    }
    serializer = DPISerializer(data=data)
    assert not serializer.is_valid()
