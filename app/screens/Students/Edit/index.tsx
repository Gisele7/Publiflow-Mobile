import AppButton from '@/components/shared/appButton';
import Navbar from '@/components/shared/navbar';
import { globalStyles } from '@/components/shared/styles';
import { Text, TextInput, View } from 'react-native';

export default function EditStudent() {
  return (
    <View style={globalStyles.screen}>
      <Navbar />

      <Text style={globalStyles.title}>Editar Estudante</Text>

      <TextInput value="Aluno 1" style={globalStyles.input} />
      <TextInput value="aluno@email.com" style={globalStyles.input} />

      <AppButton title="Salvar" onPress={() => {}} />
    </View>
  );
}
