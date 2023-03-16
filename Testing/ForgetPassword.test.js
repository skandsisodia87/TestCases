import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import RestPasswordForm from "../Login/ForgetPasswordForm"
import userEvent from "@testing-library/user-event"

// In your own jest-setup.js (or any other name)
import '@testing-library/jest-dom'


describe("Forget Password component", () => {

    test("on render the component, form fileds should be display", () => {
        render(<Router><RestPasswordForm /></Router>)
        const email = screen.getByTestId("Username-input");
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute("type", "submit")
        expect(email).toHaveAttribute("type", "text");

    })

    test("with empty fileds, required error should be display", async () => {
        render(<Router><RestPasswordForm /></Router>)
        const buttonElement = screen.getByRole("button")
        await userEvent.click(buttonElement);
        const res = screen.queryAllByText("Required")
        expect(res.length).not.toBe(0);
    })

    test("required error should not be display if it should contain values", async () => {
        render(<Router><RestPasswordForm /></Router>)
        const username = screen.getByTestId("Username-input");
        fireEvent.change(username, { target: { value: 'xyz' } })
        const buttonElement = screen.getByRole("button")
        await userEvent.click(buttonElement);
        const res = screen.queryAllByText("Required")
        expect(res.length).toBe(0);
    })

    test("onclick forget password text, then forget form will display", () => {
        render(<Router><RestPasswordForm /></Router>)
        const buttonElement = screen.getByRole("link")
        expect(buttonElement.href).toEqual("http://localhost/login")
    })

})