import { useState } from 'react';
import { Alert, StyleSheet, Button, TextInput, View, FlatList, Text, Image } from 'react-native';

export default function App() {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
      .then(response => response.json())
      .then(data => setRecipes(data.meals))
      .catch(error => {
        Alert.alert(('Error', error));
      });
  };

  return (
    <View style={styles.container}>
      <View>
      <TextInput
        style={{ fontSize: 18, width: 200, borderColor: 'gray' }}
        placeholder='type an ingredient...'
        value={input}
        onChangeText={text => setInput(text)}
      />

      <Button
        title='Find'
        onPress={getRecipes}
      />
      </View>

<View>
<FlatList
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {item.strMeal}
      </Text>
      <Image source={{ uri: item.strMealThumb }} style={{ width: 100, height: 100 }} />
    </View>
  )}
  data={recipes}
/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});
