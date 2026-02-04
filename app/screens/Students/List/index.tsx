import api from '@/app/api/api';
import Navbar from '@/components/shared/navbar';
import { colors } from '@/components/shared/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

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
    Alert.alert("Confirmação", "Deseja excluir este aluno?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Sim", 
        onPress: () => {
          api.delete(`/users/${id}`)
          .then(() => carregarUsuarios())
          .catch((erro) => console.log(erro));
        }
      }
    ]);
  }

  const handleEdit = (item: Student) => {
    router.push({
      pathname: '/screens/Students/Edit',
      params: {
        id: item.id,
        nome: item.nomeCompleto,
        email: item.email,
        telefone: item.telefone,
        senha: item.senha
      },
    } as any);
  }

  return (
    <View style={styles.container}>
      <Navbar />

      <View style={styles.contentContainer}>
        <Text style={styles.screenTitle}>Cadastro de Alunos</Text>

        <TouchableOpacity 
          style={styles.createButton} 
          onPress={() => router.push('/screens/Students/Create')}
        >
          <Text style={styles.createButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <FlatList 
          data={alunos}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (

            <View style={styles.card}>
              <Text style={styles.studentName}>{item.nomeCompleto}</Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.editBtn]} 
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.actionButton, styles.deleteBtn]} 
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.actionText}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </View>

          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.haiti, 
    textAlign: 'center',
    marginVertical: 20,
  },
  
  createButton: {
    backgroundColor: colors.createButtonBlue,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25, 
    elevation: 2,
  },
  createButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20, 
  },

  actionsRow: {
    flexDirection: 'row',
    gap: 15, 
  },
  actionButton: {
    flex: 1, 
    paddingVertical: 8,
    borderRadius: 20, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtn: {
    backgroundColor: colors.editBlue,
  },
  deleteBtn: {
    backgroundColor: colors.deleteRed,
  },
  actionText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  }
});