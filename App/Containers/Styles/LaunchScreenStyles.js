import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin,
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo / 2,
    width: Metrics.images.logo / 2,
    resizeMode: 'contain',
  },
  centered: {
    alignItems: 'center',
  },
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
    backgroundColor: Colors.darkViolet,
  },
  sectionText: {
    ...ApplicationStyles.screen.sectionText,
    color: Colors.dawn,
  },
});
