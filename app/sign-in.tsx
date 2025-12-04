import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { auth } from "../lib/firebase";

// Sign In Validation Schema
const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface SignInFormValues {
  email: string;
  password: string;
}

const SignIn = () =>{
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState<string | null>(null); 

  const initialValues: SignInFormValues = {
    email: '',
    password: '',
  };

  const handleLogin = async (values: SignInFormValues) => {
    try {
      setFirebaseError(null);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.replace('/dashboard');
    } catch (error: any) {
      setFirebaseError(error.message || 'Login Failed');
    }
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Welcome back! Please sign in to your account.</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={signInValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            {/* Email Field */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="email" size={20} color="#3b82f6" />
                <Text style={styles.label}>Email Address *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email ? styles.inputError : null
                ]}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="lock" size={20} color="#3b82f6" />
                <Text style={styles.label}>Password *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.password && errors.password ? styles.inputError : null
                ]}
                placeholder="Enter your password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSubmit()}
            >
              <MaterialIcons name="login" size={24} color="#fff" />
              <Text style={styles.submitButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Links */}
            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={() => router.push('/sign-up')}>
                <Text style={styles.link}>Don&apos;t have an account? Sign Up</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => router.replace('/')}>
                <Text style={styles.link}>← Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linksContainer: {
    gap: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});