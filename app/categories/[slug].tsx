import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { CATEGORIES } from '@/assets/categories';
import { PRODUCTS } from '@/assets/products';
import ProductListItem from '../components/product-list-item';

export default function Category() {
  // get slug from local params and call categories if slug exists or redirect to 404 page

  const { slug } = useLocalSearchParams<{ slug: string }>();

  const category = CATEGORIES.find(category => category.slug === slug);

  if (!category) return <Redirect href='/404' />;

  const products = PRODUCTS.filter(product => product.category.slug === slug);
  return (
    <View className="flex-1 bg-gray-100">
      <Stack.Screen options={{ title: category.name }}/>
     <View className='relative'>

     <Image source={{ uri: category?.imageUrl }} className='w-full h-44' resizeMode='cover'/>

     <View className="absolute inset-0 bg-black/30 justify-center items-center">
     <Text className="text-white text-2xl font-bold">{category?.name}</Text>
     </View>
     </View>
     <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 8 }}
        columnWrapperStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <ProductListItem product={item} />
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">
            No products found
          </Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({})