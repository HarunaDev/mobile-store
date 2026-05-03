import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { ORDERS } from '@/assets/orders';
import { statusDisplayText, statusStyles } from "@/constants/order-status";
import { Order } from '@/types/order';

export default function OrderDetails() {
    const  { slug } = useLocalSearchParams<{ slug: string }>();

    // const order = ORDERS.find(order => order.slug === slug)
    const order: Order | undefined = ORDERS.find(
        (order) => order.slug === slug
      );

    if (!order) return <Redirect href='/404' />
    return (
        <View className="flex-1 bg-gray-100 px-4 pt-6">
          <Stack.Screen
            options={{
              title: order.item,
            }}
          />
    
          {/* Order Card */}
          <View className="rounded-2xl bg-white p-5 shadow-sm">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <Text className="text-2xl font-bold text-black">
                  {order.item}
                </Text>
    
                <Text className="mt-2 text-base text-gray-500">
                  {order.details}
                </Text>
    
                <Text className="mt-4 text-sm text-gray-400">
                  Ordered on {order.date}
                </Text>
              </View>
    
              {/* Status Badge */}
              <View
                className={`rounded-full px-3 py-1 ${
                  statusStyles[order.status].container
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    statusStyles[order.status].text
                  }`}
                >
                  {statusDisplayText[order.status]}
                </Text>
              </View>
            </View>
          </View>
    
          {/* Items Section */}
          <View className="mt-6">
            <Text className="mb-4 text-lg font-semibold text-black">
              Items Ordered
            </Text>
    
            <FlatList
              data={order.items}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View className="h-4" />
              )}
              renderItem={({ item }) => (
                <View className="flex-row rounded-2xl bg-white p-4 shadow-sm">
                  <Image
                    source={item.heroImage}
                    className="h-24 w-24 rounded-xl"
                    resizeMode="cover"
                  />
    
                  <View className="ml-4 flex-1 justify-center">
                    <Text className="text-lg font-semibold text-black">
                      {item.title}
                    </Text>
    
                    <Text className="mt-2 text-base text-gray-500">
                      ${item.price}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      );
}