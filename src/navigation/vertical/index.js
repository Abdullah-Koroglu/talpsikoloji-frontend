const navigation = () => {
  return [
    {
      title: 'Kullanıcılar',
      path: '/users',
      icon: 'mdi:user-outline',
    },

    // {
    //   title: 'Home',
    //   path: '/home',
    //   icon: 'mdi:home-outline',
    // },
    // {
    //   title: 'Second Page',
    //   path: '/second-page',
    //   icon: 'mdi:email-outline',
    // },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'mdi:shield-outline',
    // },
    {
      path: '/tracks',
      action: 'read',
      subject: 'acl-page',
      title: 'Dinletiler',
      icon: 'mdi:headphones',
    }
  ]
}

export default navigation
