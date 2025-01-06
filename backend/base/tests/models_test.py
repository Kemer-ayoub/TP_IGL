import pytest
from django.core.exceptions import ValidationError
from base.models import DPI, User

@pytest.mark.django_db
def test_dpi_str():
    # Arrange: Create test data
    patient_user = User.objects.create(username="john_doe", role=User.Role.PATIENT)
    dpi = DPI.objects.create(
        nom="Doe",
        prenom="John",
        date_naissance="1990-01-01",
        adresse="123 Main Street",
        telephone="123456789",
        nss="123-45-6789",
        mutuelle="Test Insurance",
        num_pers_contact="987654321",
        patient=patient_user,
    )

    # Act: Get the string representation
    str_representation = str(dpi)

    # Assert: Check the string representation
    assert str_representation == "Doe"

@pytest.mark.django_db
def test_dpi_field_defaults():
    # Arrange: Create a DPI without optional fields
    patient_user = User.objects.create(username="john_doe", role=User.Role.PATIENT)
    dpi = DPI.objects.create(
        nom="Doe",
        prenom="John",
        date_naissance="1990-01-01",
        nss="123-45-6789",
        patient=patient_user,
    )

    # Assert: Check that optional fields are None or empty
    assert dpi.adresse is None
    assert dpi.telephone is None
    assert dpi.mutuelle is None
    assert dpi.num_pers_contact is None

@pytest.mark.django_db
def test_dpi_nss_unique():
    # Arrange: Create a DPI with a specific NSS
    patient_user1 = User.objects.create(username="john_doe", role=User.Role.PATIENT)
    patient_user2 = User.objects.create(username="jane_doe", role=User.Role.PATIENT)

    DPI.objects.create(
        nom="Doe",
        prenom="John",
        date_naissance="1990-01-01",
        nss="123-45-6789",
        patient=patient_user1,
    )

    # Act & Assert: Attempt to create another DPI with the same NSS and expect a ValidationError
    with pytest.raises(ValidationError):
        dpi = DPI(
            nom="Doe",
            prenom="Jane",
            date_naissance="1992-02-02",
            nss="123-45-6789",
            patient=patient_user2,
        )
        dpi.full_clean()  # Trigger model validation
