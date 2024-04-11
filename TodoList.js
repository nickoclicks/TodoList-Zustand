import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { create } from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  updateTodo: (index, updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo, i) => (i === index ? updatedTodo : todo)),
    })),
  deleteTodo: (index) =>
    set((state) => ({
      todos: state.todos.filter((_, i) => i !== index),
    })),
}));

const TodoList = () => {
  const [text, setText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleAddTodo = () => {
    if (text.trim() !== "") {
      addTodo({ text });
      setText("");
    }
  };

  const handleStartEdit = (index, text) => {
    setEditingIndex(index);
    setEditingText(text);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  const handleSaveEdit = (index) => {
    updateTodo(index, { text: editingText });
    setEditingIndex(null);
    setEditingText("");
  };

  const handleDeleteTodo = (index) => {
    deleteTodo(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Image
          source={require("./assets/nic.png")}
          style={styles.profile}
        ></Image>
        <View style={styles.textcontain}>
          <Text style={styles.text1}>Nicko C. Cajes</Text>
          <Text style={styles.text2}>20211114</Text>
        </View>
      </View>
      <View>
        <Text style={styles.head}>TODO LIST</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Ex. Studying..."
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        style={styles.bord}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            {editingIndex === index ? (
              <>
                <TextInput
                  style={styles.editInput}
                  onChangeText={(text) => setEditingText(text)}
                  value={editingText}
                />
                <TouchableOpacity
                  style={styles.save}
                  onPress={() => handleSaveEdit(index)}
                >
                  <Text style={styles.stext}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancel}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.stext}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.todoText}>{item.text}</Text>
                <TouchableOpacity
                  style={styles.edit}
                  onPress={() => handleStartEdit(index, item.text)}
                >
                  <Text style={styles.stext}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.delete}
                  onPress={() => handleDeleteTodo(index)}
                >
                  <Text style={styles.stext}>Delete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#81B622",
  },
  head: {
    textAlign: "center",
    fontSize: 25,
    paddingBottom: 20,
    color: "white",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#59981A",
  },
  button: {
    width: "40%",
    backgroundColor: "#3D550C",
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginLeft: "30%",
    height: 35,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 9,
    fontStyle: "italic",
    textAlign: "center",
    height: "7%",
    fontWeight: "500",
    color: "white",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: "#59981A",
    marginTop: 10,
    borderRadius: 5,
  },
  todoText: {
    flex: 1,
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    fontWeight: "500",
    color: "white",
  },
  editInput: {
    flex: 1,
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  bord: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#59981A",
  },
  save: {
    backgroundColor: "#3D550C",
    borderColor: "#ccc",
    borderWidth: 1,
    height: 35,
    width: 55,
    borderRadius: 5,
  },
  edit: {
    backgroundColor: "#3D550C",
    borderColor: "#ccc",
    borderWidth: 1,
    height: 35,
    width: 55,
    borderRadius: 5,
    paddingLeft: 1,
  },
  cancel: {
    backgroundColor: "#3D550C",
    borderColor: "#ccc",
    borderWidth: 1,
    height: 35,
    width: 55,
    borderRadius: 5,
    paddingRight: 5,
    paddingLeft: 1,
  },
  delete: {
    backgroundColor: "#3D550C",
    borderColor: "#ccc",
    borderWidth: 1,
    height: 35,
    width: 55,
    borderRadius: 5,
    paddingLeft: 1,
  },
  stext: {
    textAlign: "center",
    paddingTop: 5,
    fontWeight: "bold",
    color: "white",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 10,
    resizeMode: "cover",
    marginRight: 10,
  },
  textcontain: {
    flex: 1,
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
    marginLeft: "3%",
  },
  text1: {
    fontWeight: "500",
    fontSize: 15,
  },
  text2: {
    fontWeight: "500",
    fontSize: 15,
    marginBottom: 5,
  },
});

export default TodoList;
