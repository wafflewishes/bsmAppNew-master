import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            path: 'home_page',
            screens: {
              Home: 'featured',
              EventPage: 'event',
              Web: 'web',
            }
          },
          Links: {
            path: 'calendar_page',
            screens: {
              Calendar: 'calendar',
              EventPage: 'event',
              PastEvents: 'past_events',
              Web: 'web'
            }
          }
        },
      },
      Week: {
        path: 'weekly'
      },
      Offline: 'offline'
    },

  },
};
