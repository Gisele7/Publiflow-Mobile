import api from '@/app/api/api';
import AppButton from '@/components/shared/appButton';
import Navbar from '@/components/shared/navbar';
import { globalStyles } from '@/components/shared/styles';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

export default function EditStudent() {
  
    const params = useLocalSearchParams<{
      id: string;
      nome: string;
      email: string;
      telefone: string;
      senha: string;
    }>();
    

  const [nome, setNome] = useState(params.nome || '');
  const [email, setEmail] = useState(params.email || '');
  const [telefone, setTelefone] = useState(params.telefone || '');
  const [senha, setSenha] = useState('*'); 
  const [confSenha, setConfSenha] = useState('*');

  const handleUpdate = () => {

    let novaSenha = params.senha;

    if(senha != '*' && confSenha != '*' && senha.trim() != null && confSenha.trim() != null && senha == confSenha){
      novaSenha = senha;
    }

    const updatedUser = {
      nomeCompleto: nome,
      email: email,
      telefone: telefone,
      papelUsuarioID: 1,
      senha: novaSenha,
    }

    api.put(`/users/${params.id}`, updatedUser)
    .then((res) =>{
      router.push('/screens/Students/List');
    }).catch((erro) => {
      Alert.alert('Erro', 'Erro ao atualizar usuário');
    })

  }

  return (
    <View style={globalStyles.screen}>
      <Navbar />

      <Text style={globalStyles.title}>Editar Estudante</Text>

      
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

      <AppButton title="Salvar" onPress={handleUpdate} />
    </View>
  );
}
