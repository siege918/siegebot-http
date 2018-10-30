var http = require('http');

module.exports = {
	get: get
}

function get(message, config)
{
	return new Promise(function(resolve) {
		getPromise(message, config, resolve);
	});
}

function getPromise(message, config, callback) {
	var query = message.content.substring(message.content.indexOf(' ')).trim().replace(/ /g, "%20");
	http.get(config.path,
		function(response) {
			var body = '';
			response.on("data",
				function(d) {
					body += d;
				}
			);
			response.on("end", function() {
                var responseText = body;
                
                if (config.template)
                    responseText = config.template.replace(/{response}/gm, body);

                message.channel.send(responseText);
                callback(responseText);
			});
		});
}