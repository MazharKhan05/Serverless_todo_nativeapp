import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import tw from "tailwind-react-native-classnames";
import AlertModal from "../components/AlertModal";
import Loading from "../components/Loading";
import { AllTodosFetchedTodos, TodoApi } from "../typescript_client_latest/api";
import checkSession from "../utils/checkUserSession";
import { FormatedTodo } from "./Todos";

const ShowHistory = ({ navigation, route }) => {
  const [resHistTodos, setResHistTodos] = useState<Array<FormatedTodo>>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [historyAlertMsg, setHistoryAlertMsg] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const id_token =
    "eyJraWQiOiJObVRuQldST08xRXFcL0w4cE9CclkraGFZZ2g1MlJcL1pQVmFGRVp0YWk4WFU9IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoicmF1bzF2YjQxQmE1SmgzeFQyQWV6ZyIsInN1YiI6ImEzYWEyMDQ3LWFmOWEtNDVkYi04ZGFiLWY2ZjFmOWZmZjg4YiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9nSHhSRDBOWlgiLCJjb2duaXRvOnVzZXJuYW1lIjoiYTNhYTIwNDctYWY5YS00NWRiLThkYWItZjZmMWY5ZmZmODhiIiwib3JpZ2luX2p0aSI6ImI5MjU4NjIyLTFhYmQtNDk3NS1hNDBlLWY2NmNmOTY3NTdhYyIsImF1ZCI6IjJyYjJsZnU5M2h2dXRhdmE4cmExaG8waW1iIiwiZXZlbnRfaWQiOiIzZTI5YjhhOS00NzQ3LTQxZDEtYTQyYS1mNDk5OTYzNzUxMWIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY3MjIyNzQwNCwiY3VzdG9tOm9yZ0lkIjoiMDFHTTVKWFBSMk41QkE0MUc5M1YxWUFZNzUiLCJleHAiOjE2NzIyMzgyMDQsImlhdCI6MTY3MjIyNzQwNCwianRpIjoiYjhhNzRhYTktM2Q5My00ZDI3LTg3M2YtOTY1MWRjYjNjNjliIiwiZW1haWwiOiIxOGNvMzFAYWlrdGMuYWMuaW4ifQ.cEWsLfFjXoFfDzl9otzVytQDKN8vmz9O4KXHMvgAyGZrVaQJcz5w_-P6YTK0lstoIBlt54eosamDUynATRck_T5y3AyrZOgKFrPlpTIdiNpVIvtz48UH-QUHJ2_JeP_j2jIJJVrSpjv8mIllBgSo6gXiNTdIcrRmDrgQOce280J9noeyvBy2EO1cTKd0PEauOcTS2fGyms__R2T8VW1EpJ5xO79aPLWl9fb3GpML1Rrqj7Pdcg_K7UpMs1mYXobKgm7EkmhcViN9E5eqCt3TGK0GUZvx56ZKWBKrLkamqNLbIQbtYQ2gZcW0QATx4GYnB4-KNnTWq7IQKlLnJ5mvlg";

  useFocusEffect(
    useCallback(() => {
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
      let isLoading = true;
      if (token !== "") {
        isLoading = false;
      }
      const { todo } = route.params;
      console.log("current todo", todo);
      if (todo && (todo.SK === "" || !todo)) {
        setHistoryAlertMsg("Please select a todo to display history.");
        setShowAlert(true);
        return;
      }
      const todoIdStr = todo.SK?.substring(7, 33);

      const todoApiObj = new TodoApi();
      if (!isLoading) {
        const res = todoApiObj.getTodoHistory(token, todoIdStr!);
        res
          .then((histTodos) => {
            if (histTodos.errType != "" && histTodos.statusCode != 200) {
              setHistoryAlertMsg(histTodos.message);
              setShowAlert(true);
            }

            const formatedTodos = histTodos.historyTodos?.map((todo) => {
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
            setResHistTodos(formatedTodos!);
            setShowHistory(true);
          })
          .catch((err) => {
            if (err.status == 403) {
              setHistoryAlertMsg("Action forbidden!!");
              setShowAlert(true);
            } else if (err.status === 401) {
              setHistoryAlertMsg("User unauthorized!");
              setShowAlert(true);
            }
            console.log(err);
          });
      }
    }, [token])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={tw`flex w-full`}>
            <View style={tw`p-2`}>
              {showHistory && resHistTodos.length > 0 ? (
                <>
                  <View style={tw`rounded-md`}>
                    <View style={tw`flex flex-1 flex-row`}>
                      <Text style={tw`text-lg font-semibold`}>
                        Name: {resHistTodos[0]?.Name}
                      </Text>
                    </View>
                    <View style={tw`w-full`}>
                      {resHistTodos &&
                        resHistTodos.map((todo, i) => (
                          <View
                            key={i}
                            style={tw`flex flex-col mb-3 border border-blue-300 rounded-md p-1`}
                          >
                            <Text style={tw` mb-2`}>State: {todo.State}</Text>
                            <View>
                              <Text style={tw`mr-3 mb-1`}>
                                Date: {todo.dateStr}
                              </Text>
                              <Text>Time: {todo.timeStr}</Text>
                            </View>
                          </View>
                        ))}
                    </View>
                  </View>
                </>
              ) : (
                <View
                  style={tw`h-full flex flex-col justify-center items-center`}
                >
                  <Text style={tw`font-bold text-2xl`}>
                    No Todo history to display!!!
                  </Text>
                  {showAlert ? (
                    <Text style={tw`font-semibold text-lg`}>
                      {historyAlertMsg}
                    </Text>
                  ) : (
                    <></>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowHistory;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    padding: 10,
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
});
