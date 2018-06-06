import { StyleSheet } from "react-native";

export const defaultSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#009FE8',
    padding: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    height: 30,

  },
  inputText: {
    backgroundColor: 'white',
    margin: 3,
    width: 200,
    height: 20
  },
  formLabel: {
    margin: 3
  }
});
