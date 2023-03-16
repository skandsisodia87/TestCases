import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import Login from "../Login/LoginForm"
import userEvent from "@testing-library/user-event"
// In your own jest-setup.js (or any other name)
import '@testing-library/jest-dom'

// In jest.config.js add (if you haven't already)
// setupFilesAfterEnv: ['<rootDir>/jest-setup.js']


describe("login component", () => {

    test("on render the component, form fileds should be display", () => {
        render(<Router><Login /></Router>)
        const email = screen.getByTestId("email-input");
        const password = screen.getByTestId('password-input')
        const button = screen.getByRole('button')
        const forgetPassword = screen.getByRole("link")
        expect(password).toHaveAttribute("id", "password")
        expect(button).toHaveAttribute("type", "submit")
        expect(email).toHaveAttribute("type", "text");
        expect(forgetPassword).toHaveAttribute("href", "/resetpassword");
    })

    test("on render form, fileds are empty", () => {
        render(<Router><Login /></Router>)
        const email = screen.getByTestId("email-input");
        const password = screen.getByTestId('password-input')
        // fireEvent.change(email, { target: { value: '' } })
        expect(email).toHaveAttribute("value", "")
        expect(password).toHaveAttribute("value", "")
    })

    test("with empty fileds, required error should be display", async () => {
        render(<Router><Login /></Router>)
        const buttonElement = screen.getByRole("button")
        await userEvent.click(buttonElement);
        const res = screen.queryAllByText("Required")
        expect(res.length).not.toBe(0);
    })

    test("required error should not be display if it should contain values", async () => {
        render(<Router><Login /></Router>)
        const email = screen.getByTestId("email-input");
        const password = screen.getByTestId('password-input')
        fireEvent.change(email, { target: { value: 'xyz' } })
        fireEvent.change(password, { target: { value: 'xyz' } })
        const buttonElement = screen.getByRole("button")
        await userEvent.click(buttonElement)
        const res = screen.queryAllByText("Required")
        expect(res.length).toBe(0);
    })

    test("onclick forget password text, then forget form will display", () => {
        render(<Router><Login /></Router>)
        const buttonElement = screen.getByRole("link")
        expect(buttonElement.href).toEqual("http://localhost/resetpassword")
    })

})
