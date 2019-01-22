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
  validUserLogin: {
    email: 'email@gmail.com',
    password: 'abcdefgh'
  },
  validUserSignup: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'Juliet',
    email: 'gentle8831@gmail.com',
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
  validUserTT: {
    firstName: 'Ben',
    lastName: 'Smith',
    username: 'Juliet',
    email: 'chidimma1@gmail.com',
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
  },
  validArtist: {
    firstName: 'Daniel',
    lastName: 'Anyaegbu',
    username: 'Danny',
    email: 'danielchidiebele@gmail.com',
    password: 'qwerty',
    bio: '',
    imgURL: '',
    userType: 'artist',
  }
};

const artDetails = {
  validArticle: {
    title: 'Cirrhosis of the Sky',
    description: 'The Syntax Podcasts isn\'t suitable for all ages',
    categoryId: 1,
    media: '[{"url":'
      + '"https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k",'
      + '"extension":"jpg"},'
      + '{"url":'
      + '"https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg",'
      + '"extension":"jpeg"}]'
  },
  validUpdatedArticle: {
    title: 'Cirrhosis of the Sky',
    slug: 'cirrhosis-of-the-sky',
    description: 'To prepare your one sentence, I suggest making a '
      + 'list of all the things you are and do (it may. ',
    categoryId: 1,
    media: '[{"url":'
      + '"https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k",'
      + '"extension":"jpg"},'
      + '{"url":'
      + '"https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg",'
      + '"extension":"jpeg"}]'
  },
  invalidArticle: {
    title: '',
    description: 'The Syntax Podcasts isn\'t suitable for all ages',
    categoryId: 1,
    media: '[{"url":'
      + '"https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k",'
      + '"extension":"jpg"},'
      + '{"url":'
      + '"https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg",'
      + '"extension":"jpeg"}]'
  },
  invalidUpdatedArticle: {
    title: 'Cirrhosis of the Sky',
    slug: 'cirrhosis-of-the-sky',
    description: 'The S',
    categoryId: 10,
    media: '[{"url":'
      + '"https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k",'
      + '"extension":"jpg"},'
      + '{"url":'
      + '"https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg",'
      + '"extension":"jpeg"}]'
  },
  invalidUpdatedArticleCategory: {
    title: 'Cirrhosis of the Sky',
    slug: 'cirrhosis-of-the-sky',
    description: 'To prepare your one sentence, I suggest making a list of all'
      + ' the things you are and do (it may feel silly, ',
    categoryId: 1000,
    media: '[{"url":'
      + '"https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k",'
      + '"extension":"jpg"},'
      + '{"url":'
      + '"https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg",'
      + '"extension":"jpeg"}]'
  },
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
export { userDetails, artDetails, commentDetails };
