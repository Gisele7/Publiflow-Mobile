import AppButton from '@/components/shared/appButton';
import Navbar from '@/components/shared/navbar';
import { globalStyles } from '@/components/shared/styles';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export default function TeacherList() {
  return (
    <View style={globalStyles.screen}>
      <Navbar />

      <Text style={globalStyles.title}>Professores</Text>

      <AppButton title="Cadastrar Professor" onPress={() => {
        router.push('/screens/Teachers/Create');
      }} />

      <View style={{ marginTop: 16 }}>
        <Text>Professor A</Text>
      </View>
    </View>
  );
}
