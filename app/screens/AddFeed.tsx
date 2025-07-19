import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddFeed = ({ navigation }) => {
  const [formData, setFormData] = useState({
    planName: '',
    startDate: new Date(),
    repeatWeeks: '1',
    repeatDays: {
      M: false,
      T: false,
      W: false,
      Th: false,
      F: false,
      S: false
    },
    endDate: new Date(),
    species: 'Cattle',
    showStartDatePicker: false,
    showEndDatePicker: false
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      repeatDays: {
        ...prev.repeatDays,
        [day]: !prev.repeatDays[day]
      }
    }));
  };

  const handleDateChange = (event, selectedDate, dateType) => {
    if (event.type === 'set') {
      if (dateType === 'start') {
        setFormData(prev => ({ 
          ...prev, 
          startDate: selectedDate,
          showStartDatePicker: false 
        }));
      } else {
        setFormData(prev => ({ 
          ...prev, 
          endDate: selectedDate,
          showEndDatePicker: false 
        }));
      }
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [`show${dateType}DatePicker`]: false 
      }));
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSubmit = () => {
    console.log('Feed Plan submitted:', formData);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Plan</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Feed Plan Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Plan Name"
          value={formData.planName}
          onChangeText={(text) => handleChange('planName', text)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Start Date *</Text>
        <TouchableOpacity 
          style={styles.dateInput} 
          onPress={() => handleChange('showStartDatePicker', true)}
        >
          <Text style={styles.dateText}>
            {formData.startDate ? formatDate(formData.startDate) : 'Enter Your Date'}
          </Text>
        </TouchableOpacity>
        {formData.showStartDatePicker && (
          <DateTimePicker
            value={formData.startDate}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'start')}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Repeat Every *</Text>
        <View style={styles.repeatContainer}>
          <TextInput
            style={[styles.input, styles.weeksInput]}
            keyboardType="numeric"
            value={formData.repeatWeeks}
            onChangeText={(text) => handleChange('repeatWeeks', text)}
          />
          <Text style={styles.weeksLabel}>Weeks</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Repeat On *</Text>
        <View style={styles.daysContainer}>
          {['M', 'T', 'W', 'Th', 'F', 'S'].map(day => (
            <TouchableOpacity 
              key={day}
              style={[
                styles.dayButton,
                formData.repeatDays[day] && styles.dayButtonSelected
              ]}
              onPress={() => handleDayToggle(day)}
            >
              <Text style={[
                styles.dayText,
                formData.repeatDays[day] && styles.dayTextSelected
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>End Date *</Text>
        <TouchableOpacity 
          style={styles.dateInput} 
          onPress={() => handleChange('showEndDatePicker', true)}
        >
          <Text style={styles.dateText}>
            {formData.endDate ? formatDate(formData.endDate) : 'Enter Your Date'}
          </Text>
        </TouchableOpacity>
        {formData.showEndDatePicker && (
          <DateTimePicker
            value={formData.endDate}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'end')}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Species *</Text>
        <View style={styles.radioGroup}>
          {['Cattle', 'Sheep'].map(species => (
            <View key={species} style={styles.radioOption}>
              <RadioButton
                value={species}
                status={formData.species === species ? 'checked' : 'unchecked'}
                onPress={() => handleChange('species', species)}
                color="#4CAF50"
              />
              <Text style={styles.radioLabel}>{species}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Feed</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Create Feed Mix</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Separate Feed</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Save</Text>
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
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  repeatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weeksInput: {
    width: 60,
    marginRight: 10,
  },
  weeksLabel: {
    fontSize: 16,
    color: '#555',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dayButtonSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  dayText: {
    fontSize: 14,
    color: '#555',
  },
  dayTextSelected: {
    color: '#fff',
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddFeed;