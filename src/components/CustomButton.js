import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

const CustomButton = ({ onPress, imageSource, buttonText, backgroundColor, textColor, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, { backgroundColor }, style]}>
      {imageSource && (
        <Image source={imageSource} style={styles.buttonImage} />
      )}
      <Text style={[styles.buttonText, { color: textColor }]}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
