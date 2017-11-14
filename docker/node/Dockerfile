FROM node:8.9.1

RUN apt-get update \
  && apt-get install -y unzip

WORKDIR /node-fhir-validator

ENV PATH $PATH:/node-fhir-validator/node_modules/.bin

# CMD ["npm", "test"]
