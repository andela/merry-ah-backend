const userDetails = {
  validUser: {
    firstName: 'Femi',
    lastName: 'Ajibade',
    username: 'femi',
    email: 'julietezekwe@gmail.com',
    password: 'femi',
    bio: '',
    imgURL: '',
    userType: 'user',
  },
  invalidUser: {
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
    title:'Cirrhosis of the Sky',
    description:'Cirrhosis of the Sky, The Syntax Podcasts isn\'t suitable for all ages',
    categoryId:1,
    media: {
      "0": {
        "url": "https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k",
        "extension": "jpg"
      },
      "1": {
        "url": "https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?dl&fit=crop&crop=entropy&w=1280&h=853",
        "extension": "jpeg"
      },
      "2": {
        "url": "https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?dl&fit=crop&crop=entropy&w=1280&h=853",
        "extension": "jpeg"
      }
    }
  },
  invalidArticle: {
    title:'',
    description:'Cirrhosis of the Sky, The Syntax Podcasts isn\'t suitable for all ages',
    categoryId:1,
    media: {
      "0": {
        "url": "https://farm3.staticflickr.com/2817/33968464326_a6f9cbc754_k.jpg",
        "extension": "jpg"
      },
      "1": {
        "url": "https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?dl&fit=crop&crop=entropy&w=1280&h=853",
        "extension": "jpeg"
      },
      "2": {
        "url": "https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?dl&fit=crop&crop=entropy&w=1280&h=853",
        "extension": "jpeg"
      }
    }
  },
};

// eslint-disable-next-line import/prefer-default-export
export { userDetails, artDetails };
