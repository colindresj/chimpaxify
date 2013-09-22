(function ($) {
  $.fn.chimpaxify = function (options) {
    var form = this;
    var defaults = $.extend({
      url: form.attr('action'), // takes the default Mailchimp form url from the action attribute
      timeOut: 3500,
      delay: 4000,
      speed: 'slow',
      easing: 'swing',
      loader: true,
      successMessage: 'Success. A confirmation email has been sent your way.'
    }, options);
    var jsonUrl = defaults.url.replace('/post?', '/post-json?').concat('&c=?'); // adds the appropriate json formatting to the url
    var message = $('<div id="chimpaxifyMessage"></div>'); // setting up the message container
    form.find('input[type=email]').attr('name', 'EMAIL'); // adds the (seemingly?) required EMAIL name attribute to the email input
    $(form).append(message);
    form.on('submit', function (e) {
      e.preventDefault(); // Prevent the form from refreshing the page -- it's AJAX after all!
      var dataSent = $(this).serialize();
      $.ajax({
        contentType: 'application/json',
        dataType: 'jsonp', // Pulling from Mailchimps servers, so we use jsonp instead of regular json
        url: jsonUrl,
        data: dataSent,
        timeout: defaults.timeOut,
        success: function (result) {
          if (result.result === 'success') {
            $(message).html(defaults.successMessage);
            $(message).removeClass('chimpaxifyError').addClass('chimpaxifySuccess').slideDown(defaults.speed, defaults.easing);
          } else {
            $(message).html(result.msg.replace(/\d -/, ''));
            $(message).removeClass('chimpaxifySuccess').addClass('chimpaxifyError').slideDown(defaults.speed, defaults.easing);
          }
          message.delay(defaults.delay).slideUp(defaults.speed, defaults.easing);
          var messageCount = $('#chimpaxifyMessage').length;
        },
        error: function () {
          console.log('There seems to be a problem with your Chimpaxify request. Make sure your options are correct.');
        },
        beforeSend: function () {
          if (defaults.loader) {
            form.addClass('chimpaxifyLoading');
          }
        },
        complete: function () {
          form.removeClass('chimpaxifyLoading');
        }
      });
    });
  };
})(jQuery);