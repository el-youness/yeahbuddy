import json
import anthropic
from app.config import settings


async def analyze_workouts(workouts_json: list[dict]) -> str:
    client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)
    workouts_text = json.dumps(workouts_json, indent=2)
    message = await client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": (
                    "You are a fitness coach analyzing workout data from the Hevy app. "
                    "Provide a concise, actionable analysis of these recent workouts. "
                    "Highlight patterns, muscle group balance, frequency, and suggestions.\n\n"
                    f"Workouts:\n{workouts_text}"
                ),
            }
        ],
    )
    return message.content[0].text


async def create_routine_from_prompt(prompt: str, exercise_templates: list[dict]) -> dict:
    client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)
    templates_text = json.dumps(exercise_templates, indent=2)
    message = await client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        messages=[
            {
                "role": "user",
                "content": (
                    "You are a fitness coach creating a workout routine. "
                    "Return ONLY a valid JSON object matching this schema (no markdown, no explanation):\n"
                    '{"title": "string", "folder_id": null, "exercises": [{"exercise_template_id": "string", '
                    '"superset_id": null, "rest_seconds": 90, "notes": "", '
                    '"sets": [{"type": "normal", "weight_kg": null, "reps": 10, "rep_range": "8-12"}]}]}\n\n'
                    f"Available exercises (use their id as exercise_template_id):\n{templates_text}\n\n"
                    f"User request: {prompt}"
                ),
            }
        ],
    )
    return json.loads(message.content[0].text)
