import { PRODUCTS } from "@/assets/products";
import { FlatList, StyleSheet, Text, View } from "react-native";
// import React from 'react'

const Home = () => {
  return (
    <View>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => (
        <View>
          <Text>{item.title}</Text>
        </View>
        )}
        keyExtractor={(item) => item?.id.toString()}
        numColumns={2}
        ListHeaderComponent={<Text>Products</Text>}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
