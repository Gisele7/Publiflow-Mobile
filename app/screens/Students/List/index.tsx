import api from '@/app/api/api';
import AppButton from '@/components/shared/appButton';
import Navbar from '@/components/shared/navbar';
import { globalStyles } from '@/components/shared/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

type Student = {
  id: number; 
  nomeCompleto: string;
  email: string,
  telefone: string,
  papelUsuarioID: number,
  senha: string,
} 

export default function StudentList() {
  const [alunos, setAlunos] = useState<Student[]>([]);

  useEffect(() => {
   carregarUsuarios();
  }, [])

  const carregarUsuarios = () => {
    api.get('/users/students').then((res) => {
      setAlunos(res.data);
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

      <Text style={globalStyles.title}>Estudantes</Text>

      <AppButton title="Cadastrar Estudante" onPress={() => {
        router.push('/screens/Students/Create');
      }} />

      <View style={{ marginTop: 16, flex: 1 }}>
        <FlatList 
          data={alunos}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.cardItem}>
               <Text 
                onPress={() => router.push({
                  pathname: '/screens/Students/Edit',
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