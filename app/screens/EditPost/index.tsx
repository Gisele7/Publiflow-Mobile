import AppButton from '@/components/shared/appButton';
import Header from '@/components/shared/header';
import { globalStyles } from '@/components/shared/styles';
import { Text, TextInput, View } from 'react-native';

export default function EditPost() {
  return (
    <View style={globalStyles.screen}>
      <Header />

      <Text style={globalStyles.title}>Editar Post</Text>

      <TextInput value="Título existente" style={globalStyles.input} />
      <TextInput
        value="Conteúdo existente"
        multiline
        style={[globalStyles.input, { height: 120 }]}
      />

      <AppButton title="Salvar" onPress={() => {}} />
    </View>
  );
}
