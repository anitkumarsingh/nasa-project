import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Arwes,
  SoundsProvider,
  ThemeProvider,
  createSounds,
  createTheme,
} from "arwes";
import AppLayout from "./pages/AppLayout";

import { theme, resources, sounds } from "./settings";

const App = () => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <SoundsProvider sounds={createSounds(sounds)}>
        <Arwes
          animate
          background={resources.background.large}
          pattern={resources.pattern}
        >
          {(anim) => (
            <BrowserRouter>
              <Header />
              <Routes>
                <AppLayout show={anim.entered} />
              </Routes>
            </BrowserRouter>
          )}
        </Arwes>
      </SoundsProvider>
    </ThemeProvider>
  );
};

export default App;
