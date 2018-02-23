import { StackNavigator } from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen';
import TimerScreen from '../Containers/TimerScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  TimerScreen: { screen: TimerScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  // initialRouteName: 'LaunchScreen',
  initialRouteName: 'TimerScreen',
  navigationOptions: {
    headerStyle: styles.header,
  },
});

export default PrimaryNav;
