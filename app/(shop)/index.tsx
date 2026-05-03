import { PRODUCTS } from "@/assets/products";
import { FlatList, StyleSheet, View } from "react-native";
import ProductListItem from "../components/product-list-item";
import ListHeader from "../components/list-header";

const Home = () => {
  return (
    <View className="flex-1 bg-gray-100 pt-10">
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => ( <ProductListItem product={item}/> )}
        keyExtractor={(item) => item?.id.toString()}
        numColumns={2}
        ListHeaderComponent={<ListHeader />}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
