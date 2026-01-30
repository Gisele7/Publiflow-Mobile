
import api from '@/app/api/api';
import AppButton from '@/components/shared/appButton';
import { globalStyles, colors } from '@/components/shared/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useRouter } from 'expo-router';
import { Alert, Text, TextInput, View, ActivityIndicator, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '@/components/shared/navbar';
import React, { useState } from 'react';

export default function CreatePost() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images', 
      allowsEditing: true, 
      aspect: [16, 9], 
      quality: 0.8, 
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImageUri(result.assets[0].uri);
    }
  };

  async function handleSave() {
    if (!titulo || !descricao || !selectedImageUri) {
      Alert.alert("Atenção", "Preencha o título, descrição e imagem.");
      return;
    }

    setLoading(true);

    try {
      const autorID = await AsyncStorage.getItem('idUsuario');

      if (!autorID) {
        Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
        return;
      }

      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao); 
      formData.append("autorID", autorID);
      formData.append("visibilidade", "true");

      const uriLocal = selectedImageUri;
      
      const filename = uriLocal.split('/').pop() as any;

      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      formData.append("imagem", {
        uri: uriLocal,
        name: filename,
        type: type,
      } as any);
      

      await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      Alert.alert("Sucesso", "Post criado!", [
        { text: "OK", onPress: () => router.push('/screens/Home') }
      ]);

    } catch (error) {
      console.log(error);
      const msg = "Não foi possível criar o post.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  }

// cris
return (
  <>
    <Navbar />
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Criar Post</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Título:</Text>
        <TextInput 
          placeholder="Título" 
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo} 
          />

        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          placeholder="Descrição" 
          style={[styles.input, styles.textArea]}
          multiline
          value={descricao}
          onChangeText={setDescricao} 
          />
     
        <Text style={styles.label}>Imagem</Text>
        <TouchableOpacity style={styles.imagePickerBtn} onPress={pickImage}>
          <Text style={styles.imagePickerBtnText}>
            {selectedImageUri ? "Trocar Imagem" : "Selecionar Imagem da Galeria"}
          </Text>
        </TouchableOpacity>

        {selectedImageUri && (
          <Image 
            source={{ uri: selectedImageUri }} 
            style={styles.previewImage} 
            resizeMode="cover"
          />
        )}

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
        ) : (
          <AppButton 
            title="Publicar Post" 
            onPress={handleSave} 
          />
        )}
    </View>
  </View>
  
  </>
  );
}

const styles = StyleSheet.create({

  imagePickerBtn: {
    backgroundColor: '#e0e0e0', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  imagePickerBtnText: {
    color: '#333',
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
  },

  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#5b7fd8',
    paddingVertical: 14,
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
