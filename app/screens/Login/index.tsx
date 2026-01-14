import AppButton from '@/components/shared/appButton';
import { colors, globalStyles } from '@/components/shared/styles';
import { router } from 'expo-router';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
  return (
    <View style={globalStyles.screen}>
      <View style={styles.container}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Entrar</Text>

        <TextInput
          placeholder="Email"
          style={globalStyles.input}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={globalStyles.input}
        />

        <AppButton
          title="Entrar"
          onPress={() => router.push('/screens/Home')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  logo: {
    height: 80,
    marginBottom: 24,
    alignSelf: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
});
