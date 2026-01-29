import api from '@/app/api/api';
import Header from '@/components/shared/header';
import PostCard from '@/components/shared/postCard';
import { globalStyles } from '@/components/shared/styles';
import IPostData from '@/interface/IPostData';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';



export default function AdminPosts() {

  const [posts, setPosts] = useState<IPostData[]>([]);
  
    useEffect(() => {
      api.get("/posts")
        .then((res) => {
          setPosts(res.data);
          console.log(posts);
        })
        .catch(console.error);
    }, []);

  return (
    <View style={globalStyles.screen}>
      <Header />

      <FlatList
        data={posts}
        keyExtractor={item => item.id as any}
        renderItem={({ item }) => (
          <PostCard post={item} onPress={() => {}} />
        )}
      />
    </View>
  );
}
