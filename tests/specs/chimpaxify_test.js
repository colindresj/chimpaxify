describe('jQuery.chimpaxify', function() {
  beforeEach(function() {
    this.$form = $('#testForm');
  });

  afterEach(function() {
    delete this.$form;
  });

  it('should be chainable', function() {
    expect( this.$form.chimpaxify() ).to.be('form');
    expect( this.$form.chimpaxify() ).to.have.id('testForm');
  });

  it('should be able to override its default options', function () {
    expect(
      this.$form.chimpaxify({
        url: 'https://google.com/',
        timeOut: 1000,
        delay: 2000,
        speed: 'fast',
        easing: 'linear',
        loader: false,
        successMessage: 'Success!'
      })
    ).to.be.ok;
  });

  describe('when calling the plugin', function(){
    beforeEach(function(){
      this.$form.chimpaxify();
    });

    it('should add the required EMAIL name attribute to the email input', function(){
      expect( this.$form.find('input[type=email]') ).to.have.attr('name', 'EMAIL');
    });

    it('should generate a message container', function(){
      expect(this.$form.find('#chimpaxifyMessage')).to.exist;
    });
  });

  describe('when submitting the form', function(){
    describe('when receiving a successful response', function(){
      before(function(){
        if ($.ajax == 'ajax') {
          $.ajax.restore();
        }
        sinon.stub($, 'ajax').yieldsTo('success', {
          result: 'success'
        });
        this.cb = sinon.spy();
      });

      beforeEach(function() {
        this.$form.chimpaxify({
          url: 'http://google.com/post?'
        }).on('chimpaxify:success', this.cb);

        this.$form.submit();
      });

      it('should make an ajax cal', function(){
        expect($.ajax).to.have.been.called;
      });

      it('should apply the correct classes to the message container', function(){
        expect( $('#chimpaxifyMessage') ).to.have.class('chimpaxifySuccess');
        expect( $('#chimpaxifyMessage') ).not.to.have.class('chimpaxifyError');
      });

      it('should trigger the callback', function(){
        expect(this.cb).to.have.been.called;
      });
    });

    describe('when receiving an error response', function(){
      before(function(){
        if ($.ajax == 'ajax') {
          $.ajax.restore();
        }
        sinon.stub($, 'ajax').yieldsTo('success', {
          result: 'error',
          msg: 'fake email'
        });
      });

      beforeEach(function() {
        this.$form.chimpaxify({
          url: 'http://google.com/post?'
        });

        this.$form.submit();
      });

      it('should apply the correct classes to the message container', function(){
        expect( $('#chimpaxifyMessage') ).to.have.class('chimpaxifyError');
        expect( $('#chimpaxifyMessage') ).not.to.have.class('chimpaxifySuccess');
      });
    });
  });

});
