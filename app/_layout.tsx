import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'LAB 3 FORMS ' }} />
      <Stack.Screen name="employee-form" options={{ title: 'Employee Form' }} />
      <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
     
    </Stack>
  );
}