
import api from '@/app/api/api';
import PostCard from '@/components/shared/postCard';
import { colors, globalStyles } from '@/components/shared/styles';
import IPostData from '@/interface/IPostData';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shared/navbar';
import { useRouter } from 'expo-router';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function AdminPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<IPostData[]>([]);
  
    useEffect(() => {
      carregarPosts();
    }, []);

    const carregarPosts = () => {
      api.get("/posts")
        .then((res) => {
          setPosts(res.data);
          console.log(posts);
        })
        .catch((erro) => {
          console.log(erro);
        });
    }

    

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
            api.delete(`/posts/${id}`)
            .then((res) => {
              carregarPosts();
            }).catch((erro) => {
              Alert.alert('Erro', 'erro ao deletar post ' + erro.response.data.message);
              console.log(erro);
            })
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
        keyExtractor={item => item.id as any}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <PostCard 
            post={item} 
            onPress={() => {}} 
            onEdit={() =>
                router.push({
                  pathname: '/screens/EditPost',
                  params: {
                    id: item.id,
                    title: item.titulo,
                    description: item.descricao,
                  },
                } as any)
              }
              onDelete={() => handleDelete(item.id as any)}
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
    paddingHorizontal: 20,
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
    backgroundColor: colors.createButtonBlue,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 6,
  },

  newPostText: {
    color: '#fff',
    fontWeight: '600',
  },
});
