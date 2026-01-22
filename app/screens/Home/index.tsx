import api from '@/app/api/api';
import AppButton from '@/components/shared/appButton';
import Header from '@/components/shared/header';
import PostCard from '@/components/shared/postCard';
import { globalStyles } from '@/components/shared/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import IPostData from '@/app/interface/IPostData';


export default function Home() {
  const [posts, setPosts] = useState<IPostData[]>([]);

  useEffect(() => {
    api.get("/posts")
      .then((res) => setPosts(res.data))
      .catch(console.error);
  }, []);


  return (
    <View style={globalStyles.screen}>
      <Header />

      <AppButton
        title="Criar novo post"
        onPress={() => router.push('/screens/CreatePost')}
      />

      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
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
