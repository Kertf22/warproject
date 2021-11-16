import Home from './Pages/Home';
import { BrowserRouter, Route,Switch} from "react-router-dom";
import Form from './Pages/Form';

function App() {

  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/questions/:number" component={Form} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
