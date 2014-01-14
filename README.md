#Chimpaxify
[![Build Status](https://travis-ci.org/corporadobob/chimpaxify.png?branch=master)](https://travis-ci.org/corporadobob/chimpaxify)

Chimpaxify is a tiny (~1kb minified) jQuery plugin that uses Ajax to submit your MailChimp forms.

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/corporadobob/chimpaxify/master/dist/chimpaxify.min.js
[max]: https://raw.github.com/corporadobob/chimpaxify/master/dist/chimpaxify.js

##How to Use
Simply include Chimpaxify on your page after jQuery:

```html
<script src="jquery.js"></script>
<script src="chimpaxify.min.js"></script>
```

Download any of the forms from MailChimp, or create your own. If you decide to create your own form, make sure to have an input with type set to email. Then, simply call Chimpaxify onto your form using its ID selector:

```js
$(function() {
  $('#foo').chimpaxify();
});
```


A css stylesheet and loading gif are included. Add the stylesheet like so:

```html
<link rel="stylesheet" href="chimpaxify.css">
```

Make sure you properly reference the location of the loading gif in your styles.

##Options
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>url</td>
			<td>string</td>
			<td>Your form's action attribute</td>
			<td>Your MailChimp list URL</td>
		</tr>
		<tr>
			<td>timeOut</td>
			<td>number</td>
			<td>3500</td>
			<td>How long to wait before timing out</td>
		</tr>
		<tr>
			<td>delay</td>
			<td>number</td>
			<td>4000</td>
			<td>How long to show the error/success message</td>
		</tr>
		<tr>
			<td>speed</td>
			<td>number or string</td>
			<td>'slow'</td>
			<td>How fast to animate the error/success message</td>
		</tr>
		<tr>
			<td>easing</td>
			<td>string</td>
			<td>'swing'</td>
			<td>The easing used when animating the error/success message</td>
		</tr>
		<tr>
			<td>loader</td>
			<td>boolean</td>
			<td>true</td>
			<td>Show the loading gif or not</td>
		</tr>
		<tr>
			<td>successMessage</td>
			<td>string</td>
			<td>'Success. A confirmation email has been sent your way.'</td>
			<td>The message to show after an email is successfully sent to MailChimp</td>
		</tr>
	</tbody>
</table>

##Success Callback
Chimpaxify can trigger a success callback that gives you added functionality for defining what occurs when a new contact has been added to your Mailchimp list.

To fire a success callback, you just have to set an event listener for 'callback', which is a custom event triggered by your form whenever a post is successfully made. Since Chimpaxify returns your form element, you can keep this concise by chaining .on to the end of the Chimpaxify method.

```js
$(function() {
  $('#foo').chimpaxify().on('callback', function(){
    // your code here
  });
});
```
