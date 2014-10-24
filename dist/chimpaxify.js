/*! chimpaxify - v1.1.1 - 2014-10-23
* https://github.com/colindresj/chimpaxify
* Copyright (c) 2014 JC; Licensed MIT */

(function($) {
  'use strict';

  $.fn.chimpaxify = function(options) {
    var $form = this, defaults, jsonUrl, $messageContainer;

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
    $messageContainer = $('<div id="chimpaxify-message"></div>');

    // adds the required EMAIL name attribute to the email input
    $form.children('input[type=email]').attr('name', 'EMAIL');
    $form.append($messageContainer);

    $form.on('submit', function(e) {
      var dataSent = $(this).serialize();
      e.preventDefault();

      $.ajax({
        contentType: 'application/json',

        // Cross XHR so we use jsonp instead of regular json
        dataType: 'jsonp',
        url: jsonUrl,
        data: dataSent,
        timeout: defaults.timeOut,
        success: function(response) {
          if (response.result === 'success') {

            // on success, show the success message with proper styling
            // and animation
            $messageContainer.html(defaults.successMessage);
            $messageContainer.removeClass('chimpaxify-error')
                             .addClass('chimpaxify-success')
                             .slideDown(defaults.speed, defaults.easing);

            // trigger the plugin's success callback with response as param
            $form.trigger('success.chimpaxify', response);
          } else {

            // on error, show the error message with proper styling and
            // animation using a simple regex to strip the error codes from the
            // error message sent back from Mailchimp's server so it all
            // shows up nicely as text
            $messageContainer.html( response.msg.replace(/\d -/g, '') )
                             .removeClass('chimpaxify-success')
                             .addClass('chimpaxify-error')
                             .slideDown(defaults.speed, defaults.easing);

            $form.trigger('err.chimpaxify', response);
          }

          $messageContainer.delay(defaults.delay)
                           .slideUp(defaults.speed, defaults.easing);
        },
        error: function() {
          return false;
        },
        beforeSend: function() {
          if (defaults.loader) {
            $form.addClass('chimpaxify-loading');
          }
        },
        complete: function() {
          if (defaults.loader) {
            $form.removeClass('chimpaxify-loading');
          }
        }
      });
    });

    return $form;
  };
})(jQuery);
