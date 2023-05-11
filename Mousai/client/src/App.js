// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Spinner } from 'reactstrap';
// import Header from "./components/Header";
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import AddPostForm from './components/AddPostForm';
// import MyPostsList from './components/MyPostsList';
// import PostDetail from './components/PostDetails';
// import EditPostForm from './components/EditPostForm';
// import { onLoginStatusChange } from "./modules/authManager";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(null);

//   const handleLoginStatusChange = (isLoggedIn) => {
//     setIsLoggedIn(isLoggedIn);
//   }

//   useEffect(() => {
//     onLoginStatusChange(handleLoginStatusChange);
//   }, []);

//   if (isLoggedIn === null) {
//     return <Spinner className="app-spinner dark" />;
//   }

//   return (
//     <Router>
//       <Header isLoggedIn={isLoggedIn} />
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/login" component={Login} />
//         <Route path="/register" component={Register} />
//         <Route path="/add" component={AddPostForm} />
//         <Route path="/mypostslist" component={MyPostsList} />
//         <Route path="/post/:id" component={PostDetail} />
//         <Route path="/edit/:id" component={EditPostForm} />
//       </Switch>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from 'reactstrap';
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLoginStatusChange = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  }

  useEffect(() => {
    onLoginStatusChange(handleLoginStatusChange);
  }, []);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <ApplicationViews isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;
