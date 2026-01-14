import Header from '@/components/shared/header';
import PostCard from '@/components/shared/postCard';
import { globalStyles } from '@/components/shared/styles';
import { FlatList, View } from 'react-native';

const POSTS = [
  { id: '1', title: 'Post Admin', author: 'Admin', description: 'Gerenciamento de posts' },
];

export default function AdminPosts() {
  return (
    <View style={globalStyles.screen}>
      <Header />

      <FlatList
        data={POSTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} />
        )}
      />
    </View>
  );
}
