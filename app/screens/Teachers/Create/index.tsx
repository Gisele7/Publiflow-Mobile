import api from '@/app/api/api';
import AppButton from '@/components/shared/appButton';
import Navbar from '@/components/shared/navbar';
import { globalStyles } from '@/components/shared/styles';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

export default function CreateTeacher() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');

  const handleSave = () => {

    if(nome.trim() == null || email.trim() == null || telefone.trim() == null || senha.trim() == null || confSenha.trim() == null){
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos');
      return;
    }


    if(senha != confSenha){
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

     const newUser = {
      nomeCompleto: nome,
      email: email,
      telefone: telefone,
      papelUsuarioID: 2,
      senha: senha,
     }

     console.log(newUser)

     api.post("/users", newUser)
      .then(() => {
        router.push('/screens/Students/List');
      })
      .catch((erro) => {
        console.log(erro)
        Alert.alert("Erro","Erro ao cadastrar professor: " + erro);
      });
  }

  return (
    <View style={globalStyles.screen}>
      <Navbar />

      <Text style={globalStyles.title}>Cadastrar Professor</Text>

      <TextInput 
        placeholder="Nome" 
        style={globalStyles.input} 
        value={nome}
        onChangeText={setNome}
        />
      <TextInput
        placeholder="E-mail" 
        style={globalStyles.input}
        value={email}
        onChangeText={setEmail}
        />
      <TextInput 
        placeholder="Telefone" 
        style={globalStyles.input}
        value={telefone}
        onChangeText={setTelefone} 
        />
      <TextInput 
        placeholder="Senha" 
        style={globalStyles.input}
        value={senha}
        onChangeText={setSenha} 
        />
      <TextInput 
        placeholder="Confirmar senha" 
        style={globalStyles.input}
        value={confSenha}
        onChangeText={setConfSenha} 
        />


      <AppButton title="Cadastrar" onPress={handleSave} />
    </View>
  );
}
