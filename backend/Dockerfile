FROM python:3.10.12-slim-buster

WORKDIR /Attendence
COPY requirement.txt requirement.txt
RUN pip3 install -r requirement.txt
COPY . .
EXPOSE 8000
ENTRYPOINT ["gunicorn"]
CMD ["-b", "0.0.0.0:8000", "attendence.wsgi:application"]