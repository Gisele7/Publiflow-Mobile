import AppButton from '@/components/shared/appButton';
import Header from '@/components/shared/header';
import { globalStyles } from '@/components/shared/styles';
import { Text, TextInput, View } from 'react-native';

export default function EditStudent() {
  return (
    <View style={globalStyles.screen}>
      <Header />

      <Text style={globalStyles.title}>Editar Estudante</Text>

      <TextInput value="Aluno 1" style={globalStyles.input} />
      <TextInput value="aluno@email.com" style={globalStyles.input} />

      <AppButton title="Salvar" onPress={() => {}} />
    </View>
  );
}
