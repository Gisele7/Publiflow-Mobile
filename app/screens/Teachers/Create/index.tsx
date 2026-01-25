import AppButton from '@/components/shared/appButton';
import Navbar from '@/components/shared/navbar';
import { globalStyles } from '@/components/shared/styles';
import { Text, TextInput, View } from 'react-native';

export default function CreateTeacher() {
  return (
    <View style={globalStyles.screen}>
      <Navbar />

      <Text style={globalStyles.title}>Cadastrar Professor</Text>

      <TextInput placeholder="Nome" style={globalStyles.input} />
      <TextInput placeholder="E-mail" style={globalStyles.input} />
      <TextInput placeholder="Telefone" style={globalStyles.input} />

      <AppButton title="Cadastrar" onPress={() => {}} />
    </View>
  );
}
