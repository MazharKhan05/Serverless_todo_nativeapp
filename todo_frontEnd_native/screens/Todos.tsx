import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/AntDesign";
import { useFocusEffect } from "@react-navigation/native";
import { AllTodosFetchedTodos, TodoApi } from "../typescript_client_latest/api";
import AlertModal from "../components/AlertModal";
import AddTodo from "../components/AddTodo";
import Updatetodo from "../components/UpdateTodo";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import checkSession, { userSignout } from "../utils/checkUserSession";

export interface FormatedTodo {
  PK: string;
  SK: string;
  Name: string;
  State: string;
  dateStr: string;
  timeStr: string;
}
let dtFormatedTodo = {
  PK: "",
  SK: "",
  Name: "",
  State: "",
  dateStr: "",
  timeStr: "",
};

const Todos = ({ navigation }) => {
  const [resTodos, setResTodos] = useState<Array<FormatedTodo>>([]);
  const [uptTodo, setUptTodo] = useState<FormatedTodo>();
  const [showUptForm, setShowUptForm] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  console.log("in todos component...");
  const id_token =
    "eyJraWQiOiJObVRuQldST08xRXFcL0w4cE9CclkraGFZZ2g1MlJcL1pQVmFGRVp0YWk4WFU9IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoicmF1bzF2YjQxQmE1SmgzeFQyQWV6ZyIsInN1YiI6ImEzYWEyMDQ3LWFmOWEtNDVkYi04ZGFiLWY2ZjFmOWZmZjg4YiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9nSHhSRDBOWlgiLCJjb2duaXRvOnVzZXJuYW1lIjoiYTNhYTIwNDctYWY5YS00NWRiLThkYWItZjZmMWY5ZmZmODhiIiwib3JpZ2luX2p0aSI6ImI5MjU4NjIyLTFhYmQtNDk3NS1hNDBlLWY2NmNmOTY3NTdhYyIsImF1ZCI6IjJyYjJsZnU5M2h2dXRhdmE4cmExaG8waW1iIiwiZXZlbnRfaWQiOiIzZTI5YjhhOS00NzQ3LTQxZDEtYTQyYS1mNDk5OTYzNzUxMWIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY3MjIyNzQwNCwiY3VzdG9tOm9yZ0lkIjoiMDFHTTVKWFBSMk41QkE0MUc5M1YxWUFZNzUiLCJleHAiOjE2NzIyMzgyMDQsImlhdCI6MTY3MjIyNzQwNCwianRpIjoiYjhhNzRhYTktM2Q5My00ZDI3LTg3M2YtOTY1MWRjYjNjNjliIiwiZW1haWwiOiIxOGNvMzFAYWlrdGMuYWMuaW4ifQ.cEWsLfFjXoFfDzl9otzVytQDKN8vmz9O4KXHMvgAyGZrVaQJcz5w_-P6YTK0lstoIBlt54eosamDUynATRck_T5y3AyrZOgKFrPlpTIdiNpVIvtz48UH-QUHJ2_JeP_j2jIJJVrSpjv8mIllBgSo6gXiNTdIcrRmDrgQOce280J9noeyvBy2EO1cTKd0PEauOcTS2fGyms__R2T8VW1EpJ5xO79aPLWl9fb3GpML1Rrqj7Pdcg_K7UpMs1mYXobKgm7EkmhcViN9E5eqCt3TGK0GUZvx56ZKWBKrLkamqNLbIQbtYQ2gZcW0QATx4GYnB4-KNnTWq7IQKlLnJ5mvlg";

  useFocusEffect(
    React.useCallback(() => {
      console.log("in here todos....");
      const sessionStat = checkSession();
      sessionStat
        .then((userSession) => {
          if (userSession.isLoggedIn) {
            setIsAuthenticated(true);
            setToken(userSession.authToken);
          } else {
            navigation.navigate("login");
          }
        })
        .catch((err) => {
          console.log("getSession err... & userToken", err, token);
        });
    }, [])
  );

  const formartDate = (todo: AllTodosFetchedTodos) => {
    const todoDate = new Date(todo.time!).getDate();
    const todoMonth = new Date(todo.time!).getMonth();
    const todoYear = new Date(todo.time!).getFullYear();
    const concatDate =
      String(todoDate) + "/" + String(todoMonth) + "/" + String(todoYear);

    const todoHour = new Date(todo.time!).getHours();
    const todoMinutes = new Date(todo.time!).getMinutes();
    const todoSeconds = new Date(todo.time!).getSeconds();
    const concatTime =
      String(todoHour) + ":" + String(todoMinutes) + ":" + String(todoSeconds);

    return `${concatDate}::${concatTime}`;
  };

  useFocusEffect(
    useCallback(() => {
      let dtFormatedTodos: Array<FormatedTodo> = [];
      const newTodoApiObj = new TodoApi();
      console.log("in todos api call useEffect...");
      let res;
      if (!isChanged && token && token !== "" && resTodos.length === 0) {
        res = newTodoApiObj.getTodos(token);
        res
          .then((todos) => {
            if (todos.errType != "" && todos.statusCode != 200) {
              setAlertMsg(todos.message);
              setShow(true);
            }
            const formatedTodos = todos.fetchedTodos?.map((todo) => {
              const formatedRes = formartDate(todo);
              const splitedRes = formatedRes.split("::");
              return {
                PK: todo.PK!,
                SK: todo.SK!,
                Name: todo.Name!,
                State: String(todo.State)!,
                dateStr: splitedRes[0]!,
                timeStr: splitedRes[1]!,
              };
            });
            setResTodos(formatedTodos!);
            // setIsChanged(false);
          })
          .catch((err) => {
            if (err.status >= 500) setAlertMsg("Something went wrong!!");
            setShow(true);
          });
      }
      if (isChanged && token && token !== "") {
        res = newTodoApiObj.getTodos(token);
        res
          .then((todos) => {
            if (todos.errType != "" && todos.statusCode != 200) {
              setAlertMsg(todos.message);
              setShow(true);
            }
            const formatedTodos = todos.fetchedTodos?.map((todo) => {
              const formatedRes = formartDate(todo);
              const splitedRes = formatedRes.split("::");
              return {
                PK: todo.PK!,
                SK: todo.SK!,
                Name: todo.Name!,
                State: String(todo.State)!,
                dateStr: splitedRes[0]!,
                timeStr: splitedRes[1]!,
              };
            });
            setResTodos(formatedTodos!);
            // setIsChanged(false);
          })
          .catch((err) => {
            if (err.status >= 500) setAlertMsg("Something went wrong!!");
            setShow(true);
          });
      }
    }, [isChanged, token])
  );

  const handleDelete = (todo: FormatedTodo) => {
    if (isChanged) setIsChanged(false);
    const todoIdStr = todo.SK?.substring(7, 33);

    const todoApiObj = new TodoApi();
    if (todoIdStr && todoIdStr != "" && token !== "") {
      const res = todoApiObj.deleteTodo(token, todoIdStr);
      res
        .then((delRes) => {
          if (delRes.errType != "" && delRes.statusCode != 200) {
            setAlertMsg(delRes.message);
            setShow(true);
          }
          console.log(delRes, "delete response...");
          setAlertMsg(delRes.message);
          setShow(true);
          setIsChanged(true);
        })
        .catch((err) => {
          if (err.status === 403) {
            setAlertMsg("Action forbidden!!");
            setShow(true);
          } else if (err.status === 401) {
            setAlertMsg("User unauthorized!");
            setShow(true);
          }
          console.log(err);
        });
    }
  };
  const handleSignout = () => {
    userSignout()
      .then((res) => {
        setIsAuthenticated(false);
        setToken("");
        navigation.navigate("login");
      })
      .catch((err) => {
        console.log("logout err", err);
      });
  };
  // const handleTodoHisory = (todo: FormatedTodo) => {
  //   if (todo.SK === "" || !todo) {
  //     setAlertMsg("Invalid input, please try again.");
  //     setShow(true);
  //   }
  //   const todoIdStr = todo.SK?.substring(7, 33);

  //   const todoApiObj = new TodoApi();
  //   const res = todoApiObj.getTodoHistory(id_token, todoIdStr!);
  //   res
  //     .then((histTodos) => {
  //       if (histTodos.errType != "" && histTodos.statusCode != 200) {
  //         setAlertMsg(histTodos.message);
  //         setShow(true);
  //       }

  //       const formatedTodos = histTodos.historyTodos?.map((todo) => {
  //         const formatedRes = formartDate(todo);
  //         const splitedRes = formatedRes.split("::");
  //         return {
  //           PK: todo.PK!,
  //           SK: todo.SK!,
  //           Name: todo.Name!,
  //           State: String(todo.State)!,
  //           dateStr: splitedRes[0]!,
  //           timeStr: splitedRes[1]!,
  //         };
  //       });
  //       setAlertMsg(histTodos.message);
  //       setShow(true);
  //       setResHistTodos(formatedTodos!);
  //       setShowHistory(true);
  //       // setShow(true);
  //     })
  //     .catch((err) => {
  //       if (err.status == 403) {
  //         setAlertMsg("Action forbidden!!");
  //         setShow(true);
  //       } else if (err.status === 401) {
  //         setAlertMsg("User unauthorized!");
  //         setShow(true);
  //       }
  //       console.log(err);
  //     });
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={tw`flex px-2 py-1 flex-row justify-between items-center`}
          >
            <Text style={tw`text-center text-2xl font-semibold`}>
              Todos Serverless
            </Text>
            {isAuthenticated ? (
              <TouchableOpacity
                style={tw`rounded-md border border-transparent py-1 px-2 font-bold text-white bg-red-500`}
                onPress={() => handleSignout()}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <View style={tw` container flex flex-1 flex-col`}>
            {!resTodos || resTodos.length === 0 ? (
              <View style={tw`flex flex-1 `}>
                <View style={tw`h-full justify-center items-center`}>
                  <Text style={tw`font-bold text-2xl`}>
                    No Todos to display
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}
            <View style={tw`flex justify-center`}>
              <View style={tw`w-full p-3`}>
                {resTodos &&
                  resTodos.map((todo, i) => (
                    <View
                      key={i}
                      style={tw`flex flex-col justify-evenly mb-5 border border-blue-700 rounded-md p-1`}
                    >
                      <Text style={tw` mb-2`}>Name: {todo.Name}</Text>
                      <Text style={tw`font-semibold mb-2`}>
                        State: {todo.State}
                      </Text>
                      <View style={tw`flex flex-row items-center`}>
                        <Text style={tw`mr-1`}>Actions:</Text>
                        <View
                          style={tw`flex flex-row items-center w-2/3 justify-around`}
                        >
                          <TouchableOpacity
                            style={tw`rounded-md border border-transparent py-1 px-2 font-bold text-white bg-blue-500`}
                            onPress={() => {
                              setUptTodo(todo);
                              setShowUptForm(true);
                              setShow(show ? false : show);
                            }}
                          >
                            <Text>Update</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={tw`rounded-md border border-transparent py-1 px-2 font-bold text-white bg-red-500`}
                            onPress={() => handleDelete(todo)}
                          >
                            <Text>Delete</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={tw`rounded-md border border-transparent py-1 px-2 font-bold text-white bg-yellow-500`}
                            onPress={() => {
                              navigation.navigate("TodoHistory", {
                                todo: todo,
                              });
                            }}
                          >
                            <Text>History</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
            <View style={tw`flex justify-center w-full`}>
              <View style={tw`p-3`}>
                {show ? (
                  <AlertModal message={alertMsg} setShow={setShow} />
                ) : (
                  <></>
                )}
                {showUptForm ? (
                  <Updatetodo
                    isChanged={isChanged}
                    setIsChanged={setIsChanged}
                    showUptForm={showUptForm}
                    setShowUptForm={setShowUptForm}
                    todo={uptTodo!}
                    show={show}
                    setShow={setShow}
                    alertMsg={alertMsg}
                    setAlertMsg={setAlertMsg}
                  />
                ) : (
                  <></>
                )}
              </View>
            </View>
            <AddTodo
              isChanged={isChanged}
              setIsChanged={setIsChanged}
              show={show}
              setShow={setShow}
              alertMsg={alertMsg}
              setAlertMsg={setAlertMsg}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
});
