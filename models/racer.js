module.exports = function(sequelize, Sequelize) {
 
    var Racer = sequelize.define('racer', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        name: {
            type: Sequelize.TEXT
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