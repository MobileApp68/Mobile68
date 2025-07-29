import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  View
} from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';




import BASE_URL from '@/Utils/Api';

type Task = {
  id: string;         // Can use timestamp or uuid for new ones
  title: string;
  selected: boolean;
};

const CreateTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState('');
  const [refreshing, setRefreshing] = useState(false);


  // Fetch existing tasks
  const fetchTasks = async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(BASE_URL + '/api/task/get', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: token,
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.tasks)) {
          setTasks(data.tasks.map((task: any, index: number) => ({
            id: task.id ?? String(index),
            title: task.title,
            selected: task.selected ?? false,
          })));
        }
      }
    } catch (err) {
      console.error("Error fetching tasks", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    const newTask: Task = {
      id: uuid.v4().toString(),
      title: '',
      selected: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTitle = (id: string, text: string) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, title: text } : task));
  };

  const toggleSelection = (id: string) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, selected: !task.selected } : task));
  };

  const handleSubmit = async () => {
    if (tasks.length === 0 && notes.trim() === '') {
      Alert.alert('Empty', 'Please add at least one task or note.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(BASE_URL + '/api/task/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tasks,
          additionalNotes: notes.trim(),
          ownerToken: token,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Tasks saved successfully!');
      } else {
        Alert.alert('Error', 'Failed to save tasks');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Could not reach server');
    }
  };

  const renderTaskRow = ({ item }: { item: Task }) => (
    <View style={styles.taskRow}>
      <RNTextInput
        value={item.title}
        placeholder="Enter task"
        onChangeText={(text) => updateTitle(item.id, text)}
        style={styles.taskInput}
      />
      <Pressable onPress={() => toggleSelection(item.id)} style={styles.checkboxWrapper}>
        <Text style={styles.checkboxText}>{item.selected ? '✅' : '⬜'}</Text>
      </Pressable>
      <Pressable onPress={() => removeTask(item.id)} style={styles.removeBtn}>
        <Text style={styles.removeText}>❌</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.title}>📝 Farm Task List</Text>

          <FlatList
     data={tasks}
       keyExtractor={(item) => item.id}
      renderItem={renderTaskRow}
       scrollEnabled={false}
       refreshing={refreshing}
       onRefresh={fetchTasks}
/>


          <Pressable style={styles.addTaskBtn} onPress={addTask}>
            <Text style={styles.addTaskText}>➕ Add Task</Text>
          </Pressable>

          <Text style={styles.label}>Additional Notes:</Text>
          <TextInput
            mode="outlined"
            placeholder="Write general farm notes..."
            multiline
            value={notes}
            onChangeText={setNotes}
            style={styles.textInput}
          />

          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>📤 Save Tasks</Text>
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
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
    backgroundColor: '#fff',
    padding: wp('2%'),
    borderRadius: wp('2%'),
    elevation: 2,
  },
  taskInput: {
    flex: 1,
    fontSize: wp('4%'),
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: wp('1%'),
  },
  checkboxWrapper: {
    marginHorizontal: wp('2%'),
  },
  checkboxText: {
    fontSize: wp('5.5%'),
  },
  removeBtn: {
    padding: wp('1.5%'),
  },
  removeText: {
    fontSize: wp('5.5%'),
    color: 'red',
  },
  addTaskBtn: {
    backgroundColor: '#2196F3',
    padding: wp('3%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  addTaskText: {
    color: '#fff',
    fontWeight: 'bold',
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
