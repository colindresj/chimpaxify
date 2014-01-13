
describe('chimpaxify', function(){

  var Spec = Spec || {};

  beforeEach(function(){
    loadFixtures('chimpaxify.html');
    Spec.$form = $('#test-form');
  });

  it('should be chainable', function(){
    Spec.$form.chimpaxify().addClass('chained');
    expect(Spec.$form.hasClass('chained')).toBeTruthy();
  });

  it('should be able to override its default options', function () {
    expect(
      Spec.$form.chimpaxify({
        url: 'https://google.com/',
        timeOut: 1000,
        delay: 2000,
        speed: 'fast',
        easing: 'linear',
        loader: false,
        successMessage: 'Success!'
      })
    ).toBeTruthy();
  });

  describe('when calling the plugin', function(){

    beforeEach(function(){
      Spec.$form.chimpaxify();
    });

    it('should add the required EMAIL name attribute to the email input', function(){
      expect(Spec.$form.find('input[type=email]')).toHaveAttr('name', 'EMAIL');
    });

    it('should generate a message container', function(){
      expect(Spec.$form).toContain('#chimpaxifyMessage');
    });

    describe('when submiting the form', function(){

      beforeEach(function(){
        Spec.spyEvent = spyOnEvent(Spec.$form, 'submit');
        Spec.$form.submit();
        spyOn($, 'ajax');
      });

      it('should prevent the default', function(){
        expect('submit').toHaveBeenPreventedOn(Spec.$form);
      });

      it('should make an ajax request', function(){
        expect($.ajax.mostRecentCall).toBeTruthy();
      });

    });

  });

});
