import Header from '@/components/shared/header';
import { globalStyles } from '@/components/shared/styles';
import { Text, View } from 'react-native';

export default function PostDetail() {
  return (
    <View style={globalStyles.screen}>
      <Header />

      <Text style={globalStyles.title}>Título do Post</Text>
      <Text>Autor: Professor A</Text>

      <Text style={{ marginTop: 16 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Conteúdo completo fictício do post.
      </Text>
    </View>
  );
}
