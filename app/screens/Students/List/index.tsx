import AppButton from '@/components/shared/appButton';
import Navbar from '@/components/shared/navbar';
import { globalStyles } from '@/components/shared/styles';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export default function StudentList() {
  return (
    <View style={globalStyles.screen}>
      <Navbar />

      <Text style={globalStyles.title}>Estudantes</Text>

      <AppButton title="Cadastrar Estudante" onPress={() => {
        router.push('/screens/Students/Create');
      }} />

      <View style={{ marginTop: 16 }}>
        <Text>Aluno 1</Text>
      </View>
    </View>
  );
}
