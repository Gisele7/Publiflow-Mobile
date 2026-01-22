import api from '@/app/api/api';
import AppButton from '@/components/shared/appButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, globalStyles } from '@/components/shared/styles';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  function logar() {  

    if (!user || !password) {
        Alert.alert("Atenção", "Preencha email e senha.");
        return;
    }

    const usuario = {
      email: user.trim(),
      senha: password,
    };

     api.post("/users/login", usuario)
      .then(async (res) => {
        try {
            await AsyncStorage.setItem('idUsuario', String(res.data.id));
            await AsyncStorage.setItem('nomeUsuario', res.data.nomeCompleto);
            await AsyncStorage.setItem('papelUsuario', String(res.data.papelUsuarioID));
            
            router.replace('/screens/Home');
        } catch (e) {
            Alert.alert("Erro", "Falha ao salvar dados locais.");
        }
      })
      .catch((erro) => {
        console.log(erro);
        const mensagem = erro.response?.data?.message || "Ocorreu um erro inesperado.";
        Alert.alert("Erro ao realizar o login", mensagem);
      });
  }

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
          value={user}
          onChangeText={(value) => setUser(value)}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={globalStyles.input}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />

        <AppButton
          title="Entrar"
          onPress={() => logar()}
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
