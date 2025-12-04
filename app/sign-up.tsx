import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { auth, db } from '../lib/firebase';

// Sign Up Validation Schema
const signUpValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name must be less than 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});

interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const initialValues: SignUpFormValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
};

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [firebaseError, setFirebaseError] = React.useState<string | null>(null);

  const handleSignUp = async (values: SignUpFormValues) => {
    try {
      setIsLoading(true);
      setFirebaseError(null);

      // Create user account
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Redirect immediately after successful user creation
      router.replace('/dashboard');
    

      // Optional save user details to Firestore
      try {
        await setDoc(doc(db, 'users', userCredentials.user.uid), {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          createdAt: new Date().toISOString(),
        });
      }
      catch (firestoreError) {
        console.error('Error saving user data to Firestore:', firestoreError);
      }
    }
    catch (error: any) {
      setFirebaseError(error.message || 'Sign Up Failed');
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us today! Create your account to get started.</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            {/* Full Name Field */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="person" size={20} color="#3b82f6" />
                <Text style={styles.label}>Full Name *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.fullName && errors.fullName ? styles.inputError : null
                ]}
                placeholder="Enter your full name"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}
            </View>

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

            {/* Phone Field */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="phone" size={20} color="#3b82f6" />
                <Text style={styles.label}>Phone Number *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.phone && errors.phone ? styles.inputError : null
                ]}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
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
                placeholder="Create a password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password Field */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="lock-outline" size={20} color="#3b82f6" />
                <Text style={styles.label}>Confirm Password *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.confirmPassword && errors.confirmPassword ? styles.inputError : null
                ]}
                placeholder="Confirm your password"
                secureTextEntry
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSubmit()}
            >
              <MaterialIcons name="person-add" size={24} color="#fff" />
              <Text style={styles.submitButtonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Links */}
            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={() => router.push('/sign-in')}>
                <Text style={styles.link}>Already have an account? Sign In</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>← Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

export default SignUp;

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