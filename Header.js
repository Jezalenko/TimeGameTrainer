import React from 'react';
import { View, Image } from 'react-native';

const Header = () => {
  return (
    <View>
      <Image source={require('./assets/win-pn0026798.jpeg')} style={{width: '100%', resizeMode: 'contain'}} />
    </View>
  );
};

export default Header;
