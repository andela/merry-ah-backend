module.exports = (sequelize, DataTypes) => {
  const ReportSummary = sequelize.define('ReportSummary', {
    userId: DataTypes.INTEGER,
    reportCount: DataTypes.INTEGER
  }, {});
  ReportSummary.associate = (models) => {
    ReportSummary.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return ReportSummary;
};
