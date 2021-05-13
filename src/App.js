import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import {client, isLoggedInVar} from "./apollo";
import {darkModeVar} from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style";
import CreateAccount from "./screens/CreateAccount";
import {HelmetProvider} from "react-helmet-async"

import routes from "./routes";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return(
    <ApolloProvider client={client}>
    <HelmetProvider>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Router>
      <Switch>
      <Route path="/" exact>
      {console.log(isLoggedIn)}
        {isLoggedIn ? ( <Home/>
          ):(
             <Login/>
          )}
      </Route>
      {isLoggedIn ? ( 
        <Route path={routes.CreateAccount}>
        <CreateAccount/>
        </Route>
      ): null}
     
      <Route>
        <NotFound />
      </Route>
    </Switch>
    </Router>
    </ThemeProvider>
    </HelmetProvider>
    </ApolloProvider>
  )
}

export default App;