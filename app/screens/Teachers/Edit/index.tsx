import AppButton from '@/components/shared/appButton';
import Navbar from '@/components/shared/navbar';
import { globalStyles } from '@/components/shared/styles';
import { Text, TextInput, View } from 'react-native';

export default function EditTeacher() {
  return (
    <View style={globalStyles.screen}>
      <Navbar />

      <Text style={globalStyles.title}>Editar Professor</Text>

      <TextInput value="Professor A" style={globalStyles.input} />
      <TextInput value="prof@email.com" style={globalStyles.input} />

      <AppButton title="Salvar" onPress={() => {}} />
    </View>
  );
}
