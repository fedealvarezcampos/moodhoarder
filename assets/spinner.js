import styles from '../styles/spinner.module.css';

function Spinner() {
    return (
        // prettier-ignore
        <div className={styles.skcubegrid}>
            <div className={`${styles.skcube} ${styles.skcube1}`} />
            <div className={`${styles.skcube} ${styles.skcube2}`} />
            <div className={`${styles.skcube} ${styles.skcube3}`} />
            <div className={`${styles.skcube} ${styles.skcube4}`} />
            <div className={`${styles.skcube} ${styles.skcube5}`} />
            <div className={`${styles.skcube} ${styles.skcube6}`} />
            <div className={`${styles.skcube} ${styles.skcube7}`} />
            <div className={`${styles.skcube} ${styles.skcube8}`} />
            <div className={`${styles.skcube} ${styles.skcube9}`} />
        </div>
    );
}

export default Spinner;
