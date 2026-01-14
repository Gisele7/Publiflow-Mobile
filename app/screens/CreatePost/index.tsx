import AppButton from '@/components/shared/appButton';
import Header from '@/components/shared/header';
import { globalStyles } from '@/components/shared/styles';
import { Text, TextInput, View } from 'react-native';

export default function CreatePost() {
  return (
    <View style={globalStyles.screen}>
      <Header />

      <Text style={globalStyles.title}>Novo Post</Text>

      <TextInput placeholder="Título" style={globalStyles.input} />
      <TextInput placeholder="Descrição" style={globalStyles.input} />
      <TextInput
        placeholder="Conteúdo"
        multiline
        style={[globalStyles.input, { height: 120 }]}
      />

      <AppButton title="Salvar" onPress={() => {}} />
    </View>
  );
}
