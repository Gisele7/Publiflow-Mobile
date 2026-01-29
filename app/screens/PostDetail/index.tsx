import Header from '@/components/shared/header';
import { globalStyles, colors } from '@/components/shared/styles';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // <--- Importe isso

export default function PostDetail() {
  // 1. Recupera os dados enviados pela Home
  const params = useLocalSearchParams();
  
  // DICA: No Expo Router, todos os params chegam como STRING.
  // Se você tiver booleanos ou números, pode precisar converter.

  return (
    <View style={globalStyles.screen}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Se houver imagem, mostre-a. */}
        {/* Assumindo que o backend retorna a URL completa ou base64 */}
        

        <Text style={styles.title}>{params.titulo}</Text>
        
        <Text style={styles.metaData}>
           Autor ID: {params.autor} • Post #{params.id}
        </Text>

        {/* Exibe o conteúdo completo */}
        <Text style={styles.content}>
          {params.descricao || "Sem conteúdo disponível."}
        </Text>

        {params.imagem && (
          <Image 
            source={{ uri: String(params.imagem) }} 
            style={styles.image}
            resizeMode="cover"
          />
        )}

      </ScrollView>
    </View>
  );
}

// Estilos específicos para esta tela
const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#e1e1e1', // Fundo cinza enquanto carrega
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text || '#000',
    marginBottom: 8,
  },
  metaData: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  content: {
    fontSize: 16,
    lineHeight: 24, // Altura da linha para facilitar leitura
    color: '#333',
    textAlign: 'justify',
  }
});