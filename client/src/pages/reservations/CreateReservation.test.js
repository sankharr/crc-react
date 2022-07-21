import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CreateReservation from "./createReservation";
// import mockFetch from "./mocks/mockFetch";

// beforeEach(() => {
//    jest.spyOn(window, "fetch").mockImplementation(mockFetch);
// })

// afterEach(() => {
//    jest.restoreAllMocks();
// });

test("Creating a reservation", async () => {
  render(
    <BrowserRouter>
      <CreateReservation />
    </BrowserRouter>
  );

  expect(screen.getByText("Create Reservation")).toBeInTheDocument();
  //    .toHaveTextContent(/Doggy Directory/);
  expect(screen.getByTestId("itemName")).toBeInTheDocument();
  //    expect(await screen.findByRole("option", { name: "husky"})).toBeInTheDocument()
  //    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  //    expect(screen.getByRole("img")).toBeInTheDocument();
});
