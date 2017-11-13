# node-fhir-validator
HL7 FHIR resources validator for node.js

## Overview
This is a validation library for [HL7 FHIR](https://www.hl7.org/fhir/index.html) resources.  
Including JSON schema that provided with [Validating Resources](http://hl7.org/fhir/validation.html).

## Install

```
$ npm install --save node-fhir-validator
```

## Usage

```
const { Validator } = require('node-fhir-validator')
const validator = new Validator()

const inputData = {
  // Patient data.
}

try {
  const data = await validator.validate('Patient', inputData)
} catch (error) {
  // Error handling.
}
```
