export default defineAppConfig({
  global: {
    picture: {
      light: '/profile_headshot.avif',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
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
      'icon': 'i-simple-icons-instagram',
      'to': 'https://www.instagram.com/coding.kevin_',
      'target': '_blank',
      'aria-label': 'Kevin Logan on Instagram'
    }]
  }
})
