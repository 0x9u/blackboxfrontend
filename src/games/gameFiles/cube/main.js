import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import styles from './cube.module.css';

function CubeGame() {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "/build/s2.loader.js",
    dataUrl: "/build/s2.data.unityweb",
    frameworkUrl: "/build/s2.framework.js.unityweb",
    codeUrl: "/build/s2.wasm.unityweb",
  });

  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <div className={styles.gameContainer}>
      {
        !isLoaded
        && (
          <div className={styles.loading}>
              <p>{loadingPercentage}%</p>
          </div>
        )
      }
      <Unity unityProvider={unityProvider} className={styles.game}/>
    </div>
  );
}

export default CubeGame;