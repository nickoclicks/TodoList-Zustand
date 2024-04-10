// App.js
import React from "react";
import { View } from "react-native";
import TodoList from "./TodoList";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <TodoList />
    </View>
  );
};

export default App;
