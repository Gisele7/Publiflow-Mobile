import Navbar from '@/components/shared/navbar';
import PostCard from '@/components/shared/postCard';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const colors = {
  primary: '#355C8C',      // azul do header
  background: '#F4F3F1',   // fundo bege/claro
  cardBorder: '#000000',
  textPrimary: '#000000',
  textSecondary: '#555555',
  searchBg: '#FFFFFF',
  searchButton: '#0E163D'
};


const posts = [
  { id: '1', title: 'A', author: 'Autor da Silva', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eu' },
  { id: '2', title: 'B cidral', author: 'Autor da Silva', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eu' },
  { id: '3', title: 'Titulo lorem ipsum', author: 'Autor da Silva', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eu' },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <View style={styles.container}>

        <Text style={styles.title}>Publicações</Text>

        {/* SEARCH */}
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

        {/* LISTA */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onPress={() => router.push('/screens/PostDetail')}
            />
          )}
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
