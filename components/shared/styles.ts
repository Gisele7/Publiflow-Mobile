import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2563EB',      // botões
  secondary: '#1E3A5F',    // header (azul escuro do figma)
  background: '#F3F4F6',
  card: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  danger: '#DC2626',
};

export const globalStyles = StyleSheet.create({
  // Container da tela (NUNCA com padding)
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Conteúdo da tela (COM padding)
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  // Títulos de página
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },

  // Inputs padrão
  input: {
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  // Botão genérico (caso use sem AppButton)
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
