import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Product } from '@/types/product'
import { useNavigation } from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
type RootStackParamList = {
    Home: undefined;
    product: { slug: string };
  };

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'product'
>;


export default function ProductListItem({ product }: {product: Product}) {
    const navigation = useNavigation<NavigationProp>();
  return (
    <Pressable onPress={() => navigation.navigate('product', { slug: product.slug })}
    className="flex-1 m-2 bg-white rounded-xl shadow p-3">
        <View className="flex-1 m-2 bg-white rounded-xl shadow p-3">
      <Image
        source={product.heroImage}
        className="w-full h-40 rounded-lg"
        resizeMode="cover"
      />

      <View className="mt-2">
        <Text className="text-base font-semibold">{product.title}</Text>
        <Text className="text-lg font-bold mt-1">
          ${product.price.toFixed(2)}
        </Text>
      </View>
    </View>
    </Pressable>
  )
}