import { RegisterBody, UserQueryResponse, loginBody } from "@/types";
import axios from "./axios";
import { setUser } from "@/store/userSlice";
import { store } from "@/store/store";
import Cookies from "js-cookie";

export async function registerUser(body: RegisterBody): Promise<void> {
  try {
    const query: UserQueryResponse = await axios.post("/user/register", body);
    if ("error" in query.data) throw new Error(query.data.error);
    Cookies.set("accessToken", query?.data.token, {
      expires: 86400,
    });
    store.dispatch(setUser(query?.data.user));
    alert(`Felicidades, te registraste con exito ${query.data.user.firstName}`);
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(body: loginBody): Promise<void> {
  const isAnySession = Cookies.get("accessToken");
  if (!isAnySession) {
    try {
      const petition: UserQueryResponse = await axios.post("/user/login", body);
      if ("error" in petition.data) throw new Error(petition.data.error);
      // localStorage.setItem("tkn", petition?.data.token);
      Cookies.set("accessToken", petition?.data.token, {
        expires: 86400,
      });
      store.dispatch(setUser(petition?.data.user));
      alert(`bienvenido ${petition.data.user.firstName}`);
      return;
    } catch (error) {
      console.log(error);
      throw new Error("algo salio mal :(");
    }
  } else {
    throw new Error("Ya hay una sesion activa");
  }
}

export async function logoutUser() {
  Cookies.remove("accessToken");
  store.dispatch(setUser(null));
}
