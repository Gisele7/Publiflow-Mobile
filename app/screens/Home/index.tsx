import api from '@/app/api/api';
import AppButton from '@/components/shared/appButton';
import Header from '@/components/shared/header';
import PostCard from '@/components/shared/postCard';
import { globalStyles } from '@/components/shared/styles';
import IPostData from '@/interface/IPostData';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

// 1. DEFINA O ENDEREÇO BASE DAS IMAGENS
// Substitua pelo SEU IP (o mesmo que você usou no axios/api.js)
// Se suas imagens ficam na pasta 'uploads' do backend, mantenha '/uploads/'
const SERVER_IP = '172.26.192.1'; // <--- COLOQUE SEU IP AQUI
const SERVER_PORT = '3000';
const BASE_IMAGE_URL = `http://${SERVER_IP}:${SERVER_PORT}/uploads/`; 
// DICA: Verifique no seu backend qual é a rota estática (ex: /files, /images, /uploads)

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

  // 2. Função auxiliar para montar a URL
  const getImageUrl = (imageName: string | null) => {
    if (!imageName) return null;
    // Se a imagem já vier com http (ex: link externo), retorna ela mesma
    if (imageName.startsWith('http')) return imageName;
    // Senão, concatena com o endereço do seu servidor
    return `${BASE_IMAGE_URL}${imageName}`;
  };

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
        renderItem={({ item }) => {
            
          // Prepara a URL da imagem antes de passar
          const fullImageUrl = getImageUrl(item.caminhoImagem);

          return (
            <PostCard
              post={item}
              // Se o PostCard precisar mostrar a imagem, passe fullImageUrl para ele também
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
  );
}