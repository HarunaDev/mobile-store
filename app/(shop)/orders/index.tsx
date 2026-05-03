import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ORDERS } from "@/assets/orders";
import { Link, Stack } from "expo-router";
import { Order, OrderStatus } from "@/types/order";
import { statusDisplayText, statusStyles } from "@/constants/order-status";

// const statusDisplayText: Record<OrderStatus, string> = {
//   Pending: "Pending",
//   Completed: "Completed",
//   Shipped: "Shipped",
//   InTransit: "InTransit",
// };

// const statusStyles: Record<OrderStatus, string> = {
//   Pending: "bg-yellow-100 text-yellow-700",
//   Completed: "bg-green-100 text-green-700",
//   Shipped: "bg-blue-100 text-blue-700",
//   InTransit: "bg-purple-100 text-purple-700",
// };

const renderItem: ListRenderItem<Order> = ({ item }) => (
  <Link href={`/orders/${item.slug}`} asChild>
    <Pressable className="mb-4">
      <View className="flex-row items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-semibold text-black">{item.item}</Text>

          <Text className="mt-1 text-sm text-gray-500">{item.details}</Text>

          <Text className="mt-2 text-xs text-gray-400">{item.date}</Text>
        </View>

        <View className={`rounded-full px-3 py-1 ${statusStyles[item.status].container}`}>
          <Text className={`text-xs font-semibold ${statusStyles[item.status].text}`}>
            {statusDisplayText[item.status]}
          </Text>
        </View>
      </View>
    </Pressable>
  </Link>
);

export default function Orders() {
  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6">
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
