export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://firebasestorage.googleapis.com/v0/b/personal-web-application.appspot.com/o/profile%2Fprofile_headshot_.jpg?alt=media&token=2665e26c-8ab7-4de0-9da9-14e487cfb9f4',
      light: 'https://firebasestorage.googleapis.com/v0/b/personal-web-application.appspot.com/o/profile%2Fprofile_headshot_.jpg?alt=media&token=2665e26c-8ab7-4de0-9da9-14e487cfb9f4',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/kevinlogan7',
    email: 'kevinmlogan7@gmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    }
  },
  uiPro: {
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://www.linkedin.com/in/kevinlogan94',
      'target': '_blank',
      'aria-label': 'Kevin Logan on LinkedIn'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/kevinlogan94',
      'target': '_blank',
      'aria-label': 'Kevin Logan on GitHub'
    }, {
      'icon': 'i-simple-icons-leetcode',
      'to': 'https://leetcode.com/u/6uNMnKlWG9/',
      'target': '_blank',
      'aria-label': 'Kevin Logan on LeetCode'
    }]
  }
})
