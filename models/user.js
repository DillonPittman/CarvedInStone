
module.exports = function (sequelize, Sequelize) {

	var User = sequelize.define('user', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
		firstname: { type: Sequelize.STRING, notEmpty: true },
		lastname: { type: Sequelize.STRING, notEmpty: true },
		username: { type: Sequelize.TEXT },
		about: { type: Sequelize.TEXT },
		email: { type: Sequelize.STRING, validate: { isEmail: true } },
		password: { type: Sequelize.STRING, allowNull: false },
		last_login: { type: Sequelize.DATE },
		status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' }

	});
	// User.associate = function (models) {
	// 	Associating Author with Posts
	// 	When an Author is deleted, also delete any associated Posts
		
	// 	User.hasMany(models.Example, {
	// 		onDelete: "cascade"
	// 	  });

	// };
	return User;

}