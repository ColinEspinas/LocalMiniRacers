module.exports = function(sequelize, Sequelize) {
 
    var Racer = sequelize.define('racer', {
 
        id: {
            primaryKey: true,
            type: Sequelize.STRING,
            allowNull: false
        },
 
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
 
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
 
        use_count: {
            type: Sequelize.INTEGER,
        },
 
        last_used: {
            type: Sequelize.DATE
        },
 
    });
 
    return Racer;
 
}