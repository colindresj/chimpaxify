#Chimpaxify
Chimpaxify is a tiny (1kb minified) jQuery plugin that uses Ajax to submit your MailChimp forms. 

##How to Use
Simply include Chimpaxify on your page after jQuery (required):
	
	<script src="jquery.js"></script>
	<script src="chimpaxify.min.js"></script>

Download any of the forms from MailChimp, or create your own. Then, simply call Chimpaxify onto your form using its ID selector:

	$(function() {
		$('#foo').chimpaxify();
	});

A css stylesheet and loading gif are included. Add the stylesheet like so:

	<link rel="stylesheet" href="chimpaxify.css">

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