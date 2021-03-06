import { useEffect, useState } from "react";
import "./App.css";
import { IColorState } from "./common/types";
import Box from "./components/Box";

function App() {
  const [colors, setColors] = useState<IColorState[][]>([]);
  const [redCount, setRedCount] = useState(0);
  const [redToBeRemoved, setRedToBeRemoved] = useState("");

  useEffect(() => {
    const colorArr = [];
    for (let i = 0; i < 4; i++) {
      const innerArr = [];
      for (let j = 0; j < 4; j++) {
        innerArr.push({ colorCode: 0, boxId: `i${i}j${j}` });
      }
      colorArr.push(innerArr);
    }
    setColors(colorArr);
  }, []);

  const changeColorEvent = (boxId: string) => {
    if (redCount === 0) {
      setRedToBeRemoved(boxId);
    }
    setColors((prev) => {
      const updatedColorsArr = [...prev];
      let [, i_str, , j_str] = boxId.split("");
      let i = parseInt(i_str);
      let j = parseInt(j_str);
      const colorCode = updatedColorsArr[i][j].colorCode;
      if (colorCode === 0) {
        if (redCount === 2) {
          let [, a_str, , b_str] = redToBeRemoved.split("");
          let a = parseInt(a_str);
          let b = parseInt(b_str);
          updatedColorsArr[a][b].colorCode = 0;
          let nextRedToBeRemoved;
          for (let i = 0; i < updatedColorsArr.length; i++) {
            for (let j = 0; j < updatedColorsArr[i].length; j++) {
              if (updatedColorsArr[i][j].colorCode === 1) {
                nextRedToBeRemoved = updatedColorsArr[i][j];
                break;
              }
            }
          }
          if (nextRedToBeRemoved !== undefined) {
            setRedToBeRemoved(nextRedToBeRemoved.boxId);
          }
        } else {
          setRedCount((prev) => prev + 1);
        }
        updatedColorsArr[i][j].colorCode = 1;
      }
      return updatedColorsArr;
    });
  };
  return (
    <div className="App">
      <h1>Matrix Game</h1>

      <div className="grid">
        {colors.length === 0
          ? "Loading..."
          : new Array(4).fill(0).map((_, i) => {
              return (
                <div className="row" key={i}>
                  {new Array(4).fill(0).map((_, j) => {
                    return (
                      <Box
                        changeColorEvent={changeColorEvent}
                        color={colors[i][j].colorCode === 0 ? "blue" : "red"}
                        boxId={colors[i][j].boxId}
                        key={colors[i][j].boxId}
                      />
                    );
                  })}
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
