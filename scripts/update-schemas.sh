#!/bin/sh

SCRIPT_DIR=$(cd $(dirname $0); pwd)

if [ -d $SCRIPT_DIR/../schemas ]; then
  rm -rf $SCRIPT_DIR/../schemas
fi

wget https://www.hl7.org/fhir/fhir.schema.json.zip -P $SCRIPT_DIR
unzip $SCRIPT_DIR/fhir.schema.json.zip -d $SCRIPT_DIR/../schemas
rm -f $SCRIPT_DIR/fhir.schema.json.zip
