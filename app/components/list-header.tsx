import { View, Text, Image, Pressable, TouchableOpacity, FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { CATEGORIES } from '@/assets/categories'
import { Link } from 'expo-router'
import { useCartStore } from '@/store/cart-store'

export default function ListHeader() {
    const {getItemCount} = useCartStore();
  return (
    <View className="px-4 pt-4 bg-gray-100">

      {/* 🔝 Top Header */}
      <View className="flex-row items-center justify-between mb-6">
        
        {/* Left: Avatar + Greeting */}
        <View className="flex-row items-center gap-3">
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            className="w-10 h-10 rounded-full"
          />
          <Text className="text-lg font-semibold text-gray-800">
            Hello Shopper
          </Text>
        </View>

        {/* Right: Icons */}
        <View className="flex-row items-center gap-5">
          
          {/* Cart */}
          <Link asChild href={`/cart/`}>
          <Pressable className="relative">
            <FontAwesome name="shopping-cart" size={22} color="gray" />

            {/* Badge */}
            <View className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">{getItemCount()}</Text>
            </View>
          </Pressable>
          </Link>

          {/* Logout */}
          <TouchableOpacity>
            <FontAwesome name="sign-out" size={22} color="red" />
          </TouchableOpacity>

        </View>
      </View>

      {/* 🎯 Hero Card */}
      <View className="mb-6">
        <Image
          source={require('@/assets/images/hero.png')}
          className="w-full h-40 rounded-2xl"
          resizeMode="cover"
        />
      </View>

      {/* 🧩 Categories */}
      <View>
        <Text className="text-xl font-bold mb-3 text-gray-800">
          Categories
        </Text>

        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Link asChild href={`/categories/${item.slug}`}>
              <Pressable className="mr-4 items-center">
                
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-16 h-16 rounded-full mb-1"
                />

                <Text className="text-sm text-gray-700">
                  {item.name}
                </Text>

              </Pressable>
            </Link>
          )}
        />
      </View>

    </View>
  )
}