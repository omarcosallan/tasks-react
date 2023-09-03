import styles from "./Header.module.css";

import { useEffect, useRef, useState } from "react";
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, LayoutDashboard, LogOut } from "lucide-react";

export function Header() {
  const { sigOut } = useAuthentication();
  const { user } = useAuthValue();
  const [openMenuUser, setOpenMenuUser] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const menuElement = menuRef.current;

    function handleClickOutside(event) {
      if (menuElement && !menuElement.contains(event.target)) {
        setOpenMenuUser(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuUser]);

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>TO DO LIST</h1>
      </Link>
      <nav className={styles.nav}>
        <NavLink
          className={({ isActive }) => `${isActive ? styles.active : ""} `}
          to={"/"}
        >
          <Home />
          <span>Home</span>
        </NavLink>

        <NavLink
          className={({ isActive }) => `${isActive ? styles.active : ""} `}
          to={"dashboard"}
        >
          <LayoutDashboard />
          <span>Dashboard</span>
        </NavLink>

        <div className={styles.container_menu}>
          <button
            className={`${styles.photo_perfil} ${styles.cursor_pointer}`}
            onClick={() => setOpenMenuUser(!openMenuUser)}
            disabled={openMenuUser}
          >
            <img src={user?.photoURL} alt={user?.displayName} />
          </button>

          {openMenuUser && (
            <div
              className={`${styles.menu_open}  animate__animated animate__bounceIn`}
              ref={menuRef}
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

              <button
                type="button"
                onClick={sigOut}
                className={styles.btn_logout}
              >
                <LogOut />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
