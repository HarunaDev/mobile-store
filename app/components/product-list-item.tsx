import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Product } from '@/types/product';
import { Link } from 'expo-router';

export default function ProductListItem({ product }: {product: Product}) {
    
  return (
    <Link href={`/product/${product.slug}`} asChild>
        <Pressable
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
    </Link>
  )
}