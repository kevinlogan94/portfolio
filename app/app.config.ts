export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://swdrcvirhtbxlooklceu.supabase.co/storage/v1/object/public/images/profile_headshot.jpg',
      light: 'https://swdrcvirhtbxlooklceu.supabase.co/storage/v1/object/public/images/profile_headshot.jpg',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/kevinlogan7',
    email: 'kevinmlogan7@gmail.com',
    available: false
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
