import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      {/* Tela inicial */}
      <Stack.Screen name="index" />

      {/* Autenticação */}
      <Stack.Screen name="screens/Login/index" />

      {/* Posts */}
      <Stack.Screen name="screens/Home/index" />
      <Stack.Screen name="screens/PostDetail/index" />
      <Stack.Screen name="screens/CreatePost/index" />
      <Stack.Screen name="screens/EditPost/index" />
      <Stack.Screen name="screens/AdminPosts/index" />

      {/* Professores */}
      <Stack.Screen name="screens/Teachers/List/index" />
      <Stack.Screen name="screens/Teachers/Create/index" />
      <Stack.Screen name="screens/Teachers/Edit/index" />

      {/* Estudantes */}
      <Stack.Screen name="screens/Students/List/index" />
      <Stack.Screen name="screens/Students/Create/index" />
      <Stack.Screen name="screens/Students/Edit/index" />
    </Stack>
  );
}
