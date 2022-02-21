import { React, useState, useEffect } from "react";

import UserEmailList from "../components/UserEmailList";
import InputForm from "../components/InputForm";

import styles from "../styles/Home.module.scss";

/*
 * Function in charge of produce the index page
 * and all the logic of the application
 * @returns page as JSX
 */
export default function Home() {
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

  return (
    <main className={styles.main}>
      <InputForm updateEmails={updateEmails} />
      <UserEmailList updateEmails={updateEmails} emails={emails} />
    </main>
  );
}
