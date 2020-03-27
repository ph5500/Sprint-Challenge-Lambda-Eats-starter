import React from "react";
import './App.css';
import { Route } from "react-router-dom";
import Home from "./Components/Home.js";
import Form from "./Components/Form.js";

const App = () => {
  return (
    <div>



      <Route exact path='/' component={Home} />
      <Route exact path='/pizza'>

        <Form />
      </Route>



    </div>
  );
};
export default App;
