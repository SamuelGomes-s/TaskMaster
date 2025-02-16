import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity, FlatList, Text, Keyboard } from "react-native";
import Header from "./components/Header";
import AddIcon from "react-native-vector-icons/MaterialCommunityIcons"
import TaskList from "./components/TaskList";
import getRealm from "./services/realm";

export default function App() {

  const [input, setInput] = useState('')
  const [task, setTask] = useState([])
  const [countTask, setCountTask] = useState(0)
  const [countCompleted, setCountCompleted] = useState(0)

  useEffect(() => {
    async function loadTasks() {
      const realm = await getRealm()
      const tasks = realm.objects('Task').sorted('id', false)
      const completed = realm.objects('Task').filtered('isComplete == true')
      setCountCompleted(completed.length)
      setCountTask(tasks.length)
      setTask(tasks)
    }
    loadTasks()
  }, [])


  async function handleAddTask() {
    if (input == '') return;
    try {
      const data = { taskDescription: input }
      await addTask(data)
      setInput('')
      Keyboard.dismiss()
    } catch (error) {
      console.log(error)
    }
  }

  async function addTask(data) {
    const realm = await getRealm()
    const id = realm.objects('Task').sorted('id', true).length > 0 ? realm.objects('Task').sorted('id', true)[0].id + 1 : 1 // Cria o id. 
    const taskData = {
      id: id,
      taskDescription: data.taskDescription,
      isComplete: false
    }
    realm.write(() => { realm.create('Task', taskData) })
  }

  async function completeTask(idTask) {
    const realm = await getRealm()
    try {
      realm.write(() => {
        let task = realm.objects('Task').filtered(`id == ${idTask}`)[0]; // '==' no filtro
        // Invertendo o valor de isComplete
        task.isComplete = !task.isComplete;
      });
      const tasksNow = realm.objects('Task').sorted('id', false)
      const completed = realm.objects('Task').filtered('isComplete == true')
      setCountCompleted(completed.length)
      setCountTask(tasksNow.length)
      setTask(tasksNow)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteTask(idTask) {
    const realm = await getRealm()
    try {
      realm.write(() => {
        let task = realm.objects('Task').filtered(`id == ${idTask}`)[0]; // '==' no filtro
        realm.delete(task)
      });
      const tasksNow = realm.objects('Task').sorted('id', false)
      const completed = realm.objects('Task').filtered('isComplete == true')
      setCountCompleted(completed.length)
      setCountTask(tasksNow.length)
      setTask(tasksNow)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View
      style={{ backgroundColor: '#ffffff', flex: 1 }}
    >
      <Header />
      <View
        style={styles.areaInput}
      >
        <View
          style={styles.contentInput}
        >
          <TextInput
            style={styles.input}
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor={'#121212'}
            value={input}
            onChangeText={(text) => setInput(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => handleAddTask()}
        >
          <View>
            <AddIcon
              name='plus'
              size={30}
              color={'#fff'}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 70
        }}>
        <View
          style={{
            flexDirection: "row",
            height: 30,
            justifyContent: "space-around",
            alignItems: "center"
          }}>
          <View
            style={{ flexDirection: "row" }}
          >
            <Text> Tarefas Criadas </Text>
            <View
              style={[styles.areaCount, { backgroundColor: "#bc14eecc" }]}
            >
              <Text
                style={styles.textCount}
              >
                {countTask}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row" }}
          >
            <Text > Concluidas </Text>
            <View
              style={[styles.areaCount, { backgroundColor: "#7dee14cc" }]}
            >
              <Text
                style={styles.textCount}
              >
                {countCompleted}
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          keyExtractor={item => item.id}
          data={task}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) =>
            <TaskList
              data={item}
              deleteItem={deleteTask}
              completeItem={completeTask}
            />}
        />
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  areaInput: {
    position: "absolute",
    marginTop: 125,
    alignItems: "center",
    zIndex: 20,
    flexDirection: "row",
    maxHeight: 50,
    marginHorizontal: 20,
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    fontSize: 17,
    paddingHorizontal: 20
  },
  btn: {
    backgroundColor: '#bc14ee',
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 10
  },
  contentInput: {
    flex: 1
  },
  areaCount: {
    marginLeft: 3,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textCount: {
    color: "#000"
  }
})
