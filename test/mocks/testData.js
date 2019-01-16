const userDetails = {
  validUser: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'Juliet',
    email: 'julietezekwe@gmail.com',
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
};

const artDetails = {
  validArticle: {
    title: 'Cirrhosis of the Sky',
    description: 'The Syntax Podcasts isn\'t suitable for all ages',
    categoryId: 1,
    media: {
      0: {
        url: 'https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k.jpg',
        extension: 'jpg'
      },
      1: {
        url:
          'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
        extension: 'jpeg'
      },
      2: {
        url:
          'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
        extension: 'jpeg'
      }
    }
  },
  invalidArticle: {
    title: '',
    description: 'The Syntax Podcasts isn\'t suitable for all ages',
    categoryId: 1,
    media: {
      0: {
        url: 'https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k.jpg',
        extension: 'jpg'
      },
      1: {
        url:
          'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
        extension: 'jpeg'
      },
      2: {
        url:
          'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
        extension: 'jpeg'
      }
    }
  },
};

// eslint-disable-next-line import/prefer-default-export
export { userDetails, artDetails };
