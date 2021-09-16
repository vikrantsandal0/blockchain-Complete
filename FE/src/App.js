import { Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlockInner from './pages/blockInner';
import { Blocks } from "./pages/blocks";
import "./styles.css";

export default function App() {
  return (
    <div className='App'>
      <Container>
        <Row>
          <Router>
            <Switch>
              <Route path='/' exact component={Blocks} />
              <Route path='/block/:id' component={BlockInner} />
            </Switch>
          </Router>
        </Row>
      </Container>
    </div>
  );
}
