import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HealthFormDeclaration from "./HealthFormDeclaration";
import { handleFetch } from "../helper/fetch";
import { message } from "antd";

jest.mock("../helper/fetch");
jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  return {
    ...antd,
    message: {
      success: jest.fn(),
      error: jest.fn(),
    },
  };
});

describe("HealthFormDeclaration", () => {
  const onSuccessMock = jest.fn();

  beforeEach(() => {
    handleFetch.mockClear();
    message.success.mockClear();
    message.error.mockClear();
    onSuccessMock.mockClear();
  });

  test("renders form fields correctly", () => {
    render(<HealthFormDeclaration onSuccess={onSuccessMock} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Temperature/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cough/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sore Throat/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Loss of Smell/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fever/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Breathing Difficulty/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Body Aches/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Headache/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fatigue/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Diarrhea/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Runny Nose/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Contact with Covid Patient/i)
    ).toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    handleFetch.mockResolvedValueOnce({});

    render(<HealthFormDeclaration onSuccess={onSuccessMock} />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Temperature/i), {
      target: { value: 37 },
    });
    fireEvent.click(screen.getByLabelText(/Cough/i));

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(handleFetch).toHaveBeenCalledWith("/health-forms", {
        method: "POST",
        body: JSON.stringify({
          name: "John Doe",
          temperature: 37,
          cough: true,
          soreThroat: false,
          lossOfSmell: false,
          fever: false,
          breathingDifficulty: false,
          bodyAches: false,
          headache: false,
          fatigue: false,
          diarrhea: false,
          runnyNose: false,
          contactWithCovidPatient: false,
        }),
      });
    });

    expect(message.success).toHaveBeenCalledWith(
      "Health Declaration Form submitted successfully!"
    );
    expect(onSuccessMock).toHaveBeenCalled();
  });

  test("handles form submission error", async () => {
    handleFetch.mockRejectedValueOnce(
      new Error(
        "You have already submitted a health declaration form in the last 24 hours"
      )
    );

    render(<HealthFormDeclaration onSuccess={onSuccessMock} />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Temperature/i), {
      target: { value: 37 },
    });
    fireEvent.click(screen.getByLabelText(/Cough/i));

    fireEvent.click(screen.getByText(/Submit/i));
    await waitFor(() => {
      expect(handleFetch).toHaveBeenCalled();
    });
    expect(message.error).toHaveBeenCalledWith(
      "You have already submitted a health declaration form in the last 24 hours"
    );
    expect(onSuccessMock).not.toHaveBeenCalled();
  });
});
