import api from '@/app/api/api';
import Navbar from '@/components/shared/navbar';
import { colors } from '@/components/shared/styles';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

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
  const [senha, setSenha] = useState('*********'); 
  const [confSenha, setConfSenha] = useState('*********');

  const handleUpdate = () => {
    let novaSenha = params.senha;

    if (senha !== '*********' && confSenha !== '*********') {
      if (senha === confSenha) {
        novaSenha = senha;
      } else {
        Alert.alert("Erro", "As senhas não conferem.");
        return;
      }
    }

    const updatedUser = {
      nomeCompleto: nome,
      email: email,
      telefone: telefone,
      papelUsuarioID: 1, 
      senha: novaSenha,
    }

    api.put(`/users/${params.id}`, updatedUser)
      .then((res) => {
        Alert.alert("Sucesso", "Aluno atualizado!", [
          { text: "OK", onPress: () => router.push('/screens/Students/List') }
        ]);
      })
      .catch((erro) => {
        console.log(erro);
        const msg = erro.response?.data?.message || "Erro ao atualizar.";
        Alert.alert('Erro', msg);
      })
  }

  return (
    <View style={styles.container}>
      <Navbar />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          
          <Text style={styles.pageTitle}>Editar Aluno</Text>

          <View style={styles.form}>
            <TextInput 
              placeholder="Nome" 
              style={styles.input} 
              value={nome}
              onChangeText={setNome}
              placeholderTextColor="#999"
            />
            
            <TextInput
              placeholder="E-mail" 
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
            
            <TextInput 
              placeholder="Telefone" 
              style={styles.input}
              value={telefone}
              onChangeText={setTelefone} 
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
            
            <TextInput 
              placeholder="Senha" 
              style={styles.input}
              value={senha}
              onChangeText={setSenha} 
              secureTextEntry={true} 
              placeholderTextColor="#999"
            />
            
            <TextInput 
              placeholder="Confirmar senha" 
              style={styles.input}
              value={confSenha}
              onChangeText={setConfSenha} 
              secureTextEntry={true} 
              placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7', 
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16193B', 
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCC', 
    borderRadius: 8,     
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,    
  },
  button: {
    backgroundColor: colors.createButtonBlue, 
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  }
});