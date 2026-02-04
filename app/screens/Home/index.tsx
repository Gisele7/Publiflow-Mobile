import api from '@/app/api/api';
import Navbar from '@/components/shared/navbar';
import PostCard from '@/components/shared/postCard';
import { colors } from '@/components/shared/styles';
import IPostData from '@/interface/IPostData';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SERVER_IP = '172.26.192.1'; 
const SERVER_PORT = '3000';
const BASE_IMAGE_URL = `http://${SERVER_IP}:${SERVER_PORT}/uploads/`; 

export default function Home() {
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPostData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [authorNames, setAuthorNames] = useState<{[key: number]: string}>({});

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const resPosts = await api.get("/posts");
      const listaPosts = resPosts.data;
      
      setPosts(listaPosts);
      setFilteredPosts(listaPosts);

      const idsUnicos = [...new Set(listaPosts.map((p: IPostData) => p.autorID))];

      const nomesTemp: {[key: number]: string} = {};

      await Promise.all(idsUnicos.map(async (id) => {
          try {
             const resUser = await api.get(`/users/${id}`);
             nomesTemp[id as number] = resUser.data.nomeCompleto;
          } catch (error) {
             console.log(`Erro ao buscar autor ${id}`, error);
             nomesTemp[id as number] = "Autor Desconhecido";
          }
      }));

      setAuthorNames(nomesTemp);

    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    }
  };

  useEffect(() => {
    if (searchText === '') {
      setFilteredPosts(posts); 
    } else {
      const lowerText = searchText.toLowerCase();
      const results = posts.filter(item => {
        return (
            item.titulo.toLowerCase().includes(lowerText) ||
            item.descricao.toLowerCase().includes(lowerText)
        );
      });
      setFilteredPosts(results);
    }
  }, [searchText, posts]);

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
            placeholder="Pesquisar..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText} 
          />
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => Keyboard.dismiss()} 
          >
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

      <FlatList
        data={filteredPosts} 
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
                Nenhum post encontrado.
            </Text>
        }
        renderItem={({ item }) => {
            
          const fullImageUrl = getImageUrl(item.caminhoImagem); 
          
          const nomeProfessor = authorNames[item.autorID as any] || "Carregando...";

          item['nomeAutor'] = nomeProfessor;

          return (
            <PostCard
              post={item}
              onPress={() => router.push({
                pathname: '/screens/PostDetail',
                params: { 
                  id: item.id,
                  titulo: item.titulo,
                  autor: nomeProfessor, 
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
    color: colors.haiti,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.white,
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