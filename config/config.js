var info = require('./info');

module.exports = {
	getConnection: function() {
		return 'mongodb://' + info.serverName + '/' + info.dbName;
	}
}