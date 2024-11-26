// App.js
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/login";
import Home from "./src/screens/Home";
import cadastro from "./src/screens/cadastro";
import GetStarted from "./src/screens/GetStarted";
import Scan from "./src/screens/Scan";
import AddDocument from "./src/screens/AddDocument";
import DocumentDetails from "./src/screens/DocumentDetails";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"  // Define Login como a tela inicial
      >
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="AddDocument" component={AddDocument} />
        <Stack.Screen name="DocumentDetails" component={DocumentDetails} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="cadastro" component={cadastro} /> 
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
