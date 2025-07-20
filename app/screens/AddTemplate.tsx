import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MapsScreen() {
  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Create Record Template</Text>
        <Text style={styles.question}>What species are you creating this template for?</Text>
        
        {/* First Cattle Card */}
        <TouchableOpacity>
            <View style={styles.speciesCard}>
            <Text style={styles.speciesText}>Cattle</Text>
            </View>
        </TouchableOpacity>

        {/* Second Cattle Card */}
        <TouchableOpacity>
            <View style={styles.speciesCard}>
            <Text style={styles.speciesText}>Sheep</Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  speciesCard: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  speciesText: {
    fontSize: 16,
    color: '#2e7d32',
    textAlign: 'center',
  }
});