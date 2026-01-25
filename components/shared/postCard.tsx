import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Post = {
  id: string;
  title: string;
  author: string;
  description: string;
};

type PostCardProps = {
  post: Post;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function PostCard({ post, onPress, onEdit, onDelete }: PostCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      
      {/* CONTEÚDO */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.author}>{post.author}</Text>
        <Text style={styles.description}>{post.description}</Text>
      </View>

      {/* AÇÕES (editar / excluir) */}
      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
            <Ionicons name="pencil" size={14} color="#fff" />
          </TouchableOpacity>
        )}

        {onDelete && (
          <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
            <Ionicons name="close" size={14} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },

  author: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: '#000',
  },

  actions: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: 10,
    marginLeft: 10,
  },

  editBtn: {
    backgroundColor: '#2da8ff',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteBtn: {
    backgroundColor: '#ff4d4d',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
