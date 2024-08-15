import React from 'react';
import {Modal, StyleSheet, Text, View, Image} from 'react-native';
import CustomButton from './CustomButton';
import ImagePath from '../constants/ImagePath';
import colors from '../constants/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../constants/responsive';

const ItemModal = ({selectedProduct, onClose, onAddToCart}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selectedProduct}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {selectedProduct && (
            <>
              <Image
                source={{uri: selectedProduct.image}}
                style={styles.modalImage}
              />
              <View style={{flexDirection: 'row', gap: 4}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: textScale(16),
                    color: colors.blackColor,
                  }}>
                  Description:
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedProduct.description}
                </Text>
              </View>

              <View style={styles.ModalBtnStyle}>
                <CustomButton
                  onPress={onAddToCart}
                  imageSource={ImagePath.addCartIcon}
                  buttonText="Add To Cart"
                  backgroundColor="#FF0000"
                  textColor="#FFFFFF"
                  style={styles.customButton}
                />
                <CustomButton
                  onPress={onClose}
                  buttonText="Close"
                  backgroundColor="#CCCCCC"
                  textColor="#000000"
                  style={styles.customButton}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ItemModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: moderateScale(20),
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
  },
  modalImage: {
    width: '100%',
    height: '30%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: textScale(14),

    textAlign: 'start',
    flex: 1,
    color: colors.blackColor,
  },
  ModalBtnStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: moderateScale(30),
  },
  customButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});
