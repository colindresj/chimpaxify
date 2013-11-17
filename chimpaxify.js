(function ($) {
  $.fn.chimpaxify = function (options) {
    var form = this;
    var defaults = $.extend({

      // takes the default Mailchimp form url from the action attribute
      url: form.attr('action'),
      timeOut: 3500,
      delay: 4000,
      speed: 'slow',
      easing: 'swing',
      loader: true,
      successMessage: 'Success. A confirmation email has been sent your way.'
    }, options);

    // adds the appropriate json formatting to the url
    var jsonUrl = defaults.url.replace('/post?', '/post-json?') + '&c=?';

    // setting up the message container
    var message = $('<div id="chimpaxifyMessage"></div>');

    // adds the required EMAIL name attribute to the email input
    form.find('input[type=email]').attr('name', 'EMAIL');
    $(form).append(message);

    form.on('submit', function (e) {

      // prevent the form from refreshing the page -- it's AJAX after all!
      e.preventDefault();

      // grab the data from the form and serialize it
      var dataSent = $(this).serialize();
      $.ajax({
        contentType: 'application/json',

        // Pulling from Mailchimp's server, so we use jsonp instead of regular json
        dataType: 'jsonp',
        url: jsonUrl,
        data: dataSent,
        timeout: defaults.timeOut,
        success: function (result) {
          if (result.result === 'success') {

            // on success, show the success message with proper styling and animation
            $(message).html(defaults.successMessage);
            $(message).removeClass('chimpaxifyError')
                      .addClass('chimpaxifySuccess')
                      .slideDown(defaults.speed, defaults.easing);
          } else {

            // on error, show the error message with proper styling and animation
            // using a simple regex to strip the error codes from the error message sent back from Mailchimp's
            // server so it all shows up nicely as text
            $(message).html(result.msg.replace(/\d -/, ''));
            $(message).removeClass('chimpaxifySuccess')
                      .addClass('chimpaxifyError')
                      .slideDown(defaults.speed, defaults.easing);
          }
          message.delay(defaults.delay)
                .slideUp(defaults.speed, defaults.easing);
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
          if (defaults.loader) {
            form.removeClass('chimpaxifyLoading');
          }
        }
      });
    });
  };
})(jQuery);
