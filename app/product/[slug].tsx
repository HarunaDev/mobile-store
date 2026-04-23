import { View, Text } from 'react-native'
import {useState} from 'react'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { PRODUCTS } from '@/assets/products';
import { useCartStore } from '@/store/cart-store';

export default function ProductDetails() {
    const { slug } = useLocalSearchParams<{ slug: string }>();
    const toast = useToast();

    const product = PRODUCTS.find(product => product.slug === slug);

    if (!product) return <Redirect href='/404' />;

    const { items, addItem, incrementItem, decrementItem } = useCartStore();

    const cartItem = items.find(item => item.id === product.id);

    const initialQuantity = cartItem ? cartItem.quantity : 1;

    const [quantity, setQuantity] = useState(initialQuantity);

    const increaseQuantity = () => {};

    const decreaseQuantity = () => {};

    const addToCart = () => {};
  return (
    <View>
      <Stack.Screen options={{ title: product.title }}/>
    </View>
  )
}