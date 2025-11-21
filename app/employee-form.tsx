import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

// Employee Form Validation Schema
const employeeValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  department: Yup.string()
    .required('Department is required'),
  position: Yup.string()
    .required('Position is required'),
  salary: Yup.number()
    .typeError('Salary must be a number')
    .positive('Salary must be positive')
    .required('Salary is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});

interface EmployeeFormValues {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: string;
  phone: string;
}

export default function EmployeeForm() {
  const router = useRouter();

  const initialValues: EmployeeFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    salary: '',
    phone: '',
  };

  const handleSubmit = (values: EmployeeFormValues) => {
    Alert.alert(
      'Employee Information Submitted',
      `Employee: ${values.firstName} ${values.lastName}\nEmail: ${values.email}\nDepartment: ${values.department}\nPosition: ${values.position}\nSalary: $${values.salary}`,
      [{ text: 'OK' }]
    );
    console.log('Employee Data Submitted:', values);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Employee Information Form</Text>
      <Text style={styles.description}>Please fill in all required employee details</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={employeeValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            {/* First Name Field */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="person" size={20} color="#3b82f6" />
                <Text style={styles.label}>First Name *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.firstName && errors.firstName ? styles.inputError : null
                ]}
                placeholder="Enter first name"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
            </View>

            {/* Last Name Field */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="person-outline" size={20} color="#3b82f6" />
                <Text style={styles.label}>Last Name *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.lastName && errors.lastName ? styles.inputError : null
                ]}
                placeholder="Enter last name"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="email" size={20} color="#3b82f6" />
                <Text style={styles.label}>Email *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email ? styles.inputError : null
                ]}
                placeholder="Enter email address"
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
                <Text style={styles.label}>Phone *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.phone && errors.phone ? styles.inputError : null
                ]}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            {/* Department Field */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="business" size={20} color="#3b82f6" />
                <Text style={styles.label}>Department *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.department && errors.department ? styles.inputError : null
                ]}
                placeholder="Enter department"
                onChangeText={handleChange('department')}
                onBlur={handleBlur('department')}
                value={values.department}
              />
              {touched.department && errors.department && (
                <Text style={styles.errorText}>{errors.department}</Text>
              )}
            </View>

            {/* Position Field */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="work" size={20} color="#3b82f6" />
                <Text style={styles.label}>Position *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.position && errors.position ? styles.inputError : null
                ]}
                placeholder="Enter position"
                onChangeText={handleChange('position')}
                onBlur={handleBlur('position')}
                value={values.position}
              />
              {touched.position && errors.position && (
                <Text style={styles.errorText}>{errors.position}</Text>
              )}
            </View>

            {/* Salary Field */}
            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="attach-money" size={20} color="#3b82f6" />
                <Text style={styles.label}>Salary *</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  touched.salary && errors.salary ? styles.inputError : null
                ]}
                placeholder="Enter salary"
                keyboardType="numeric"
                onChangeText={handleChange('salary')}
                onBlur={handleBlur('salary')}
                value={values.salary}
              />
              {touched.salary && errors.salary && (
                <Text style={styles.errorText}>{errors.salary}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSubmit()}
            >
              <MaterialIcons name="save" size={24} color="#fff" />
              <Text style={styles.submitButtonText}>Submit Employee Information</Text>
            </TouchableOpacity>

            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={20} color="#3b82f6" />
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 6,
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
    marginTop: 8,
  },
  backButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
});