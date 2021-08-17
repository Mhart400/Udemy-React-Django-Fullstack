import GroupList from "./GroupList";
import { Switch, Route } from "react-router-dom";
import GroupDetails from "./GroupDetails";
import Register from "./Register";

const Main = () => {
  

  return (
    <div className="main">
      
      <Switch>
        <Route exact path="/">
          <GroupList />
        </Route>
        <Route path="/details/:id">
          <GroupDetails />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
