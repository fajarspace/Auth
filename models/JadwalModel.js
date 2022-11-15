import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import Users from "./UsersModel.js";

const {DataTypes} = Sequelize;

const Jadwal = db.define('users',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    jam:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    UserId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Users.hasMany(Jadwal);
Jadwal.belongsTo(Users, {
    foreignKey: 'userId'
});

export default Jadwal;