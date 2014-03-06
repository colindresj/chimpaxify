describe('chimpaxify', function(){

  var $form;

  beforeEach(function(){
    loadFixtures('chimpaxify.html');
    $form = $('#test-form');
  });

  it('should be chainable', function(){
    $form.chimpaxify().addClass('chained');
    expect($form.hasClass('chained')).toBeTruthy();
  });

  it('should be able to override its default options', function () {
    expect(
      $form.chimpaxify({
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
      $form.chimpaxify();
    });

    it('should add the required EMAIL name attribute to the email input', function(){
      expect($form.find('input[type=email]')).toHaveAttr('name', 'EMAIL');
    });

    it('should generate a message container', function(){
      expect($form).toContain('#chimpaxifyMessage');
    });

  });

  describe('when submiting the form', function(){

    it('should prevent the default', function(){
      var spy = spyOnEvent($form, 'submit');
      $form.chimpaxify();
      expect('submit').not.toHaveBeenPrevented();
    });

  });

  describe('making a succesfull XHR', function(){


  });

});
