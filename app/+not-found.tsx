// app/+not-found.tsx
import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
      <View className="flex-1 items-center justify-center bg-white p-6">
        {/* Visual Cue */}
        <Text className="text-9xl font-bold text-gray-200 absolute">404</Text>
        
        <View className="items-center">
          <Text className="text-2xl font-semibold text-gray-800 mb-2">
            Page Not Found
          </Text>
          <Text className="text-base text-gray-500 text-center mb-8">
            The screen you're looking for doesn't exist or has been moved.
          </Text>

          {/* Styled Link as a Button */}
          <Link href="/" className="bg-blue-600 px-8 py-3 rounded-full">
            <Text className="text-white font-medium text-lg">
              Return Home
            </Text>
          </Link>
        </View>
      </View>
    </>
  );
}
