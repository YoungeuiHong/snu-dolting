import React from "react";
import * as styles from "./drawer.css";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer = ({ open, onClose, children }: DrawerProps) => {
  return (
    <>
      <div
        className={`${styles.overlayStyle} ${
          open ? styles.overlayVisibleStyle : ""
        }`}
        onClick={onClose}
      />
      <div
        className={`${styles.drawerStyle} ${
          open ? styles.drawerVisibleStyle : ""
        }`}
      >
        <button
          className={styles.closeButtonStyle}
          onClick={onClose}
          aria-label="Close drawer"
        >
          &times;
        </button>
        {children}
      </div>
    </>
  );
};
