
import './styles/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth } from './components/auth.js'
import { Video } from './components/roomCall'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/:url" component={Video} />
        </Switch>
      </Router>
    </div>
  )

}
export default App;
