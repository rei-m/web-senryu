export const ROUTING = {
  root: '/',
  senryu: '/senryu/',
  senryuNew: '/senryu/new/', // ライブラリverを上げたら /senryu/new/ のroutingが効かなくなったのでやむなく変更
  senryuShow: '/senryu/:id/',
  usersShow: '/users/:id/',
  about: '/about/',
  privacyPolicy: '/policy/',
  termsOfService: '/terms/',
  auth: '/auth/',
  account: '/account/',
} as const;
