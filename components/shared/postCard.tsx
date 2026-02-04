import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IPostCardProps from '@/interface/IPostCardProps';

export default function PostCard({ post, onPress, onEdit, onDelete } : IPostCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>

      <View style={styles.content}>
        <Text style={styles.title}>{post.titulo}</Text>
        <Text style={styles.author}>{post.nomeAutor}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {post.descricao.length > 55 
          ? post.descricao.substring(0, 55) + "..." 
          : post.descricao}
        </Text>
      </View>

      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity style={styles.actionBtn} onPress={onEdit}>
            <Ionicons name="pencil" size={14} color="#fff" />
          </TouchableOpacity>
        )}

        {onDelete && (
          <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={onDelete}>
            <Ionicons name="close" size={14} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    position: 'relative', 
    elevation: 3, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  content: {
    paddingRight: 70, 
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },

  author: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },

  actions: {
    position: 'absolute', 
    top: 12,              
    right: 12,                
    flexDirection: 'row', 
    gap: 8,               
    zIndex: 10,           
  },

  actionBtn: {
    backgroundColor: '#2da8ff', 
    width: 32,                  
    height: 32,
    borderRadius: 16,           
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
  },

  deleteBtn: {
    backgroundColor: '#ff4d4d', 
  },
});