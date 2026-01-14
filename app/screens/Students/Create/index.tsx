import AppButton from '@/components/shared/appButton';
import Header from '@/components/shared/header';
import { globalStyles } from '@/components/shared/styles';
import { Text, TextInput, View } from 'react-native';

export default function CreateStudent() {
  return (
    <View style={globalStyles.screen}>
      <Header />

      <Text style={globalStyles.title}>Cadastrar Estudante</Text>

      <TextInput placeholder="Nome" style={globalStyles.input} />
      <TextInput placeholder="E-mail" style={globalStyles.input} />

      <AppButton title="Cadastrar" onPress={() => {}} />
    </View>
  );
}
