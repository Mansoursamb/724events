/* eslint-disable no-undef */
/* eslint-disable no-console */
import { render, screen, waitFor } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When Slider is created", () => {
  // ✅ Supprime async ici

  beforeEach(() => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockResolvedValue(data);
  });

  it("should display the correct months", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockResolvedValue(data);

    await act(async () => {
      render(
        <DataProvider>
          <Slider />
        </DataProvider>
      );
    });

    screen.debug(); // 🔍 Vérifier le DOM généré
  });

  waitFor(() => {
    expect(screen.getByText("World economic forum")).toBeInTheDocument();
  });

  const februaryElements = screen.getAllByText("février");
  const marchElements = screen.getAllByText("mars");
  const januaryElements = screen.getAllByText("janvier");

  screen.debug(); // Vérifie l'état du DOM après les recherches

  // eslint-disable-next-line no-console
  console.log("📌 Février trouvé :", februaryElements.length);
  console.log("📌 Mars trouvé :", marchElements.length);
  console.log("📌 Janvier trouvé :", januaryElements.length);
  console.log("🚀 Test en cours...");
  process.stdout.write("🚀 Test en cours...\n");

  expect(februaryElements.length).toBeGreaterThan(0);
  expect(marchElements.length).toBeGreaterThan(0);
  expect(januaryElements.length).toBeGreaterThan(0);
});
