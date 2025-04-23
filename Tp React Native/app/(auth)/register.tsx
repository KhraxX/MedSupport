import { Text, View, StyleSheet, Alert, TouchableOpacity, ActivityIndicator,Image } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { IconButton, TextInput, Button as Bt } from "react-native-paper";
import { db as firestore, auth } from '@/config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setName] = useState("");
  const [departement, setDepartement] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const GoToLogin = () => {
    router.push("/(auth)/login");
  }
  const handleRegister = async () => {
    if (!email  ||!password || !fullName || !departement) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user
      
      await setDoc(doc(firestore, "Users", user.uid), {
        email: email,
        fullName: fullName,
        departement: departement,
        role: "employee",
        createdAt: new Date(),
        lastLogin: new Date(),
        userId: user.uid
      });
      Alert.alert("Succès", "Inscription réussie !");
      router.replace("/(app)");
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inscription</Text>

      <TextInput
        label="Adresse e-mail"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Nom"
        value={fullName}
        onChangeText={setName}
        mode="outlined"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        style={styles.input}
        label="Departement"
        autoCapitalize="none"
        mode="outlined"
        value={departement}
        onChangeText={setDepartement}
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
        loading={loading}
        disabled={loading}
        onPress={handleRegister}
        style={styles.button}
      >S'enregistrer</Bt>
      <Bt mode="text" onPress={GoToLogin}>Déjà un compte ? connectez-vous</Bt>
    </View>
  );
}

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
  button: {
    marginTop: 20,
  },
  passwordInput: {
    flex: 1,
  },
  text: {
    color: "#000",
    fontSize: 24,
    textAlign: "center",
  }, image: {
    width: "80%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
});

// import { Text, View, StyleSheet, Alert } from 'react-native';
// import { Link, router } from 'expo-router';
// import { TextInput, IconButton, Button as Bt } from "react-native-paper";
// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/config/firebase';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function Register() {
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [secureText, setSecureText] = useState(true);
//     const [loading, setLoading] = useState(false);

//     const handleRegister = async () => {
//         if (!email || !password) {
//             Alert.alert("Erreur", "Veuillez remplir tous les champs.");
//             return;
//         }

//         setLoading(true);
//         try {
//             await createUserWithEmailAndPassword(auth, email, password);
//             Alert.alert("Succès", "Inscription réussie !");
//             router.replace("/login");
//         }
//         catch (error) {
//             Alert.alert("Erreur", (error as Error).message);
//         }
//         setLoading(false);
//     };

//     return (
//         <LinearGradient
//             colors={['#1a1a1a', '#2d2d2d']}
//             style={styles.container}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//         >
//             <View style={styles.headerContainer}>
//                 <Text style={styles.title}>Register.</Text>
//                 <Text style={styles.subtitle}>Rejoignez-nous</Text>
//             </View>

//             <View style={styles.formContainer}>
//                 <View style={styles.card}>
//                     <TextInput
//                         label="Adresse e-mail"
//                         value={email}
//                         onChangeText={setEmail}
//                         mode="outlined"
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                         style={styles.input}
//                         theme={{ colors: { primary: '#00ffa3', background: '#2d2d2d' }}}
//                         left={<TextInput.Icon icon="email" color="#00ffa3" />}
//                         outlineColor="#444"
//                         textColor="#fff"
//                     />

//                     <View style={styles.passwordContainer}>
//                         <TextInput
//                             label="Mot de passe"
//                             value={password}
//                             onChangeText={setPassword}
//                             mode="outlined"
//                             secureTextEntry={secureText}
//                             autoCapitalize="none"
//                             style={styles.passwordInput}
//                             theme={{ colors: { primary: '#00ffa3', background: '#2d2d2d' }}}
//                             left={<TextInput.Icon icon="lock" color="#00ffa3" />}
//                             outlineColor="#444"
//                             textColor="#fff"
//                         />
//                         <IconButton
//                             icon={secureText ? "eye-off" : "eye"}
//                             onPress={() => setSecureText(!secureText)}
//                             style={styles.eyeIcon}
//                             iconColor="#00ffa3"
//                         />
//                     </View>

//                     <Bt
//                         mode="contained"
//                         onPress={handleRegister}
//                         loading={loading}
//                         disabled={loading}
//                         style={styles.registerButton}
//                         contentStyle={styles.buttonContent}
//                         labelStyle={styles.buttonText}
//                     >
//                         S'inscrire
//                     </Bt>

//                     <View style={styles.loginContainer}>
//                         <Text style={styles.loginText}>Déjà un compte ?</Text>
//                         <Bt
//                             mode="text"
//                             onPress={() => router.push("/login")}
//                             style={styles.loginLink}
//                             labelStyle={styles.loginButtonText}
//                         >
//                             Se connecter
//                         </Bt>
//                     </View>
//                 </View>
//             </View>
//         </LinearGradient>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         width: '100%',
//     },
//     headerContainer: {
//         paddingTop: 80,
//         paddingBottom: 40,
//         paddingHorizontal: 20,
//     },
//     title: {
//         fontSize: 48,
//         fontWeight: '800',
//         color: '#00ffa3',
//         marginBottom: 8,
//         letterSpacing: 1,
//     },
//     subtitle: {
//         fontSize: 20,
//         color: '#ffffff',
//         opacity: 0.7,
//     },
//     formContainer: {
//         flex: 1,
//         paddingHorizontal: 20,
//     },
//     card: {
//         backgroundColor: 'rgba(45, 45, 45, 0.95)',
//         borderRadius: 15,
//         padding: 24,
//         borderWidth: 1,
//         borderColor: 'rgba(255, 255, 255, 0.1)',
//         shadowColor: '#00ffa3',
//         shadowOffset: { width: 0, height: 0 },
//         shadowOpacity: 0.1,
//         shadowRadius: 20,
//         elevation: 5,
//     },
//     input: {
//         marginBottom: 16,
//         backgroundColor: '#2d2d2d',
//         fontSize: 16,
//         borderRadius: 8,
//     },
//     passwordContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 24,
//     },
//     passwordInput: {
//         flex: 1,
//         backgroundColor: '#2d2d2d',
//         fontSize: 16,
//         borderRadius: 8,
//     },
//     eyeIcon: {
//         position: 'absolute',
//         right: 0,
//     },
//     registerButton: {
//         marginTop: 16,
//         borderRadius: 8,
//         backgroundColor: '#00ffa3',
//         elevation: 0,
//     },
//     buttonContent: {
//         height: 52,
//     },
//     buttonText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         letterSpacing: 1,
//         color: '#1a1a1a',
//     },
//     loginContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 24,
//     },
//     loginText: {
//         fontSize: 15,
//         color: '#ffffff',
//         opacity: 0.7,
//     },
//     loginLink: {
//         marginLeft: 4,
//     },
//     loginButtonText: {
//         color: '#00ffa3',
//         fontWeight: 'bold',
//     },
// });
