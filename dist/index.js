'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const path = require('path');

const Ajv = require('ajv');
const draft04Schema = require('ajv/lib/refs/json-schema-draft-04.json');
const fhirSchema = require(path.resolve(__dirname, '../schemas/fhir.schema.json'));

class Validator {

  constructor(schema = fhirSchema, options = {}) {
    this._schemaName = 'fhir.schema.json';

    const _options = Object.assign({}, {
      allErrors: true
    }, options);
    const ajv = new Ajv(_options);

    ajv.addMetaSchema(draft04Schema);
    ajv.addSchema(fhirSchema, this._schemaName);

    this._ajv = ajv;
    this._schema = schema;
    this._definitionNames = Object.keys(schema.definitions);
  }

  validate(definitionName, data) {
    var _this = this;

    return _asyncToGenerator(function* () {
      return new Promise(function (resolve, reject) {
        if (_this._definitionNames.indexOf(definitionName) === -1) {
          reject(new Error('InvalidResourceError'));
          return;
        }

        const result = _this._ajv.validate({ $ref: _this._getRefName(definitionName) }, data);
        if (!result) {
          const error = new Error('ValidationError');
          error.errors = _this._ajv.errors;
          reject(error);
          return;
        }
        resolve(data);
      });
    })();
  }

  _getRefName(definitionName) {
    return `${this._schemaName}#/definitions/${definitionName}`;
  }

}

module.exports = { Validator };