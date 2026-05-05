import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Redirect, Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Toast } from "react-native-toast-notifications";
import { useAuth } from "@/providers/auth-provider";

const authSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export default function Auth() {
  const { session } = useAuth();

  if (session) return <Redirect href='/' />
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signIn = async (data: zod.infer<typeof authSchema>) => {
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      alert(error.message);
    } else {
      Toast.show('Signed in successfully', {
        type: 'success',
        placement: 'top',
        duration: 1500,
      })
    }
  };

  const signUp = async (data: zod.infer<typeof authSchema>) => {
    const { error } = await supabase.auth.signUp(data);

    if (error) {
      alert(error.message);
    } else {
      Toast.show('Signed up successfully', {
        type: 'success',
        placement: 'top',
        duration: 1500,
      })
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/37178225/pexels-photo-37178225/free-photo-of-stylish-mood-board-in-cozy-interior-design-studio.jpeg?auto=compress&cs=tinysrgb&w=600&loading=lazy",
      }}
      resizeMode="cover"
      className="flex-1"
    >
      {/* Dark Overlay */}
      <View className="flex-1 bg-black/60">
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center px-6"
        >
          <View className="rounded-3xl bg-white/10 p-6 backdrop-blur-lg">
            {/* Header */}
            <View className="mb-8">
              <Text className="text-4xl font-bold text-white">Welcome</Text>

              <Text className="mt-2 text-base text-gray-300">
                Sign in to continue
              </Text>
            </View>

            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <View className="mb-5">
                  <TextInput
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholderTextColor="#9ca3af"
                    autoCapitalize="none"
                    editable={!formState.isSubmitting}
                    className="rounded-2xl border border-white/20 bg-white/15 px-4 py-4 text-white"
                  />

                  {error && (
                    <Text className="mt-2 text-sm text-red-400">
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name="password"
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <View className="mb-6">
                  <TextInput
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    placeholderTextColor="#9ca3af"
                    autoCapitalize="none"
                    editable={!formState.isSubmitting}
                    className="rounded-2xl border border-white/20 bg-white/15 px-4 py-4 text-white"
                  />

                  {error && (
                    <Text className="mt-2 text-sm text-red-400">
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Sign In */}
            <TouchableOpacity
              onPress={handleSubmit(signIn)}
              disabled={formState.isSubmitting}
              className="mb-4 rounded-2xl bg-indigo-500 py-4"
            >
              <Text className="text-center text-base font-semibold text-white">
                Sign In
              </Text>
            </TouchableOpacity>

            {/* Sign Up */}
            <TouchableOpacity
              onPress={handleSubmit(signUp)}
              disabled={formState.isSubmitting}
              className="rounded-2xl border border-white/30 py-4"
            >
              <Text className="text-center text-base font-semibold text-white">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}
