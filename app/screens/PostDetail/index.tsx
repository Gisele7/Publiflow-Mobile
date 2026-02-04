import Navbar from '@/components/shared/navbar';
import { globalStyles, colors } from '@/components/shared/styles';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router'; 


export default function PostDetail() {
  
  const params = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <Navbar/>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>      

        <Text style={styles.title}>{params.titulo}</Text>
        
        <Text style={styles.metaData}>
           Autor: {params.autor} • Post #{params.id}
        </Text>

        <Text style={styles.textContent}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F3F1',
  },

  backButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    margin: 16,
  },

  backText: {
    color: '#fff',
    fontWeight: '600',
  },

  content: {
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },

  textContent: {
    alignItems: 'center',
    marginBottom:15,
    paddingLeft: 7,
    paddingRight: 7,

  },

  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 24,
    borderWidth: 1,
    borderColor: '#999',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },

  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    color: '#000',
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'left',
  },

  image: {
    width: '100%',
    height: 350,
    borderRadius: 2,
  },

  metaData: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    fontStyle: 'italic',
  },
});
