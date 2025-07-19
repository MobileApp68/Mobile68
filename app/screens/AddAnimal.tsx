import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper'; // Install with: npx expo install react-native-paper


const AddAnimal = () => {
  const [formData, setFormData] = useState({
    species: '',
    breed: '',
    ageClass: '',
    dob: { day: false, month: false, year: false },
    doNotTrack: false,
    colour: '',
    name: '',
    tattoo: '',
    brand: ''
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    if (field === 'dob') {
      setFormData(prev => ({ 
        ...prev, 
        dob: { ...prev.dob, [value]: !prev.dob[value] } 
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: !prev[field] }));
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Animals Record</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Species *</Text>
        <View style={styles.checkboxGroup}>
          {['Cattle', 'Sheep'].map(species => (
            <View key={species} style={styles.checkboxContainer}>
              <Checkbox
                status={formData.species === species ? 'checked' : 'unchecked'}
                onPress={() => handleChange('species', species)}
                color="#4CAF50"
              />
              <Text style={styles.checkboxLabel}>{species}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Breed Name"
          value={formData.breed}
          onChangeText={(text) => handleChange('breed', text)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Age Class *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Class Name"
          value={formData.ageClass}
          onChangeText={(text) => handleChange('ageClass', text)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date Of Birth *</Text>
        <View style={styles.checkboxGroup}>
          {['day', 'month', 'year'].map(item => (
            <View key={item} style={styles.checkboxContainer}>
              <Checkbox
                status={formData.dob[item] ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange('dob', item)}
                color="#4CAF50"
              />
              <Text style={styles.checkboxLabel}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={formData.doNotTrack ? 'checked' : 'unchecked'}
            onPress={() => handleCheckboxChange('doNotTrack')}
            color="#4CAF50"
          />
          <Text style={styles.checkboxLabel}>Do Not Track</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Colour *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Animals Colour"
          value={formData.colour}
          onChangeText={(text) => handleChange('colour', text)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Animals Name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Tattoo</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Animals Tattoo"
          value={formData.tattoo}
          onChangeText={(text) => handleChange('tattoo', text)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Brand</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Animals Brand"
          value={formData.brand}
          onChangeText={(text) => handleChange('brand', text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2D5A3D',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddAnimal;