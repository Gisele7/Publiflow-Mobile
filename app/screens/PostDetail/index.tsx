import Navbar from '@/components/shared/navbar';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PostDetail() {
  return (
    <View style={styles.container}>
      <Navbar/>
      {/* BOTÃO VOLTAR */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          
          <Text style={styles.title}>Titulo legal</Text>
          <Text style={styles.author}>Autor da Silva</Text>

          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Text>

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1593113630400-ea4288922497',
            }}
            style={styles.image}
          />

        </View>
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
    paddingBottom: 40,
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
    height: 220,
    borderRadius: 2,
  },
});
