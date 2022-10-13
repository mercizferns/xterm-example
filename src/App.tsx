import React from "react";
import { useEffect } from "react";
import { Terminal } from "xterm";

import "./styles.css";

export default function App() {
  useEffect(() => {
    let term = new Terminal({
      convertEol: true,
      fontFamily: `'Fira Mono', monospace`,
      fontSize: 15,
      fontWeight: 900
      // rendererType: "dom" // default is canvas
    });

    //Styling
    term.setOption("theme", {
      background: "black",
      foreground: "white"
    });

    term.open(document.getElementById("xterm"), false);
    var shellprompt = "$ ";

    const prompt = () => {
      term.write("\r\n" + shellprompt);
    };

    term.writeln("Welcome to xterm.js");
    term.writeln("Type some keys and commands to play around.");
    term.writeln("");
    prompt();
    term.setOption("cursorBlink", true);

    term.onKey((key) => {
      const char = key.domEvent.key;
      if (char === "Enter") {
        prompt();
      } else if (char === "Backspace") {
        term.write("\b \b");
      } else {
        term.write(char);
      }
    });
  }, []);

  return (
    <div className="App">
      <div id="xterm" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}
