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
}

export default function StudentList() {
  const [alunos, setAlunos] = useState<Student[]>([]);

  useEffect(() => {
    api.get('/users/students').then((res) => {
      setAlunos(res.data);
    }).catch((erro) => {
      console.log(erro);
    })
  }, [])

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
               <Text style={styles.itemText}>{item.nomeCompleto}</Text>
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
  }
});