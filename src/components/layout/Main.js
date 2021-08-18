import GroupList from "../group/GroupList";
import { Switch, Route } from "react-router-dom";
import GroupDetails from "../group/GroupDetails";
import Register from "../user/Register";
import Account from "../user/Account";

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
        <Route path="/account">
          <Account />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
