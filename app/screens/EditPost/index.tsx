import Navbar from '@/components/shared/navbar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditPost() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
  }>();

  // 🔥 já inicia preenchido
  const [title, setTitle] = useState(params.title || '');
  const [description, setDescription] = useState(params.description || '');
  const [image, setImage] = useState('');

  function handleSave() {
    // depois você liga isso com API ou contexto global
    router.back();
  }

  return (
    <>
    <Navbar />
    <View style={styles.container} >
      <Text style={styles.pageTitle}>Editar Post</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Imagem:</Text>
        <TextInput
          style={styles.input}
          placeholder="Selecionar imagem..."
          value={image}
          onChangeText={setImage}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
