import { React, useEffect } from "react";
import styles from "../styles/Home.module.scss";

/*
 * Function to generate a list of user
 * with the email and name
 * @param updateEmails function to update emails list
 * @param emails list of object with _id,name and email
 * @return unordered list with emails
 * */
export default function UserEmailList({ updateEmails, emails }) {
  useEffect(() => {
    updateEmails();
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
