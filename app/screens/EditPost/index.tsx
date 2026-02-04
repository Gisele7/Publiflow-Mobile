import Navbar from '@/components/shared/navbar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '@/app/api/api'; 


export default function EditPost() {
  const router = useRouter();
  
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    image: string; 
  }>();

  const [title, setTitle] = useState(params.title || '');
  const [description, setDescription] = useState(params.description || '');
  
  const [newImageUri, setNewImageUri] = useState<string | null>(null);
  
  const [oldImageUrl] = useState(params.image); 

  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setNewImageUri(result.assets[0].uri);
    }
  };

  async function handleSave() {
    if (!title || !description) {
      Alert.alert("Erro", "Título e descrição são obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      
      formData.append("titulo", title);
      formData.append("descricao", description);
      
      if (newImageUri) {
        const filename = newImageUri.split('/').pop() as any;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        formData.append("imagem", {
          uri: newImageUri,
          name: filename,
          type: type,
        } as any);
      }

      await api.put(`/posts/${params.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      Alert.alert("Sucesso", "Post atualizado!", [
        { text: "OK", onPress: () => router.back() } 
      ]);

    } catch (erro: any) {
      console.log(erro);
      Alert.alert("Erro", "Falha ao atualizar o post: " + erro.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Text style={styles.pageTitle}>Editar Post</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Título:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título"
          />

          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Digite a descrição"
            textAlignVertical="top"
          />

          <Text style={styles.label}>Imagem:</Text>
          
          <TouchableOpacity style={styles.imagePickerBtn} onPress={pickImage}>
            <Text style={styles.imagePickerBtnText}>
              {newImageUri ? "Alterar Imagem Selecionada" : "Trocar Imagem Atual"}
            </Text>
          </TouchableOpacity>

          {newImageUri ? (
            <View>
              <Text style={styles.previewLabel}>Nova imagem selecionada:</Text>
              <Image source={{ uri: newImageUri }} style={styles.previewImage} />
            </View>
          ) : oldImageUrl ? (
            <View>
              <Text style={styles.previewLabel}>Imagem atual:</Text>
              <Image source={{ uri: oldImageUrl }} style={styles.previewImage} />
            </View>
          ) : null}

          {loading ? (
             <ActivityIndicator size="large" color="#5b7fd8" style={{ marginTop: 20 }} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          )}

        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    color: '#333',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fafafa',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  
  imagePickerBtn: {
    backgroundColor: '#eef2ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5b7fd8',
    marginBottom: 15,
    borderStyle: 'dashed',
  },
  imagePickerBtnText: {
    color: '#5b7fd8',
    fontWeight: '600',
    fontSize: 15,
  },
  previewLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },

  button: {
    backgroundColor: '#5b7fd8',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});