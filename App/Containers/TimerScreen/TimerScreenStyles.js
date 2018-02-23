import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 35,
    left: 10,
    width: 120,
    textAlign: 'center',
    color: Colors.lightClementine,
    fontSize: 50,
    fontWeight: '100',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#152d44',
    backgroundColor: Colors.border,
    padding: 50,
  },
  text: {
    ...Fonts.style.h4,
    color: Colors.lightClementine,
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: Metrics.screenWidth - (4 * Metrics.marginHorizontal),
  },
});
