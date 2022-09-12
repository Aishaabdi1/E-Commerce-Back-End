Tag.init(
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    tag_name: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize
