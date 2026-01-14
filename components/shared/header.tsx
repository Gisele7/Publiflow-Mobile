import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from './styles';

type HeaderProps = {
  showMenu?: boolean;
};

export default function Header({ showMenu = true }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {showMenu && (
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  logo: {
    height: 28,
    width: 120,
  },
});
