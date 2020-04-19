import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUploader from './screens/ImageUpload';
import ImageCropper from './screens/ImageCropper';
import ImagePreview from './screens/ImagePreview';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ImageUploader} />
        <Route path="/crop/:position" component={ImageCropper} />
        <Route path="/image/preview" component={ImagePreview} />
      </Switch>
    </Router>
  );
}

export default App;
