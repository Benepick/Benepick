import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 30,
    fontFamily: 'IBMPlexSansKR-Bold',
    includeFontPadding: false,
  },
  h2: {
    fontSize: 24,
    fontFamily: 'IBMPlexSansKR-Bold',
    includeFontPadding: false,
  },
  h3: {
    fontSize: 20,
    fontFamily: 'IBMPlexSansKR-SemiBold',
    includeFontPadding: false,
  },
  bold: {
    fontSize: 15,
    fontFamily: 'IBMPlexSansKR-SemiBold',
    includeFontPadding: false,
    letterSpacing: 1,
  },
  p: {
    fontSize: 15,
    fontFamily: 'IBMPlexSansKR-Regular',
    includeFontPadding: false,
    letterSpacing: 1,
  },
});
