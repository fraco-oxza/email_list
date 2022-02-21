import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.scss";

import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);

  const updateEmails = () => {
    fetch("/api/email").then((emails) => {
      emails.json().then((val) => {
        setEmails(Object.values(val));
      });
    });
  };

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

  useEffect(() => {
    updateEmails();
    document.haf = updateEmails;
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
          <input
            type="submit"
            name="su"
            id={styles.send}
            value="Send Request"
          />
        </form>
        <div>
          <ul className={styles.emailList}>
            {emails.map((email) => (
              <li key={email._id}>
                <span>
                  {email.name}, <b>{email.email}</b>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
