module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    buyerId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    artId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {});
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.User, {
      foreignKey: 'sellerId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Transaction.belongsTo(models.User, {
      foreignKey: 'buyerId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Transaction.belongsTo(models.Art, {
      foreignKey: 'artId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Transaction;
};
