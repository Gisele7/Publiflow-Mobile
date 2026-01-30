import api from '@/app/api/api';
import AppButton from '@/components/shared/appButton';
import Navbar from '@/components/shared/navbar';
import { globalStyles } from '@/components/shared/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Teacher = {
  id: number; 
  nomeCompleto: string;
  email: string,
  telefone: string,
  papelUsuarioID: number,
  senha: string,
}

export default function TeacherList() {
  const [professores, setProfessores] = useState<Teacher[]>([]);
  
    useEffect(() => {
      carregarUsuarios();
    }, [])

  const carregarUsuarios = () => {
    api.get('/users/teachers').then((res) => {
      setProfessores(res.data);
    }).catch((erro) => {
      console.log(erro);
    })
  }

  const handleDelete = (id: number) => {
    api.delete(`/users/${id}`)
    .then((res) => {
      carregarUsuarios();
    }).catch((erro) => {
      console.log(erro);
    })
  }

  return (
    <View style={globalStyles.screen}>
      <Navbar />

      <Text style={globalStyles.title}>Professores</Text>

      <AppButton title="Cadastrar Professor" onPress={() => {
        router.push('/screens/Teachers/Create');
      }} />

      <View style={{ marginTop: 16 }}>
        <FlatList 
          data={professores}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.cardItem}>
               <Text
                onPress={() => router.push({
                  pathname: '/screens/Teachers/Edit',
                  params: {
                    id: item.id,
                    nome: item.nomeCompleto,
                    email: item.email,
                    telefone: item.telefone,
                    senha: item.senha
                  },
                } as any)}
               style={styles.itemText}>{item.nomeCompleto}</Text>
               <Text style={styles.deleteText} onPress={() => handleDelete(item.id)}>Deletar</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    color: '#333'
  },
  deleteText:{
    color: '#FF4545'
  }
});