import { AppRegistry } from 'react-native';
import Root from './app/Router';
import { Text } from 'react-native';
Text.defaultProps.allowFontScaling = false
AppRegistry.registerComponent('consumer-app', () => Root);
