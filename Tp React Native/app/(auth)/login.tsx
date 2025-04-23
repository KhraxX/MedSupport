import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, IconButton,Button as Bt } from "react-native-paper";
import { sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app, { db as firestore } from "@/config/firebaseConfig";

const auth = getAuth(app);
import { Link, useRouter } from "expo-router";
import Button from "@/components/ui/Button";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { Image } from "react-native";


const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);


  const goToRegister = () => {
    router.push("/(auth)/register");
  }
 
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const userCredential= await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(firestore, "Users", userCredential.user.uid);
      await updateDoc(userRef, {
        lastLogin: Timestamp.now(),
      });
      Alert.alert("Succès", "Connexion réussie !");
      router.replace("/(app)")
      // Redirection ou mise à jour de l'état après connexion
    } catch (error) {
      Alert.alert("Erreur", (error as Error).message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Button label="Inscription"theme="primary" onPress={goToRegister}/>
      <TextInput
        label="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={secureText}
          autoCapitalize="none"
          style={styles.passwordInput}
        />
        <IconButton
          icon={secureText ? "eye-off" : "eye"}
          onPress={() => setSecureText(!secureText)}
        />
      </View>

      <Bt
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Se connecter
      </Bt>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  input: {
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0b03fc",
  },
  image: {
    
    width: "80%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
});

export default LoginScreen;




// import React, { useState } from "react";
// import {router} from 'expo-router'
// import { View, StyleSheet, Alert, Text, Image, Dimensions } from "react-native";
// import { TextInput, IconButton, Button as Bt } from "react-native-paper";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/config/firebase";
// import { LinearGradient } from 'expo-linear-gradient';

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [secureText, setSecureText] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const goToRegister = () => {
//     router.push("/(auth)/register");
//   }
//   const goTodashboard = () => {
//     router.replace("/dashboard");
//   }
//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Erreur", "Veuillez remplir tous les champs.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       Alert.alert("Succès", "Connexion réussie !");
//       router.replace("/dashboard")
//       // Redirection ou mise à jour de l'état après connexion
//     } catch (error) {
//       Alert.alert("Erreur", (error as Error).message);
//     }
//     setLoading(false);
//   };

//   return (
//     <LinearGradient
//       colors={['#1a1a1a', '#2d2d2d']}
//       style={styles.container}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//     >
//       <View style={styles.headerContainer}>
//         <Text style={styles.title}>Connect.</Text>
//         <Text style={styles.subtitle}>Bienvenue dans le futur</Text>
//       </View>

//       <View style={styles.formContainer}>
//         <View style={styles.card}>
//           <TextInput
//             label="Adresse e-mail"
//             value={email}
//             onChangeText={setEmail}
//             mode="outlined"
//             keyboardType="email-address"
//             autoCapitalize="none"
//             style={styles.input}
//             theme={{ colors: { primary: '#00ffa3', background: '#2d2d2d' }}}
//             left={<TextInput.Icon icon="email" color="#00ffa3" />}
//             outlineColor="#444"
//             textColor="#fff"
//           />

//           <View style={styles.passwordContainer}>
//             <TextInput
//               label="Mot de passe"
//               value={password}
//               onChangeText={setPassword}
//               mode="outlined"
//               secureTextEntry={secureText}
//               autoCapitalize="none"
//               style={styles.passwordInput}
//               theme={{ colors: { primary: '#00ffa3', background: '#2d2d2d' }}}
//               left={<TextInput.Icon icon="lock" color="#00ffa3" />}
//               outlineColor="#444"
//               textColor="#fff"
//             />
//             <IconButton
//               icon={secureText ? "eye-off" : "eye"}
//               onPress={() => setSecureText(!secureText)}
//               style={styles.eyeIcon}
//               iconColor="#00ffa3"
//             />
//           </View>

//           <Bt
//             mode="contained"
//             onPress={handleLogin}
//             loading={loading}
//             disabled={loading}
//             style={styles.loginButton}
//             contentStyle={styles.buttonContent}
//             labelStyle={styles.buttonText}
//           >
//             Se connecter
//           </Bt>

//           <View style={styles.registerContainer}>
//             <Text style={styles.registerText}>Nouveau ?</Text>
//             <Bt
//               mode="text"
//               onPress={goToRegister}
//               style={styles.registerButton}
//               labelStyle={styles.registerButtonText}
//             >
//               Créer un compte
//             </Bt>
//           </View>
//         </View>
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//   },
//   headerContainer: {
//     paddingTop: 80,
//     paddingBottom: 40,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 48,
//     fontWeight: '800',
//     color: '#00ffa3',
//     marginBottom: 8,
//     letterSpacing: 1,
//   },
//   subtitle: {
//     fontSize: 20,
//     color: '#ffffff',
//     opacity: 0.7,
//   },
//   formContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   card: {
//     backgroundColor: 'rgba(45, 45, 45, 0.95)',
//     borderRadius: 15,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     shadowColor: '#00ffa3',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.1,
//     shadowRadius: 20,
//     elevation: 5,
//   },
//   input: {
//     marginBottom: 16,
//     backgroundColor: '#2d2d2d',
//     fontSize: 16,
//     borderRadius: 8,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   passwordInput: {
//     flex: 1,
//     backgroundColor: '#2d2d2d',
//     fontSize: 16,
//     borderRadius: 8,
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 0,
//   },
//   loginButton: {
//     marginTop: 16,
//     borderRadius: 8,
//     backgroundColor: '#00ffa3',
//     elevation: 0,
//   },
//   buttonContent: {
//     height: 52,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     letterSpacing: 1,
//     color: '#1a1a1a',
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   registerText: {
//     fontSize: 15,
//     color: '#ffffff',
//     opacity: 0.7,
//   },
//   registerButton: {
//     marginLeft: 4,
//   },
//   registerButtonText: {
//     color: '#00ffa3',
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;