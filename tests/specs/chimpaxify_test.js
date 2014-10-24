describe('jQuery.chimpaxify', function() {
  beforeEach(function() {
    this.$form = $('#test-form');
  });

  afterEach(function() {
    delete this.$form;
  });

  it('should be chainable', function() {
    expect( this.$form.chimpaxify() ).to.be('form');
    expect( this.$form.chimpaxify() ).to.have.id('test-form');
  });

  it('should be able to override its default options', function() {
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

  describe('when calling the plugin', function() {
    beforeEach(function() {
      this.$form.chimpaxify();
    });

    it('should add the required EMAIL name attribute to the email input', function() {
      expect( this.$form.find('input[type=email]') ).to.have.attr('name', 'EMAIL');
    });

    it('should generate a message container', function() {
      expect( this.$form.find('#chimpaxify-message') ).to.exist;
    });
  });

  describe('when submitting the form', function() {
    before(function() {
      if ($.ajax == 'ajax') {
        $.ajax.restore();
      }

      this.ajax = sinon.stub($, 'ajax');
    });

    it('should make an ajax call', function() {
      this.$form.submit();

      expect($.ajax).to.have.been.called;
    });

    describe('when receiving a successful response', function() {
      before(function() {
        this.ajax.yieldsTo('success', {
          result: 'success'
        });

        this.cb = sinon.spy();
      });

      beforeEach(function() {
        this.$form.chimpaxify({
          url: 'http://google.com/post?'
        }).on('chimpaxify.success', this.cb);

        this.$form.submit();
      });

      it('should apply the correct classes to the message container', function() {
        expect( $('#chimpaxify-message') ).to.have.class('chimpaxify-success');
        expect( $('#chimpaxify-message') ).not.to.have.class('chimpaxify-error');
      });

      it('should call the success callback', function() {
        expect(this.cb).to.have.been.called;
      });
    });

    describe('when receiving an error response', function() {
      before(function() {
        this.ajax.yieldsTo('success', {
          result: 'error',
          msg: 'fake email'
        });

        this.errorCb = sinon.spy();
      });

      beforeEach(function() {
        this.$form.chimpaxify({
          url: 'http://google.com/post?'
        }).on('chimpaxify.error', this.cb);

        this.$form.submit();
      });

      it('should apply the correct classes to the message container', function() {
        expect( $('#chimpaxify-message') ).to.have.class('chimpaxify-error');
        expect( $('#chimpaxify-message') ).not.to.have.class('chimpaxify-success');
      });

      it('should call the error callback', function() {
        expect(this.cb).to.have.been.called;
      });
    });
  });
});
