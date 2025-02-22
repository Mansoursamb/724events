import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

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
  beforeEach(() => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
  });

  it("should display the correct months", async () => {
    await act(async () => {
      render(
        <DataProvider>
          <Slider />
        </DataProvider>
      );
    });

    // Attendre que le contenu soit affiché
    await waitFor(() => {
      expect(screen.getByText("World economic forum")).toBeInTheDocument();
    });

    // Vérifier que les mois sont bien affichés au moins une fois
    const februaryElements = await screen.findAllByText(
      (content, element) =>
        element?.tagName.toLowerCase() === "div" &&
        content.includes(getMonth(new Date("2022-02-29T20:28:45.744Z")))
    );
    const marchElements = await screen.findAllByText(
      (content, element) =>
        element?.tagName.toLowerCase() === "div" &&
        content.includes(getMonth(new Date("2022-03-29T20:28:45.744Z")))
    );
    const januaryElements = await screen.findAllByText(
      (content, element) =>
        element?.tagName.toLowerCase() === "div" &&
        content.includes(getMonth(new Date("2022-01-29T20:28:45.744Z")))
    );

    expect(februaryElements.length).toBeGreaterThan(0);
    expect(marchElements.length).toBeGreaterThan(0);
    expect(januaryElements.length).toBeGreaterThan(0);
  });
});
