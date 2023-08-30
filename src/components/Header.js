import styles from "./Header.module.css";

import { useEffect, useRef, useState } from "react";
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const { sigOut } = useAuthentication();
  const { user } = useAuthValue();

  const [openMenuUser, setOpenMenuUser] = useState(false);
  const [isExitMenuUser, setIsExitMenuUser] = useState(false);

  const navigate = useNavigate();

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

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsExitMenuUser(true);

        setTimeout(() => {
          setOpenMenuUser(false);
        }, 500);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>TO DO LIST</h1>
      </Link>
      <div className={styles.left}>
        <label className={styles.search}>
          <input type="name" placeholder="Search task" />
        </label>

        <div className={styles.container_menu} ref={menuRef}>
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className={`${styles.photo_perfil} ${styles.cursor_pointer}`}
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
                  className={styles.photo_perfil}
                />
                <div>
                  <p className="bold">{user?.displayName}</p>
                  <p>{user?.email}</p>
                </div>
              </div>

              <div
                className={styles.item_perfil}
                onClick={() => navigate("dashboard")}
              >
                <span>Dashboard</span>
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
