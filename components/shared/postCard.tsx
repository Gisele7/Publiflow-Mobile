import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from './styles';

export default function PostCard({ post, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.author}>{post.author}</Text>
        <Text style={styles.desc}>{post.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  author: {
    color: colors.muted,
    marginVertical: 4,
  },
  desc: {
    color: colors.text,
  },
});
