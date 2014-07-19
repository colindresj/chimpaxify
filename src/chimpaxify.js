(function ($) {
  $.fn.chimpaxify = function (options) {
    var $form = this, defaults, jsonUrl, $messageContainer;

    $form = this;
    defaults = $.extend({

      // takes the default Mailchimp form url from the action attribute
      url: $form.attr('action'),
      timeOut: 3500,
      delay: 4000,
      speed: 'slow',
      easing: 'swing',
      loader: true,
      successMessage: 'Success. A confirmation email has been sent your way.',
      successCallback: $.noop()
    }, options);

    // adds the appropriate json formatting to the url
    jsonUrl = defaults.url.replace('/post?', '/post-json?') + '&c=?';

    // setting up the message container
    $messageContainer = $('<div id="chimpaxifyMessage"></div>');

    // adds the required EMAIL name attribute to the email input
    $form.children('input[type=email]').attr('name', 'EMAIL');
    $form.append($messageContainer);

    $form.on('submit', function (e) {
      var dataSent = $(this).serialize();
      e.preventDefault();

      $.ajax({
        contentType: 'application/json',

        // Pulling from Mailchimp's server, so we use jsonp instead of regular json
        dataType: 'jsonp',
        url: jsonUrl,
        data: dataSent,
        timeout: defaults.timeOut,
        success: function (response) {
          if (response.result === 'success') {

            // on success, show the success message with proper styling and animation
            $messageContainer.html(defaults.successMessage);
            $messageContainer.removeClass('chimpaxifyError')
                             .addClass('chimpaxifySuccess')
                             .slideDown(defaults.speed, defaults.easing);

            // trigger the plugin's success callback with response as param
            $form.trigger('chimpaxify.success', response);
          } else {

            // on error, show the error message with proper styling and animation
            // using a simple regex to strip the error codes from the error message sent back from Mailchimp's
            // server so it all shows up nicely as text
            $messageContainer.html( response.msg.replace(/\d -/g, '') )
                             .removeClass('chimpaxifySuccess')
                             .addClass('chimpaxifyError')
                             .slideDown(defaults.speed, defaults.easing);

            $form.trigger('chimpaxify.error', response);
          }
          $messageContainer.delay(defaults.delay)
                           .slideUp(defaults.speed, defaults.easing);
        },
        error: function () {
          return false;
        },
        beforeSend: function () {
          if (defaults.loader) {
            $form.addClass('chimpaxifyLoading');
          }
        },
        complete: function () {
          if (defaults.loader) {
            $form.removeClass('chimpaxifyLoading');
          }
        }
      });
    });
  return $form;
  };
})(jQuery);
