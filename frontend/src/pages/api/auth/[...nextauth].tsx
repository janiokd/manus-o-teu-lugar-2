import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
  secret: 'SECRET',
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: '37602488468-6rpkhl3sllu86f878cp44gk03dl34oi1.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    FacebookProvider({
      clientId: '9390440657691142',
      clientSecret: '7d9023bef531e710d7ffbf1bb3d35cc7',
    }),

    AppleProvider({
      clientId: 'APPLE_CLIENT_ID',
      clientSecret: 'APPLE_CLIENT_SECRET',
    }),
  ],
});
