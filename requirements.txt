FROM python:3.12-slim

# libolm est requis pour le chiffrement E2E Matrix (Megolm)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libolm-dev gcc python3-dev cmake build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY assistant.py /app/
CMD ["python", "-u", "/app/assistant.py"]
