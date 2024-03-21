
FROM rappdw/docker-java-python:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PYTHONUNBUFFERED=TRUE
RUN apt-get update && apt-get install unixodbc-dev python3-pip -y
RUN /usr/local/bin/python -m pip install --upgrade pip

WORKDIR /usr/src/app
COPY requirements.txt /usr/src/app/
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . /usr/src/app

EXPOSE 5000
ENTRYPOINT [ "gunicorn", "-w", "4", "application:app", "--bind", "0.0.0.0:5000"]
