import { useCartStore } from "@/store/cart-store";
import {
  View,
  Text,
  Alert,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

type CartItemType = {
  id: number;
  title: string;
  image: any;
  price: number;
  quantity: number;
};

type CartItemProps = {
  item: CartItemType;
  onRemove: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

// Cart Item
const CartItem = ({
  item,
  onDecrement,
  onIncrement,
  onRemove,
}: CartItemProps) => {
  return (
    <View className="flex-row items-center bg-white p-4 mb-3 rounded-2xl shadow">
      <Image source={item.image} className="w-16 h-16 rounded-lg mr-4" />

      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          ${item.price.toFixed(2)}
        </Text>

        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            onPress={() => onDecrement(item.id)}
            className="bg-gray-200 px-3 py-1 rounded-lg"
          >
            <Text className="text-lg">-</Text>
          </TouchableOpacity>

          <Text className="mx-3 text-base font-medium">{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => onIncrement(item.id)} // ✅ FIXED
            className="bg-gray-200 px-3 py-1 rounded-lg"
          >
            <Text className="text-lg">+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => onRemove(item.id)}>
        <Text className="text-red-500 font-medium">Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Cart() {
  const { items, removeItem, incrementItem, decrementItem, getTotalPrice } =
    useCartStore();

  const handleCheckout = () => {
    Alert.alert("Proceeding to Checkout", `Total amount: $${getTotalPrice()}`);
  };
  return (
    <View>
      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}

      {/* <FlatList data={items} keyExtractor={item => item.id.toString()} renderItem={({item}) => (
        <CartItem 
          item={item}
          onRemove={removeItem}
          onIncrement={incrementItem}
          onDecrement={decrementItem}
        />
        
        )} />  */}

      {items.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">Your cart is empty 🛒</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onRemove={removeItem}
              onIncrement={incrementItem}
              onDecrement={decrementItem}
            />
          )}
        />
      )}
      {/* <View>
        <Text>${getTotalPrice()}</Text>
        <TouchableOpacity onPress={handleCheckout}>
          <Text>Checkout</Text>
        </TouchableOpacity>
      </View> */}

      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold">Total:</Text>
          <Text className="text-xl font-bold text-green-600">
            ${getTotalPrice()}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleCheckout}
          className="bg-green-600 py-3 rounded-xl items-center"
        >
          <Text className="text-white text-lg font-semibold">Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
