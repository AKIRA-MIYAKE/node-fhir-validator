const path = require('path')

const Ajv = require('ajv')
const draft04Schema = require('ajv/lib/refs/json-schema-draft-04.json')
const fhirSchema = require(path.resolve(__dirname, '../schemas/fhir.schema.json'))

class Validator {

  constructor(schema = fhirSchema, options = {}) {
    this._schemaName = 'fhir.schema.json'

    const _options = Object.assign({}, {
      allErrors: true
    }, options)
    const ajv = new Ajv(_options)

    ajv.addMetaSchema(draft04Schema)
    ajv.addSchema(fhirSchema, this._schemaName)

    this._ajv = ajv
    this._schema = schema
    this._definitionNames = Object.keys(schema.definitions)
  }

  async validate(definitionName, data) {
    return new Promise((resolve, reject) => {
      if (this._definitionNames.indexOf(definitionName) === -1) {
        reject(new Error('InvalidResourceError'))
        return
      }

      const result = this._ajv.validate({ $ref: this._getRefName(definitionName) }, data)
      if (!result) {
        const error = new Error('ValidationError')
        error.errors = this._ajv.errors
        reject(error)
        return
      }
      resolve(data)
    })
  }

  _getRefName(definitionName) {
    return `${this._schemaName}#/definitions/${definitionName}`
  }

}

module.exports = { Validator }
