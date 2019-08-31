
export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
     firstNname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastNname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verified: {
      type: DataTypes.STRING,
      allowNull: false
    },
     {});
  Users.associate = (models) => {
    // associations can be defined here
  };
  return Users;
};
