import { React, useCallback, useState } from "react";
import styles from "../styles/Home.module.scss";

/*
 * Function that return a single component
 * of form, allows to enter a name and an
 * email, then send them to the api
 * @return email and name form Component
 */
export default function InputForm({ updateEmails }) {
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
    setTimeout(updateEmails, 200);
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
