import { Link } from "react-router-dom";

import styles from "./Alert.module.css";

export function Alert({ icon, description, textButton }) {
  return (
    <div className={`${styles.card} ${styles.alert}`}>
      <span className={styles.icon}>{icon}</span>
      <p>{description}</p>
      <Link to="/">{textButton}</Link>
    </div>
  );
}
