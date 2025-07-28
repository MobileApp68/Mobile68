import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import uuid from 'react-native-uuid';

import BASE_URL from '@/Utils/Api';

type Tool = {
  id: string;
  toolName: string;
  quantity: string;
};

const ToolScreen = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTools = async () => {
    if (isLoading) return; // Prevent multiple simultaneous fetches
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        setIsFetched(true);
        return;
      }

      console.log('Fetching tools with token:', token.substring(0, 10) + '...');
      const res = await fetch(BASE_URL + '/api/tools/get', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' }, // Use JSON for consistency
        body: token ,
      });

      console.log('Fetch tools response status:', res.status);
      if (!res.ok) {
        if (res.status === 404) {
          setTools([]);
          setIsFetched(true);
          return;
        }
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch tools (Status: ${res.status})`);
      }

      const data = await res.json();
      console.log('Backend response:', data);
      const toolsArray = Array.isArray(data) ? data : data.tools || [];
      if (!Array.isArray(toolsArray)) {
        throw new Error('Invalid response format: tools is not an array');
      }

      setTools(
        toolsArray.map((tool, index) => ({
          id: tool.id ?? String(index),
          toolName: tool.tool_name || tool.toolName || '', // Handle both field names
          quantity: String(tool.quantity ?? '0'),
        }))
      );
      setIsFetched(true);
    } catch (error) {
      console.error('Fetch failed:', error);
      Alert.alert('Error', error.message || 'Failed to fetch tools');
      setIsFetched(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const addTool = () => {
    const newTool: Tool = {
      id: uuid.v4().toString(),
      toolName: '',
      quantity: '',
    };
    setTools(prev => [...prev, newTool]);
  };

  const removeTool = (id: string) => {
    setTools(prev => prev.filter(tool => tool.id !== id));
  };

  const updateToolName = (id: string, value: string) => {
    setTools(prev => prev.map(tool => (tool.id === id ? { ...tool, toolName: value } : tool)));
  };

  const updateQuantity = (id: string, value: string) => {
    setTools(prev => prev.map(tool => (tool.id === id ? { ...tool, quantity: value } : tool)));
  };

  const handleSubmit = async () => {
    if (tools.length === 0) {
      Alert.alert('Empty', 'Please add at least one tool.');
      return;
    }

    const payload = tools
      .map(tool => ({
        id: tool.id,
        toolName: tool.toolName.trim(),
        quantity: parseInt(tool.quantity || '0', 10),
      }))
      .filter(t => t.toolName !== '' && !isNaN(t.quantity));

    if (payload.length === 0) {
      Alert.alert('Invalid Input', 'Please provide valid tool names and quantities.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      console.log('Saving tools with payload:', payload);
      const response = await fetch(BASE_URL + '/api/tools/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tools: payload,
          ownerToken: token,
        }),
      });

      console.log('Save tools response status:', response.status);
      if (response.ok) {
        Alert.alert('Success', 'Tools saved successfully!');
        setTools([]);
        setIsFetched(false);
        await fetchTools();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to save tools (Status: ${response.status})`);
      }
    } catch (error) {
      console.error('Save failed:', error);
      Alert.alert('Error', error.message || 'Failed to save tools');
    }
  };

  const renderToolRow = ({ item }: { item: Tool }) => (
    <View style={styles.toolRow}>
      <TextInput
        mode="outlined"
        value={item.toolName}
        placeholder="Tool name"
        onChangeText={text => updateToolName(item.id, text)}
        style={styles.toolInput}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        mode="outlined"
        value={item.quantity}
        placeholder="Qty"
        keyboardType="numeric"
        onChangeText={text => updateQuantity(item.id, text)}
        style={styles.quantityInput}
      />
      <Pressable onPress={() => removeTool(item.id)} style={styles.removeBtn}>
        <Text style={styles.removeText}>❌</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.title}>🧰 Tool Inventory</Text>

          {isLoading ? (
            <Text style={styles.noDataText}>Loading tools...</Text>
          ) : isFetched && tools.length === 0 ? (
            <Text style={styles.noDataText}>No tools found. Add a tool to get started!</Text>
          ) : (
            <FlatList
              data={tools}
              keyExtractor={item => item.id}
              renderItem={renderToolRow}
              scrollEnabled={false}
            />
          )}

          <Pressable style={styles.addBtn} onPress={addTool} disabled={isLoading}>
            <Text style={[styles.addText, isLoading && styles.disabledText]}>➕ Add Tool</Text>
          </Pressable>

          <Pressable style={[styles.submitBtn, isLoading && styles.disabledBtn]} onPress={handleSubmit} disabled={isLoading}>
            <Text style={[styles.submitText, isLoading && styles.disabledText]}>📤 Save Tools</Text>
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
  toolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: wp('3%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1.5%'),
    elevation: 2,
  },
  toolInput: {
    flex: 2,
    fontSize: wp('4%'),
    marginRight: wp('2%'),
  },
  quantityInput: {
    flex: 1,
    fontSize: wp('4%'),
    marginRight: wp('2%'),
    textAlign: 'center',
  },
  removeBtn: {
    padding: wp('1.5%'),
  },
  removeText: {
    fontSize: wp('5.5%'),
    color: 'red',
  },
  addBtn: {
    backgroundColor: '#2196F3',
    padding: wp('3%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  addText: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  submitBtn: {
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
  noDataText: {
    fontSize: wp('4.5%'),
    color: '#555',
    textAlign: 'center',
    marginVertical: hp('2%'),
  },
  disabledBtn: {
    backgroundColor: '#cccccc',
  },
  disabledText: {
    color: '#888888',
  },
});

export default ToolScreen;