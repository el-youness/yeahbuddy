from pydantic_settings import BaseSettings

APP_NAME = "YeahBuddy"
# APP_NAME = "GainBrain"
# APP_NAME = "OneMoreRep"


class Settings(BaseSettings):
    hevy_api_key: str
    anthropic_api_key: str = ""
    hevy_base_url: str = "https://api.hevyapp.com"

    class Config:
        env_file = ".env"


settings = Settings()
