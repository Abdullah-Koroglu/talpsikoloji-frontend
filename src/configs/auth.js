export default {
  meEndpoint: '/users/me?populate=role',
  loginEndpoint: '/auth/local',
  registerEndpoint: '/auth/local/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken'
}
