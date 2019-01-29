import models from '../models';

const {
  Transaction,
  Art,
  User,
} = models;

module.exports = {
  async getItemReceipt(artId) {
    const query = await Transaction
      .findOne({
        include: [
          {
            model: User,
            as: 'buyer',
            attributes: ['id', 'username'],
          },
          {
            model: User,
            as: 'seller',
            attributes: ['id', 'username'],
          },
          {
            model: Art,
            as: 'art',
            attributes: [
              'id',
              'title',
              'description',
              'featuredImg',
              'price',
              'createdAt'
            ],
          }
        ],
        attributes: ['id', 'amount', 'createdAt'],
        where: { artId }
      });
    return query;
  },
  async saveTransaction(artId, artistId, userId, amount) {
    const query = await Transaction.create({
      artId,
      sellerId: artistId,
      buyerId: userId,
      amount
    });

    if (query) {
      /** Check if Art exists, if so update status for unavailability */
      const artExists = await Art.findOne({ where: { id: artId } });
      if (artExists) {
        artExists.status = false;
        artExists.save();
      }
    }
    return query;
  },
  async getTransactions(userId) {
    const query = await Transaction.findAll({
      include: [
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'username'],
        },
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'username'],
        },
        {
          model: Art,
          as: 'art',
          attributes: [
            'id',
            'title',
            'description',
            'featuredImg',
            'price',
            'createdAt'
          ],
        }
      ],
      attributes: ['id', 'amount', 'createdAt'],
      where: {
        $or: [
          {
            buyerId: userId
          },
          {
            sellerId: userId
          }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
    return query;
  },
};
