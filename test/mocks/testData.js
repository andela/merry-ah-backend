const userDetails = {
  validUser: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'Juliet',
    email: 'julietezekwe@gmail.com',
    password: 'femiok',
    bio: '',
    imgURL: ''
  },
  validUser1: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'Juliet',
    email: 'chidimma@gmail.com',
    password: 'femiok',
    bio: '',
    imgURL: '',
  },
  spacedField: {
    firstName: '   ',
    lastName: '    ',
    username: 'femi',
    email: 'julietezekwe@gmail.com',
    password: 'femi1',
    bio: '',
    imgURL: '',
  },
  invalidUser: {
    firstName: '    ',
    lastName: 'Ajibade',
    username: 'femi',
    email: 'julietezekwe@gmail.com',
    password: 'femi1',
    bio: '',
    imgURL: '',
  },
  invalidUserType: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'femi',
    email: 'julietezekwe@gmail.com',
    password: 'femi1',
    bio: '',
    imgURL: '',
  },
  invalidUserEmail: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'femi',
    email: 'julietezek',
    password: 'femi',
    bio: '',
    imgURL: '',
  },
};
// eslint-disable-next-line import/prefer-default-export
export { userDetails };
