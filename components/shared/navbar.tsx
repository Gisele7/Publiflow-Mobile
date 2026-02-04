import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from 'expo-router';
import { useState, useEffect } from 'react'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const NAVBAR_CONTENT_HEIGHT = 60;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const insets = useSafeAreaInsets();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); 

  const hiddenRoutes = [
    '/screens/Login',
    '/screens/Register',
    '/screens/CreateAccount',
  ];

  useEffect(() => {
    const fetchRole = async () => {
      const role = await AsyncStorage.getItem('papelUsuario');
      setUserRole(role); 
    };

    fetchRole();
  }, [menuOpen]); 

  if (hiddenRoutes.some(route => pathname.startsWith(route))) {
    return null;
  }

  function navigate(path: string) {
    setMenuOpen(false);
    router.push(path as any);  
  }

  async function handleLogout() {
    try {
      await AsyncStorage.clear();
      setMenuOpen(false);
      setUserRole(null);
      router.replace('/screens/Login');
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível sair.");
    }
  }

  return (
    <>
      <View style={[
        styles.container, 
        { 
          paddingTop: insets.top, 
          height: insets.top + NAVBAR_CONTENT_HEIGHT 
        }
      ]}>
        <Image 
          style={styles.logoPlaceholder}
          source={require('@/assets/images/logonav.png')}
          resizeMode="contain" />

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <Ionicons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      {menuOpen && (
        <Pressable 
          style={[
            styles.overlay, 
            { top: insets.top + NAVBAR_CONTENT_HEIGHT }
          ]} 
          onPress={() => setMenuOpen(false)}
        >
          <View style={styles.menu}>
            
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigate('/screens/Home')}
            >
              <Text style={styles.menuText}>Publicações</Text>
            </TouchableOpacity>

            {userRole === '2' && (
              <>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigate('/screens/Students/List')}
                >
                  <Text style={styles.menuText}>Estudantes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigate('/screens/Teachers/List')}
                >
                  <Text style={styles.menuText}>Professores</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigate('/screens/AdminPosts')}
                >
                  <Text style={styles.menuText}>Admin</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleLogout}
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
  container: {
    backgroundColor: '#355C8C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },

  logoPlaceholder: {
    height: 30, 
    width: 120, 
    borderRadius: 4,
  },

  menuButton: {
    width: 36,
    height: 36, 
    alignItems: 'center',
    justifyContent: 'center',
  },

  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },

  menu: {
    position: 'absolute',
    top: 0, 
    right: 0, 
    width: 200,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 8, 
    paddingVertical: 8,
    elevation: 6, 
    shadowColor: '#000', 
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