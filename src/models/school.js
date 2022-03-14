'use strict';


const School =  (sequelize, DataTypes) => sequelize.define('school', {
            courseName:{
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            section:{
                type: DataTypes.STRING,
                
            }
            
});

module.exports = School ;