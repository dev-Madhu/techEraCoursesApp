import {Switch, Redirect, Route} from 'react-router-dom'
import NotFound from './components/NotFound'
import CourseItemDetails from './components/CourseItemDetails'
import Home from './components/Home'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
