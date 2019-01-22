const userDetails = {
  validUser: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'Juliet',
    email: 'gentle883@gmail.com',
    password: 'femiok',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  validUser1: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'Juliet',
    email: 'chidimma@gmail.com',
    password: 'femiok',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  spacedField: {
    firstName: '   ',
    lastName: '    ',
    username: 'femi',
    email: 'julietezekwe@gmail.com',
    password: 'femi1',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  invalidUser: {
    firstName: '    ',
    lastName: 'Ajibade',
    username: 'femi',
    email: 'julietezekwe@gmail.com',
    password: 'femi1',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  invalidUserType: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'femi',
    email: 'julietezekwe@gmail.com',
    password: 'femi1',
    bio: '',
    imgURL: '',
    userType: 'manager',
  },
  invalidUserEmail: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'femi',
    email: 'julietezek',
    password: 'femi',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  validProfile: {
    bio: 'hahh jhvhjv hhv hgghg hhjhhj',
    imgURL: 'hhxvvh.png',
    userType: 'user'
  },
  invalidProfile: {
    bio: 'ok this is good and fine and ok and now its working my bio',
    imgURL: 'good.jpg',
    userType: 'artistsss'
  },
  invalidImage: {
    bio: 'hahh jhvhjv hhv hgghg hhjhhj',
    imgURL: 'hhxvvh.phh',
    userType: 'user'
  },
  invalidBio: {
    bio: 'hahh',
    imgURL: 'hhxvvh.jpeg',
    userType: 'user'
  }
};

const commentDetails = {
  validComment: {
    body: 'this is a good comment'
  },
  invalidComment: {
    body: '  '
  },
};
// eslint-disable-next-line import/prefer-default-export
export { userDetails, commentDetails };
