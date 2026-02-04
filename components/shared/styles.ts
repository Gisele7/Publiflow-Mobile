import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#355C8C',       // secondary
  background: '#F4F3F1',   // background
  black: '#000000',
  textSecondary: '#555555',
  searchButton: '#0E163D',
  backgroundGray: '#F4F5F7',
  cardBorderGray: '#E0E0E0',
  textDark: '#333333',
  editBlue: '#50C0FF', 
  haiti: '#16193B', 
  deleteRed: '#FF4545', 
  white: '#FFFFFF', // antigo card
  createButtonBlue: '#0047C5', 
  muted: '#6B7280',
  buttonBlue: '#2563EB', // antigo primary
  darknessBlue: '#111827', // antigo text
};


export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.darknessBlue,
    marginBottom: 16,
  },

  input: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  button: {
    backgroundColor: colors.buttonBlue,
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
