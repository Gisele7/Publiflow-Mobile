import Navbar from '@/components/shared/navbar';
import PostCard from '@/components/shared/postCard';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const INITIAL_POSTS = [
  { id: '1', title: 'Post 1', author: 'Gisele', description: 'POST INSTA' },
  { id: '2', title: 'Post 2', author: 'Cidral', description: 'POST FACE' },
  { id: '3', title: 'Post 3', author: 'Alves', description: 'Lorem ipsum dolor sit amet...' },
  { id: '4', title: 'Post 4', author: 'Cris', description: 'Lorem ipsum dolor sit amet...' }
];

export default function AdminPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState(INITIAL_POSTS);

  function handleDelete(id: string) {
    Alert.alert(
      'Excluir post',
      'Tem certeza que deseja excluir este post?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setPosts(prev => prev.filter(p => p.id !== id));
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Navbar />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Publicações</Text>

          <TouchableOpacity
            style={styles.newPostButton}
            onPress={() => router.push('/screens/CreatePost')}
          >
            <Text style={styles.newPostText}>Criar novo post</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onEdit={() =>
                router.push({
                  pathname: '/screens/EditPost',
                  params: {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                  },
                } as any)
              }
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  content: {
    paddingHorizontal: 40,
    paddingTop: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  newPostButton: {
    backgroundColor: '#0b4edb',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 6,
  },

  newPostText: {
    color: '#fff',
    fontWeight: '600',
  },
});
