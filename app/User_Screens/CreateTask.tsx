import React, { useState } from 'react';
import { Text, Pressable, FlatList, Alert, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput } from 'react-native-paper';

type Task = {
  id: string;
  title: string;
  selected: boolean;
};

const defaultTasks: Task[] = [
  { id: '1', title: 'Water the crops', selected: false },
  { id: '2', title: 'Feed the animals', selected: false },
  { id: '3', title: 'Inspect fencing', selected: false },
  { id: '4', title: 'Clean animal pens', selected: false },
  { id: '5', title: 'Harvest ripe produce', selected: false },
  { id: '6', title: 'Update farm records', selected: false },
];

const CreateTask = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [notes, setNotes] = useState('');

  const toggleSelection = (id: string) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, selected: !task.selected } : task
    );
    setTasks(updated);
  };

  const handleSubmit = async () => {
    const selectedTasks = tasks.filter((task) => task.selected).map((t) => t.title);

    if (selectedTasks.length === 0 && notes.trim() === '') {
      Alert.alert('No data', 'Please select at least one task or write some notes.');
      return;
    }

    try {
      const response = await fetch('http://192.168.8.194:8080/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedTasks,
          additionalNotes: notes.trim(),
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Task submitted successfully');
        setTasks(defaultTasks); // reset
        setNotes('');
      } else {
        Alert.alert('Error', 'Failed to submit task');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Could not reach the server');
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <Pressable
      onPress={() => toggleSelection(item.id)}
      style={[
        styles.taskButton,
        { backgroundColor: item.selected ? '#bbdefb' : '#fff' },
      ]}
    >
      <Text style={styles.taskText}>
        {item.selected ? '✅' : '⬜'} {item.title}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Text style={styles.title}>📝 Create New Task</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: hp('2%') }}
      />

      <Text style={styles.label}>Additional Notes:</Text>
      <TextInput
        mode="outlined"
        placeholder="Write details or other tasks here..."
        multiline
        value={notes}
        onChangeText={setNotes}
        style={styles.textInput}
      />

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>📤 Submit Task</Text>
      </Pressable>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  taskButton: {
    padding: wp('3%'),
    marginVertical: hp('0.8%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: 'gray',
  },
  taskText: {
    fontSize: wp('4.5%'),
  },
  label: {
    fontSize: wp('5%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    fontWeight: '600',
  },
  textInput: {
    height: hp('20%'),
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: wp('3.5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
});

export default CreateTask;
