import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, RefreshControl } from 'react-native';
import ProductCard from '../components/ProductCard';
import { addToCart } from '../db/database';

const API_URL = 'https://fakestoreapi.com/products';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} onAddToCart={() => handleAddToCart(item)} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});