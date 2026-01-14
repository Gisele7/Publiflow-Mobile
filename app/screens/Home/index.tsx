import AppButton from '@/components/shared/appButton';
import Header from '@/components/shared/header';
import PostCard from '@/components/shared/postCard';
import { globalStyles } from '@/components/shared/styles';
import { router } from 'expo-router';
import { FlatList, View } from 'react-native';

const POSTS = [
  { id: '1', title: 'Título lorem ipsum', author: 'Autor da Silva', description: 'Lorem ipsum dolor sit amet...' },
  { id: '2', title: 'Outro post', author: 'Maria Souza', description: 'Conteúdo fictício do post...' },
];

export default function Home() {
  return (
    <View style={globalStyles.screen}>
      <Header />

      <AppButton
        title="Criar novo post"
        onPress={() => router.push('/screens/CreatePost')}
      />

      <FlatList
        data={POSTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => router.push('/screens/PostDetail')}
          />
        )}
      />
    </View>
  );
}
