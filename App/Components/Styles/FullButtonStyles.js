import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../Themes/';

export default StyleSheet.create({
  button: {
    marginVertical: 5,
    borderTopColor: Colors.violet,
    borderBottomColor: Colors.lightClementine,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: Colors.banner
  },
  buttonText: {
    margin: 18,
    textAlign: 'center',
    color: Colors.dawn,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  }
});
