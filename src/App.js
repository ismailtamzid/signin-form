import { createContext,useState } from "react";
import "./App.css";
import Form from "./component/Form/Form";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Home from "./component/Home/Home";

export const UserContext = createContext();

function App() {

  const [user,setUser] = useState({
    name: '',
    email: '',
    password: '',
    errorMessage: '',
    success: false,
    newUserEntry: true
  });

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/sign'>
            <Form />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
