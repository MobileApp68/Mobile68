import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from 'expo-router'; // 🧭 for screen navigation

type Work = {
  id: string;
  title: string;
  done: boolean;
};

const initialTasks: Work[] = [
  { id: '1', title: 'Water the crops', done: false },
  { id: '2', title: 'Feed the animals', done: false },
  { id: '3', title: 'Inspect fencing', done: false },
  { id: '4', title: 'Clean animal pens', done: false },
  { id: '5', title: 'Harvest ripe produce', done: false },
  { id: '6', title: 'Update farm records', done: false },
];

function Tasks() {
  const [work, setWork] = useState<Work[]>(initialTasks);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [notes, setNotes] = useState("");
  const router = useRouter();

  const toggleTask = (id: string) => {
    const updated = work.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setWork(updated);
  };

  const renderItem = ({ item }: { item: Work }) => (
    <Pressable
      onPress={() => toggleTask(item.id)}
      style={[
        styles.button,
        { backgroundColor: item.done ? '#c8e6c9' : '#fff' }
      ]}
    >
      <Text style={styles.text}>
        {item.done ? '✅' : '⬜'} {item.title}
      </Text>
    </Pressable>
  );

  const filteredTasks = showCompletedOnly ? work.filter(t => t.done) : work;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.text, { textAlign: "center", marginBottom: hp("1%") }]}>
        🧑‍🌾 TASKS
      </Text>

      {/* 🧭 Top Navigation Buttons */}
      <View style={styles.topButtons}>
        <Pressable
          style={styles.topButton}
          onPress={() => setShowCompletedOnly(prev => !prev)}
        >
          <Text style={styles.buttonText}>
            {showCompletedOnly ? '📋 Show All Tasks' : '✅ Completed Tasks'}
          </Text>
        </Pressable>

        <Pressable
          style={styles.topButton}
          onPress={() => router.push('/User_Screens/CreateTask')}
        >
          <Text style={styles.buttonText}>➕ Create New Task</Text>
        </Pressable>
      </View>

      {/* 📋 Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp("2%") }}
      />

      {/* 📝 Text Input Area */}
      <Text style={styles.textLabel}>📝 Additional Task Notes</Text>
      <TextInput
        mode="outlined"
        placeholder="Describe additional tasks in detail..."
        value={notes}
        onChangeText={setNotes}
        multiline
        style={styles.textInput}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp("4%"),
    backgroundColor: '#f4f4f4',
  },

  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp("2%"),
  },

  topButton: {
    flex: 1,
    backgroundColor: "#00796B",
    marginHorizontal: wp("1%"),
    paddingVertical: hp("1.5%"),
    borderRadius: wp("2%"),
    alignItems: 'center',
  },

  buttonText: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: 'bold',
  },

  button: {
    padding: wp("3%"),
    marginVertical: hp("1%"),
    borderRadius: wp("3%"),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },

  text: {
    fontSize: wp("4.5%"),
    fontWeight: 'bold',
    color: "#333",
  },

  textLabel: {
    fontSize: wp("4%"),
    marginTop: hp("2%"),
    marginBottom: hp("1%"),
    fontWeight: 'bold',
    color: '#555',
  },

  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: wp("4%"),
    textAlignVertical: 'top',
    minHeight: hp("20%"),
  },
});

export default Tasks;
