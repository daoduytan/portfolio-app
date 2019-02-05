const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BASE_URL': prod
    ? 'https://marcincholewka.herokuapp.com'
    : 'http://localhost:3000',
  'process.env.NAMESPACE': 'https://marcincholewka.herokuapp.com',
  'process.env.CLIENT_ID': 'KCPmzyc877FPttQJKXBgoCYvSABSosE2'
};
