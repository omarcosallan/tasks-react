import styles from "./Header.module.css";

import { useState } from "react";
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";

export function Header() {
  const { sigOut } = useAuthentication();
  const { user } = useAuthValue();

  const [openMenuUser, setOpenMenuUser] = useState(false);
  const [isExitMenuUser, setIsExitMenuUser] = useState(false);

  const exitMenuUser = (value) => {
    setIsExitMenuUser(!value);

    function time() {
      if (value) {
        return 0;
      } else return 500;
    }

    setTimeout(() => {
      setOpenMenuUser(value);
    }, time());
  };

  return (
    <header className={styles.header}>
      <a href="/">
        <h1>TO DO LIST</h1>
      </a>
      <div className={styles.left}>
        <label className={styles.search}>
          <input type="name" placeholder="Search task" />
        </label>

        <div className={styles.container_menu}>
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className={styles.photo_url}
            onClick={() => exitMenuUser(!openMenuUser)}
          />
          {openMenuUser && (
            <div
              className={`${styles.menu_open} animate__animated ${
                isExitMenuUser ? "animate__bounceOut" : "animate__bounceIn"
              }`}
            >
              <div>
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className={styles.photo_url}
                />
                <div>
                  <p className="bold">{user?.displayName}</p>
                  <p>{user?.email}</p>
                </div>
              </div>

              <button type="button" onClick={sigOut} className={styles.button}>
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
