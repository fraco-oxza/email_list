import styles from "../styles/Home.module.scss";

import { React, useState, useEffect, useCallback } from "react";

function InputForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeName = useCallback((event) => {
    setName(event.target.value);
  });
  const handleChangeEmail = useCallback((event) => {
    setEmail(event.target.value);
  });

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (name === "") {
      alert("Por favor introduzca un nombre");
      return;
    }
    if (email === "") {
      alert("Por favor introduzca un email");
      return;
    }

    fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    setEmail("");
    setName("");
    setTimeout(document.updateEmails, 200);
  });

  return (
    <form className={styles.emailForm} onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <br />
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleChangeName}
      />
      <br />
      <label htmlFor="email">Email: </label>
      <br />
      <input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={handleChangeEmail}
      />
      <br />
      <input type="submit" name="su" id={styles.send} value="Send Request" />
    </form>
  );
}

function UserEmailList() {
  const [emails, setEmails] = useState([]);

  /* Function to sync the list of emails,
   * with the database
   */
  const updateEmails = () => {
    fetch("/api/email").then((data) => {
      data.json().then((val) => {
        setEmails(Object.values(val));
      });
    });
  };

  useEffect(() => {
    updateEmails();
    document.updateEmails = updateEmails;
  }, []);

  return (
    <ul className={styles.emailList}>
      {emails.map((user) => (
        <li key={user._id}>
          <span>
            {user.name}, <b>{user.email}</b>
          </span>
        </li>
      ))}
    </ul>
  );
}

/*
 * Function in charge of produce the index page
 * and all the logic of the application
 * @returns page as JSX
 */
export default function Home() {
  return (
    <main className={styles.main}>
      {InputForm()}
      {UserEmailList()}
    </main>
  );
}
