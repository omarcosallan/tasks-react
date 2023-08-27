import styles from "./Login.module.css";
import { GoogleLogo } from "@phosphor-icons/react";
import { useAuthentication } from "../../hooks/useAuthentication";

export function Login() {
  const { sigInWithGoogle } = useAuthentication();

  return (
    <div className={styles.login}>
      <h1>Acesse sua conta</h1>
      <p>
        Acesse sua conta com facilidade usando a conta Google. <br />
        Em poucos cliques, tenha acesso rápido aos nossos serviços, combinando
        praticidade e segurança.
      </p>

      <button type="button" onClick={sigInWithGoogle} className={styles.button}>
        <GoogleLogo />
        <span>Entrar com Google</span>
      </button>
    </div>
  );
}
