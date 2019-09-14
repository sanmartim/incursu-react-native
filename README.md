
## Installation

```bash
npm install sanmartim/incursu-react-native
```

## usage

```javascript

import Incursu from 'incursu-react-native';

const client = new Incursu(YOUR_KEY);

client.register({
  email: 'react2@incursu.com',
});

let eventBody = {
  'track': 'Item Purchased'
  'email': 'react2@incursu.com'
};

client.track(eventBody);

});

```

## listem to state change

```javascript
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Incursu from 'incursu-react-native';

const client = new Incursu(YOUR_KEY);

client.register({
  email: 'react2@incursu.com',
});


// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const AppNavigator = createStackNavigator(AppRouteConfigs);
const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <AppContainer
    onNavigationStateChange={(prevState, currentState, action) => {
      const currentScreen = getActiveRouteName(currentState);
      const prevScreen = getActiveRouteName(prevState);

      if (prevScreen !== currentScreen) {
        // the line below uses the Google Analytics tracker
        // change the tracker here to use other Mobile analytics SDK.
        
        
        let eventBody = {
          'track': currentScreen
          'email': 'react2@incursu.com'
        };

        client.track(eventBody);

      }
    }}
  />
);
```