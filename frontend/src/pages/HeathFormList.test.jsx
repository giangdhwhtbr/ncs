import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HealthFormList from "./HeathFormList";
const { handleFetchWithCredentials } = require("../helper/fetch");
import { message } from "antd";

jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  return {
    ...antd,
    message: {
      error: jest.fn(),
    },
  };
});

describe("HealthFormList", () => {
  beforeEach(() => {
    handleFetchWithCredentials.mockClear();
    message.error.mockClear();
  });

  test("renders HealthFormList component", () => {
    handleFetchWithCredentials.mockResolvedValueOnce({
      results: [],
      limit: 10,
      totalResults: 0,
      page: 1,
    });
    render(<HealthFormList />);
    expect(screen.getByText("Health Form List")).toBeInTheDocument();
  });

  test("fetches data on initial render", async () => {
    handleFetchWithCredentials.mockResolvedValueOnce({
      results: [],
      limit: 10,
      totalResults: 0,
      page: 1,
    });

    render(<HealthFormList />);

    await waitFor(() => {
      expect(handleFetchWithCredentials).toHaveBeenCalledWith("/health-forms");
    });
  });

  test("displays error message on fetch failure", async () => {
    handleFetchWithCredentials.mockRejectedValueOnce(new Error("Fetch error"));
    render(<HealthFormList />);
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith("Fetch error");
    });
  });

  test("searches by name", async () => {
    handleFetchWithCredentials.mockResolvedValue({
      results: [],
      limit: 10,
      totalResults: 0,
      page: 1,
    });

    render(<HealthFormList />);

    const searchInput = screen.getByPlaceholderText("Search by name");
    fireEvent.change(searchInput, { target: { value: "John" } });

    await waitFor(() => {
      expect(handleFetchWithCredentials).toHaveBeenCalledWith(
        "/health-forms?name=John"
      );
    });
  });

  test("opens and closes modal", () => {
    handleFetchWithCredentials.mockResolvedValueOnce({
      results: [],
      limit: 10,
      totalResults: 0,
      page: 1,
    });

    render(<HealthFormList />);

    const createButton = screen.getByTitle("Create");
    fireEvent.click(createButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
