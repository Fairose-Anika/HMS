import React from "react";

function Login({ onLogin }) {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🏥 Happy Care Login</h1>
        <input placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
