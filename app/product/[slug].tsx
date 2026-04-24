import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { PRODUCTS } from "@/assets/products";
import { useCartStore } from "@/store/cart-store";

export default function ProductDetails() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const toast = useToast();

  const product = PRODUCTS.find((product) => product.slug === slug);

  if (!product) return <Redirect href="/404" />;

  const { items, addItem, incrementItem, decrementItem } = useCartStore();

  const cartItem = items.find(item => item.id === product.id);

  const initialQuantity = cartItem ? cartItem.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = () => {
    if ( quantity < product.maxQuantity ) {
        setQuantity(prev => prev + 1);
        // incrementItem(product.id);
    } else {
        toast.show('Cannot add more than maximum quantity', {
            type: 'warning',
            placement: 'top',
        });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
        setQuantity(prev => prev - 1);
        // decrementItem(product.id);
    }
  };

  const addToCart = () => {
    addItem({
        id: product.id,
        title: product.title,
        image: product.heroImage,
        price: product.price,
        quantity,
    });
    setQuantity(1);
    toast.show('Added to cart', {
        type: "Success",
        placement: "top",
        duration: 1500
    })
  };

  const totalPrice = (product.price * quantity).toFixed(2);
  return (
    <View className="flex-1 bg-gray-100">
      <Stack.Screen options={{ title: product.title }} />

      {/* 🖼️ Product Image */}
      <Image
        source={product.heroImage}
        className="w-full h-72"
        resizeMode="cover"
      />

      {/* 📦 Content Container */}
      <View className="bg-white -mt-6 rounded-t-3xl px-5 pt-6 pb-10 flex-1">
        {/* 🏷️ Title */}
        <Text className="text-2xl font-bold text-gray-900">
          {product.title}
        </Text>

        {/* 🔗 Slug / subtitle */}
        <Text className="text-gray-500 mt-1">{product.slug}</Text>

        {/* 💰 Pricing */}
        <View className="mt-6 bg-gray-50 p-4 rounded-xl">
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Unit Price</Text>
            <Text className="font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between mt-2">
            <Text className="text-gray-600">Total</Text>
            <Text className="font-bold text-lg text-primaryColor">
              ${totalPrice}
            </Text>
          </View>
        </View>

        <FlatList
          data={product.imagesUrl}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-6"
          renderItem={({ item }) => (
            <Image
              source={item}
              className="w-24 h-24 rounded-lg mr-3"
              resizeMode="cover"
            />
          )}
        />

        <View className="flex-row items-center justify-between bg-gray-100 p-3 rounded-xl">
            <TouchableOpacity onPress={decreaseQuantity} disabled={quantity <= 1} className={`px-4 py-2 rounded-lg ${quantity <= 1 ? "bg-gray-300" : "bg-white"}`}>
                <Text className="text-lg font-bold text-gray-800">-</Text>
            </TouchableOpacity>

            <Text className="text-lg font-semibold text-gray-900">{quantity}</Text>

            <TouchableOpacity onPress={increaseQuantity} disabled={quantity >= product.maxQuantity} className={`px-4 py-2 rounded-lg ${
        quantity >= product.maxQuantity ? "bg-gray-300" : "bg-white"
      }`}>
                <Text className="text-lg font-bold text-gray-800">+</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={addToCart} disabled={quantity === 0} className={`mt-5 py-4 rounded-xl items-center ${
      quantity === 0 ? "bg-gray-400" : "bg-green-500"
    }`}>
                <Text className="text-white font-bold text-lg">Add to Cart</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
