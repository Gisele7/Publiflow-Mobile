
import api from '@/app/api/api';
import Navbar from '@/components/shared/navbar';
import PostCard from '@/components/shared/postCard';
import { globalStyles } from '@/components/shared/styles';
import IPostData from '@/interface/IPostData';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SERVER_IP = '172.26.192.1'; 
const SERVER_PORT = '3000';
const BASE_IMAGE_URL = `http://${SERVER_IP}:${SERVER_PORT}/uploads/`; 

const colors = {
  primary: '#355C8C',      
  background: '#F4F3F1',   
  cardBorder: '#000000',
  textPrimary: '#000000',
  textSecondary: '#555555',
  searchBg: '#FFFFFF',
  searchButton: '#0E163D'
};


export default function Home() {
  const [posts, setPosts] = useState<IPostData[]>([]);

  useEffect(() => {
    api.get("/posts")
      .then((res) => {
        setPosts(res.data);
        console.log(posts);
      } )
      .catch(console.error);
  }, []);

  const getImageUrl = (imageName: string | null) => {
    if (!imageName) return null;
    if (imageName.startsWith('http')) return imageName;
    return `${BASE_IMAGE_URL}${imageName}`;
  };

  return (
    <>
      <Navbar />
      <View style={styles.container}>

        <Text style={styles.title}>Publicações</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>


      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => {
            
          const fullImageUrl = getImageUrl(item.caminhoImagem);

          return (
            <PostCard
              post={item}
              onPress={() => router.push({
                pathname: '/screens/PostDetail',
                params: { 
                  id: item.id,
                  titulo: item.titulo,
                  autor: item.autorID, 
                  descricao: item.descricao,
                  imagem: fullImageUrl 
                } 
              })}
            />
          );
        }}
      />
    </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 16,
    color: colors.textPrimary,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    backgroundColor: colors.searchBg,
    height: 44,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  searchButton: {
    width: 50,
    height: 44,
    backgroundColor: colors.searchButton,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

