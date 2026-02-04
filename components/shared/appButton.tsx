import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from './styles';

export default function AppButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.createButtonBlue,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
