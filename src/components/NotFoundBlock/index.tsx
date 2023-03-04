import React, { FC } from "react";

import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: FC = () => {
  return (
    <h1 className={styles.root}>
      <span>:(</span>
      <br />
      Nothing was found
    </h1>
  );
};

export default NotFoundBlock;
