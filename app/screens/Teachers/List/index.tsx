import api from '@/app/api/api';
import AppButton from '@/components/shared/appButton'; 
import Navbar from '@/components/shared/navbar';
import { colors } from '@/components/shared/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

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
    Alert.alert("Excluir", "Tem certeza que deseja excluir este professor?", [
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

  const handleEdit = (item: Teacher) => {
    router.push({
      pathname: '/screens/Teachers/Edit',
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
        <Text style={styles.screenTitle}>Cadastro de Professores</Text>

        <View style={{ marginBottom: 20 }}>
          <AppButton 
            title="Cadastrar Professor" 
            onPress={() => router.push('/screens/Teachers/Create')} 
          />
        </View>

        <FlatList 
          data={professores}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            
            <View style={styles.card}>
              
              <Text style={styles.professorNameLabel}>{item.nomeCompleto}</Text>

              <View style={styles.buttonRow}>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.editButton]} 
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.actionButton, styles.deleteButton]} 
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.buttonText}>Deletar</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.haiti,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorderGray,
    padding: 20,
    marginBottom: 16,
    elevation: 2, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  professorNameLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 20,
  },
  
  buttonRow: {
    flexDirection: 'row',
    gap: 15, 
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20, 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: colors.editBlue,
  },
  deleteButton: {
    backgroundColor: colors.deleteRed,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});