import { router } from 'expo-router';
import { Button, View } from 'react-native';

export default function Navbar() {
  return (
    <View>
      <Button title="Posts" onPress={() => router.push('/screens/Home')} />
      <Button title="Admin" onPress={() => router.push('/screens/AdminPosts')} />
    </View>
  );
}
