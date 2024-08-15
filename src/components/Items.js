import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import axios from 'axios';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemModal from './ItemModal';
import { connect } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import { moderateScale, moderateScaleVertical, textScale } from '../constants/responsive';

const Items = ({ cart, addToCart, incrementQuantity, decrementQuantity }) => {
  const [product, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const scheme = useColorScheme(); 

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(error => console.log(error));
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          size={24}
          color={i <= Math.floor(rating) ? "#FFD700" : "#d3d3d3"}
        />
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      setModalVisible(false);
      console.log(`${selectedProduct.title} added to cart`);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleIncrement = (productId) => {
    incrementQuantity(productId);
  };

  const handleDecrement = (productId) => {
    decrementQuantity(productId);
  };

  const renderItem = ({ item }) => {
    const cartItem = cart[item.id];
    const isItemInCart = !!cartItem;
    const displayPrice = isItemInCart ? cartItem.totalPrice : item.price;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setSelectedProduct(item);
          setModalVisible(true);
        }}
      >
        <Image source={{ uri: item.image }} style={styles.imageStyle} />
        <View style={styles.textContainer}>
          <Text style={[styles.textStyle, { color: scheme === 'dark' ? colors.whiteColor : colors.blackColor }]}>
            {item.title}
          </Text>
          <View style={styles.ratingStyle}>
            {renderStars(item.rating.rate)}
            <Text>{item.rating.count}</Text>
          </View>
          <View style={styles.priceQuantityContainer}>
            <Text style={[styles.textStyle, { color: scheme === 'dark' ? colors.whiteColor : colors.blackColor }]}>
              Rs: {displayPrice}
            </Text>
            {isItemInCart && (
              <View style={styles.quantityControls}>
                <TouchableOpacity onPress={() => handleDecrement(item.id)}>
                  <Text style={[styles.quantityButton, { color: scheme === 'dark' ? colors.whiteColor : colors.blackColor }]}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.quantityText, { color: scheme === 'dark' ? colors.whiteColor : colors.blackColor }]}>
                  {cartItem.quantity}
                </Text>
                <TouchableOpacity onPress={() => handleIncrement(item.id)}>
                  <Text style={[styles.quantityButton, { color: scheme === 'dark' ? colors.whiteColor : colors.blackColor }]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={{ color: scheme === 'dark' ? colors.whiteColor : colors.blackColor }}>
            Category: {item.category}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: scheme === 'dark' ? colors.blackColor : colors.whiteColor }}>
      <Text style={[styles.HeaderTextStyle, { color: scheme === 'dark' ? colors.whiteColor : colors.blackColor }]}>
        Shopping
      </Text>
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      {selectedProduct && (
        <ItemModal
          selectedProduct={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  addToCart,
  incrementQuantity,
  decrementQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Items);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
    marginVertical: moderateScaleVertical(5),
    margin: moderateScale(10),
  },
  imageStyle: {
    width: moderateScale(100),
    height: moderateScale(100),
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: moderateScale(10),
  },
  textStyle: {
    fontSize: textScale(16),
    fontWeight: '500',
    flexWrap: 'wrap',
    marginBottom: moderateScale(5),
  },
  ratingStyle: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: moderateScale(5),
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateScaleVertical(5),
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray7,
    borderRadius: 10,
  },
  quantityButton: {
    fontSize: textScale(20),
    fontWeight: 'bold',
    marginHorizontal: moderateScale(10),
    padding: moderateScale(2),
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
  },
  HeaderTextStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: colors.blueColor,
    margin: moderateScale(10),
    fontSize: textScale(30),
    textDecorationLine: 'underline',
    padding:moderateScale(10)
    
  },
});
