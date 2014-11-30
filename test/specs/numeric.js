/**
 * Import(s)
 */

var Vue = require('../../node_modules/vue/dist/vue')
var validator = require('../../index')
var createInstance = require('./helper').createInstance


describe('min', function () {
  var vm, targetVM

  before(function () {
    Vue.config.async = false
  })

  after(function () {
    Vue.config.async = true
  })
  

  describe('model', function () {
    beforeEach(function () {
      vm = createInstance({
        target: '<input type="text" v-model="threshold" v-validate="min: 0">',
        validator: validator,
        data: function () { return { threshold: null } }
      })
      targetVM = vm._children[0]
    })


    describe('boundary value - 1', function () {
      beforeEach(function () {
        vm.threshold = '-1'
        vm._digest() // force update
      })

      it('should be true', function () {
        expect(targetVM.validation.threshold.min).to.be(true)
      })
    })


    describe('boundary value', function () {
      beforeEach(function () {
        vm.threshold = '0'
        vm._digest() // force update
      })

      it('should be false', function () {
        expect(targetVM.validation.threshold.min).to.be(false)
      })
    })


    describe('boundary value + 1', function () {
      beforeEach(function () {
        vm.threshold = '1'
        vm._digest() // force update
      })

      it('should be false', function () {
        expect(targetVM.validation.threshold.min).to.be(false)
      })
    })


    describe('not numeric value', function () {
      beforeEach(function () {
        vm.threshold = 'hello'
        vm._digest() // force update
      })

      it('should be true', function () {
        expect(targetVM.validation.threshold.min).to.be(true)
      })
    })
  })


  describe('expression', function () {
    describe('numeric', function () {
      beforeEach(function () {
        vm = createInstance({
          target: '<input type="text" v-model="threshold" v-validate="min: 50">',
          validator: validator,
          data: function () { return { threshold: '49' } }
        })
        targetVM = vm._children[0]
      })

      it('should be false', function () {
        expect(targetVM.validation.threshold.min).to.be(false)
      })
    })


    describe('not numeric', function () {
      beforeEach(function () {
        vm = createInstance({
          target: '<input type="text" v-model="threshold" v-validate="min: \'hello\'">',
          validator: validator,
          data: function () { return { threshold: '49' } }
        })
        targetVM = vm._children[0]
      })

      it('should be true', function () {
        expect(targetVM.validation.threshold.min).to.be(true)
      })
    })
  })
})



describe('max', function () {
  var vm, targetVM

  before(function () {
    Vue.config.async = false
  })

  after(function () {
    Vue.config.async = true
  })
  

  describe('model', function () {
    beforeEach(function () {
      vm = createInstance({
        target: '<input type="text" v-model="threshold" v-validate="max: 100">',
        validator: validator,
        data: function () { return { threshold: null } }
      })
      targetVM = vm._children[0]
    })


    describe('boundary value - 1', function () {
      beforeEach(function () {
        vm.threshold = '99'
        vm._digest() // force update
      })

      it('should be false', function () {
        expect(targetVM.validation.threshold.max).to.be(false)
      })
    })


    describe('boundary value', function () {
      beforeEach(function () {
        vm.threshold = '100'
        vm._digest() // force update
      })

      it('should be false', function () {
        expect(targetVM.validation.threshold.max).to.be(false)
      })
    })


    describe('boundary value + 1', function () {
      beforeEach(function () {
        vm.threshold = '101'
        vm._digest() // force update
      })

      it('should be true', function () {
        expect(targetVM.validation.threshold.max).to.be(true)
      })
    })


    describe('not numeric value', function () {
      beforeEach(function () {
        vm.threshold = 'hello'
        vm._digest() // force update
      })

      it('should be true', function () {
        expect(targetVM.validation.threshold.max).to.be(true)
      })
    })
  })


  describe('expression', function () {
    describe('numeric', function () {
      beforeEach(function () {
        vm = createInstance({
          target: '<input type="text" v-model="threshold" v-validate="max: -2">',
          validator: validator,
          data: function () { return { threshold: '-3' } }
        })
        targetVM = vm._children[0]
      })

      it('should be false', function () {
        expect(targetVM.validation.threshold.max).to.be(false)
      })
    })


    describe('not numeric', function () {
      beforeEach(function () {
        vm = createInstance({
          target: '<input type="text" v-model="threshold" v-validate="max: \'hello\'">',
          validator: validator,
          data: function () { return { threshold: '100' } }
        })
        targetVM = vm._children[0]
      })

      it('should be true', function () {
        expect(targetVM.validation.threshold.max).to.be(true)
      })
    })
  })
})
