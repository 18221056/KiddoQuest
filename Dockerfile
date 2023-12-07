FROM python:3.9
ADD main.py .

WORKDIR /KiddoQuest

COPY ./requirements.txt /KiddoQuest/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /KiddoQuest/requirements.txt

COPY . /KiddoQuest


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]