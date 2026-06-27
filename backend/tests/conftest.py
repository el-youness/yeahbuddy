import pytest
from app.hevy.client import HevyClient


@pytest.fixture
def hevy_client():
    return HevyClient(api_key="test-key", base_url="https://api.hevyapp.com")
