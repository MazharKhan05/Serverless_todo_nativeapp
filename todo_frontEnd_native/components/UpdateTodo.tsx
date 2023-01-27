import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import {
  AllTodosFetchedTodos,
  TodoApi,
  UpdateTodo,
} from "../typescript_client_latest/api";
import { FormatedTodo } from "../screens/Todos";
import { useFocusEffect } from "@react-navigation/native";
import checkSession from "../utils/checkUserSession";
interface Props {
  isChanged: boolean;
  setIsChanged: (isChanged: boolean) => void;
  showUptForm: boolean;
  setShowUptForm: (showUptForm: boolean) => void;
  todo: FormatedTodo;
  show: boolean;
  setShow: (show: boolean) => void;
  alertMsg: string;
  setAlertMsg: (alertMsg: string) => void;
}

const Updatetodo: React.FC<Props> = (
  {
    isChanged,
    setIsChanged,
    showUptForm,
    setShowUptForm,
    todo,
    show,
    setShow,
    alertMsg,
    setAlertMsg,
  },
  { navigation }
) => {
  const [todoName, setTodoName] = useState<string>("");
  const [todoStatus, setTodoStatus] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
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
  const data = [
    {
      value: "Completed",
      label: "Completed",
    },
    {
      value: "Processing",
      label: "Processing",
    },
    {
      value: "Cancelled",
      label: "Cancelled",
    },
  ];
  const handleUpdation = () => {
    if (isChanged) setIsChanged(false);
    let body: UpdateTodo = {
      Name: "",
      State: "",
    };
    const todoIdStr: string = todo.SK?.substring(7, 33)!;
    const todoApiObj = new TodoApi();
    body.Name = todoName;
    body.State = todoStatus;
    if (
      (token !== "" && body.Name != "") ||
      (body.State != "" && todoIdStr && todoIdStr != "")
    ) {
      const res = todoApiObj.updateTodo(token, todoIdStr, body);
      res
        .then((uptRes) => {
          if (uptRes.statusCode != 200) {
            setAlertMsg(uptRes.message);
            setShow(true);
          }
          console.log("uptRes from db...", uptRes);
          setIsChanged(true);
          setAlertMsg(uptRes.message);
          setShow(true);
          setShowUptForm(false);
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
    } else {
      setShow(true);
      setAlertMsg("Please enter a valid input!!!");
    }
  };

  return (
    <View>
      <Text>Update Todo State</Text>
      {showUptForm ? (
        <View
          style={tw`flex flex-row items-center justify-between text-red-400`}
        >
          <View style={tw`bg-gray-200 w-3/4 rounded-lg`}>
            <Dropdown
              label={`Select ${todo.Name} state...`}
              data={data}
              value={todoStatus}
              onChange={(state: string) => {
                setTodoStatus(state);
              }}
            />
          </View>

          <TouchableOpacity
            style={tw`rounded-md border border-transparent py-2 px-3 text-sm font-bold bg-blue-500 w-fit`}
            onPress={() => handleUpdation()}
          >
            <Text style={tw`text-sm`}>Update</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Updatetodo;
