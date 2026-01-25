import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // telas onde o navbar NÃO deve aparecer
  const hiddenRoutes = [
    '/screens/Login',
    '/screens/Register',
    '/screens/CreateAccount',
  ];

  if (hiddenRoutes.some(route => pathname.startsWith(route))) {
    return null;
  }

  function navigate(path: string) {
    setMenuOpen(false);
    router.push(path as any);   // 🔥 AQUI ESTAVA FALTANDO
  }

  return (
    <>
      {/* NAVBAR */}
      <View style={styles.container}>
        <View style={styles.logoPlaceholder} />

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Ionicons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* OVERLAY + MENU */}
      {menuOpen && (
        <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)}>
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigate('/screens/Home')}
            >
              <Text style={styles.menuText}>Publicações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigate('/screens/Students/List')}
            >
              <Text style={styles.menuText}>Estudantes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigate('/screens/AdminPosts')}
            >
              <Text style={styles.menuText}>Admin</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigate('/screens/Login')}
            >
              <Text style={[styles.menuText, styles.logout]}>Sair</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  /* NAVBAR */
  container: {
    height: 56,
    backgroundColor: '#355C8C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 20,
  },

  logoPlaceholder: {
    width: 120,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 4,
  },

  menuButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* OVERLAY */
  overlay: {
    position: 'absolute',
    top: 56, // começa abaixo do navbar
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },

  /* MENU DROPDOWN */
  menu: {
    position: 'absolute',
    top: 8,
    right: 16,
    width: 200,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 6, // Android
    shadowColor: '#000', // iOS
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  menuText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 6,
  },

  logout: {
    color: '#C62828',
    fontWeight: '600',
  },
});
