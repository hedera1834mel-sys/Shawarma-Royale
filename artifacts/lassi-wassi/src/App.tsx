import { Route, Switch } from 'wouter';
import HomePage from './pages/home-page';
import MenuPage from './pages/menu-page';

export default function App() {
  return (
    <Switch>
      <Route path="/menu" component={MenuPage} />
      <Route path="/" component={HomePage} />
      <Route component={HomePage} />
    </Switch>
  );
}
