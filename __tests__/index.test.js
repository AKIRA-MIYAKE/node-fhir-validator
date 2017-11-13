const { Validator } = require('../src')

describe('Validator', () => {

  describe('constructor()', () => {

    it('get Validator instance.', () => {
      const validator = new Validator()

      expect(validator instanceof Validator).toEqual(true)

      expect(validator._schemaName).toEqual('fhir.schema.json')
      expect(validator._ajv).toBeDefined()
      expect(validator._schema).toBeDefined()
      expect(validator._definitionNames).toBeDefined()
    })

  })

  describe('validate()', () => {

    const validator = new Validator()
    const patient = {
      resourceType: 'Patient',
      id: 'patient_01',
      active: true,
      name: [{
        use: 'official',
        family: 'Doe',
        given: ['John'],
        text: 'John Doe'
      }],
      gender: 'male'
    }

    describe('when passed valid data.', () => {

      it('return object that same passed Patient data.', async () => {
        const result = await validator.validate('Patient', patient)

        expect(result).toEqual({
          resourceType: 'Patient',
          id: 'patient_01',
          active: true,
          name: [{
            use: 'official',
            family: 'Doe',
            given: ['John'],
            text: 'John Doe'
          }],
          gender: 'male'
        })
      })

    })

    describe('when passed invalid data.', () => {

      it('throw validation error.', async () => {
        const invalidData = { resourceType: 'sith' }

        try {
          const result = await validator.validate('Patient', invalidData)
        } catch (error) {
          expect(error.message).toBe('ValidationError')
          expect(error.errors).toBeDefined()
        }
      })

    })

    describe('when passed valid daba, with invalid definitionName.', () => {

      it('throw invalid resource name error.', async () => {
        try {
          const result = await validator.validate('Spam', patient)
        } catch (error) {
          expect(error.message).toBe('InvalidResourceError')
        }
      })

    })

  })

  describe('_getRefName()', () => {

    it('return $ref name.', () => {
      const validator = new Validator()

      const $ref1 = validator._getRefName('Patient')
      expect($ref1).toEqual('fhir.schema.json#/definitions/Patient')

      const $ref2 = validator._getRefName('Practitioner')
      expect($ref2).toEqual('fhir.schema.json#/definitions/Practitioner')
    })

  })

})
