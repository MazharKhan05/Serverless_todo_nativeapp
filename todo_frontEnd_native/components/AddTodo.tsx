import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import {
  AllTodosFetchedTodos,
  TodoApi,
  PostTodo,
} from "../typescript_client_latest/api";
import checkSession from "../utils/checkUserSession";

interface Props {
  isChanged: boolean;
  setIsChanged: (isChanged: boolean) => void;
  show: boolean;
  setShow: (show: boolean) => void;
  alertMsg: string;
  setAlertMsg: (alertMsg: string) => void;
}
const AddTodo: React.FC<Props> = (
  { isChanged, setIsChanged, show, setShow, alertMsg, setAlertMsg },
  { navigation }
) => {
  const [todoName, setTodoName] = useState<string>("");
  const id_token =
    "eyJraWQiOiJObVRuQldST08xRXFcL0w4cE9CclkraGFZZ2g1MlJcL1pQVmFGRVp0YWk4WFU9IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoicmF1bzF2YjQxQmE1SmgzeFQyQWV6ZyIsInN1YiI6ImEzYWEyMDQ3LWFmOWEtNDVkYi04ZGFiLWY2ZjFmOWZmZjg4YiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9nSHhSRDBOWlgiLCJjb2duaXRvOnVzZXJuYW1lIjoiYTNhYTIwNDctYWY5YS00NWRiLThkYWItZjZmMWY5ZmZmODhiIiwib3JpZ2luX2p0aSI6ImI5MjU4NjIyLTFhYmQtNDk3NS1hNDBlLWY2NmNmOTY3NTdhYyIsImF1ZCI6IjJyYjJsZnU5M2h2dXRhdmE4cmExaG8waW1iIiwiZXZlbnRfaWQiOiIzZTI5YjhhOS00NzQ3LTQxZDEtYTQyYS1mNDk5OTYzNzUxMWIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY3MjIyNzQwNCwiY3VzdG9tOm9yZ0lkIjoiMDFHTTVKWFBSMk41QkE0MUc5M1YxWUFZNzUiLCJleHAiOjE2NzIyMzgyMDQsImlhdCI6MTY3MjIyNzQwNCwianRpIjoiYjhhNzRhYTktM2Q5My00ZDI3LTg3M2YtOTY1MWRjYjNjNjliIiwiZW1haWwiOiIxOGNvMzFAYWlrdGMuYWMuaW4ifQ.cEWsLfFjXoFfDzl9otzVytQDKN8vmz9O4KXHMvgAyGZrVaQJcz5w_-P6YTK0lstoIBlt54eosamDUynATRck_T5y3AyrZOgKFrPlpTIdiNpVIvtz48UH-QUHJ2_JeP_j2jIJJVrSpjv8mIllBgSo6gXiNTdIcrRmDrgQOce280J9noeyvBy2EO1cTKd0PEauOcTS2fGyms__R2T8VW1EpJ5xO79aPLWl9fb3GpML1Rrqj7Pdcg_K7UpMs1mYXobKgm7EkmhcViN9E5eqCt3TGK0GUZvx56ZKWBKrLkamqNLbIQbtYQ2gZcW0QATx4GYnB4-KNnTWq7IQKlLnJ5mvlg";
  const [resTodos, setResTodos] = useState<Array<AllTodosFetchedTodos>>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

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
  const handleSubmit = () => {
    if (isChanged) setIsChanged(false);
    setShow(show ? false : show);
    let body: PostTodo = {
      Name: "",
    };
    const todoApiObj = new TodoApi();
    body.Name = todoName;
    if (body.Name != "" && token !== "") {
      const res = todoApiObj.addTodo(body, token);
      res
        .then((addRes) => {
          console.log(addRes, "res from addTodo endpoint...");
          if (addRes.statusCode != 200) {
            setAlertMsg(addRes.message);
            setShow(true);
          }
          setIsChanged(true);
          setAlertMsg(addRes.message);
          setShow(true);
        })
        .catch((err) => {
          if (err.status === 403) {
            setAlertMsg("Action forbidden!!");
            setShow(true);
          } else if (err.status === 401) {
            setAlertMsg("User unauthorized!");
            setShow(true);
          }
          console.log(err, "error to process this request...");
        });
    } else {
      setShow(true);
      setAlertMsg("Please enter a valid input!!!");
    }
  };
  return (
    <View style={tw`flex flex-col p-2`}>
      <Text style={tw`mb-1`}>ToDo Name:</Text>
      <View style={tw`flex flex-row items-center justify-between`}>
        <TextInput
          style={tw`p-2 rounded-md bg-white w-3/4 shadow-md`}
          onChangeText={(val) => setTodoName(val)}
          placeholder="Enter Todo name..."
          // keyboardType="numeric"
        />
        <TouchableOpacity
          style={tw`rounded-md border border-transparent py-1 px-1 text-sm font-bold text-white bg-blue-500 w-fit`}
          onPress={() => handleSubmit()}
        >
          <Text style={tw`text-sm`}>Add Todo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTodo;
