import React, { useState, useEffect } from "react";
import "./App.css";

const minLength = 6;
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const numberRegex = /\d/;
const specialCharRegex = /[!@#%&*()_\-+={[}\]|:;"'<,.>]/;

function App() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessages, setValidationMessages] = useState([]);

  useEffect(() => {
    validatePassword();
  }, [password, confirmPassword]);

  const validatePassword = () => {
    const validations = [
      {
        condition: password.length >= minLength,
        message: "Password must be at least 6 characters long.",
      },
      {
        condition: uppercaseRegex.test(password),
        message: "Password must contain at least 1 uppercase letter.",
      },
      {
        condition: lowercaseRegex.test(password),
        message: "Password must contain at least 1 lowercase letter.",
      },
      {
        condition: numberRegex.test(password),
        message: "Password must contain at least 1 number.",
      },
      {
        condition: specialCharRegex.test(password),
        message: "Password must contain at least 1 special character.",
      },
      {
        condition: password === confirmPassword && confirmPassword !== "",
        message: "Passwords match.",
      },
    ];

    const newValidationMessages = validations.map((validation) => ({
      message: validation.message,
      valid: validation.condition,
    }));

    setValidationMessages(newValidationMessages);
  };

  const getValidationMessageColor = (valid) => (valid ? "valid" : "invalid");

  const getValidationMessageContent = (validation) => {
    if (validation.valid) {
      return (
        <>
          {validation.message} <span>&#x2713;</span>
        </>
      );
    } else {
      return validation.message;
    }
  };

  return (
    <div className="password-entry-container">
      <h2>Password Entry Form</h2>
      <div className="input-container">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className="input-container">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>

      <button onClick={validatePassword}>Submit</button>

      <div className="validation-message">
        {validationMessages.slice(1).map((validation, index) => (
          <p
            key={index}
            className={getValidationMessageColor(validation.valid)}
          >
            {getValidationMessageContent(validation)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
