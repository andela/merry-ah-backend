import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import SocialController from '../../src/controllers/SocialsController';

const { expect } = chai;
chai.use(chaiHttp);

describe('get token for social auth', () => {
  const newUserRequest = {
    user: {
      id: 1,
      username: 'abejide femi',
      newUser: true,
      isActive: true,
      email: 'abejidefemi1@gmail.com',
      signUpType: 'social'
    }
  };

  const existingUserRequest = {
    user: {
      id: 1,
      username: 'abejide femi',
      isActive: true,
      isNewUser: false,
      email: 'abejidefemi1@gmail.com',
      signUpType: 'social'
    }
  };
});

describe('callback urls', () => {
  const googleCallbackData = {
    accessToken: {},
    refreshToken: {},
    profile: {
      displayName: 'Adewale wale',
      emails: [{ value: 'ade@yahoo.com', type: 'account' }],
    },
    done: (param1, details) => details
  };
  const twitterCallbackData = {
    accessToken: {},
    refreshToken: {},
    profile: {
      displayName: 'Adewale molade',
      emails: [{ value: 'adewale@yahoo.com', type: 'account' }],
    },
    done: (param1, details) => details
  };
  it('should hit google social auth callback', () => {
    const googleUserDetails = SocialController.googleSignIn(
      googleCallbackData.accessToken,
      googleCallbackData.refreshToken,
      googleCallbackData.profile,
      googleCallbackData.done
    );
    expect(googleUserDetails).to.eql(undefined);
  });
  it('should hit twitter social auth callback', () => {
    const twitterUserDetails = SocialController.twitterSignIn(
      twitterCallbackData.accessToken,
      twitterCallbackData.refreshToken,
      twitterCallbackData.profile,
      twitterCallbackData.done
    );
    expect(twitterUserDetails).to.eql(undefined);
  });
});
