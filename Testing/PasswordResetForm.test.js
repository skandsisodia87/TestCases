import { fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import userEvent from "@testing-library/user-event"

// In your own jest-setup.js (or any other name)
import '@testing-library/jest-dom'
import PasswordReset from "../Login/PasswordResetForm"


describe("Password rest form", () => {
    test('on render the component, form fileds should be display', () => {
        render(<Router><PasswordReset /></Router>)
        const password = screen.getByTestId("Password-input1");
        const cpassword = screen.getByTestId("Password-input2");
        const button = screen.getByRole('button')
        expect(password).toHaveAttribute("id", "password1")
        expect(cpassword).toHaveAttribute("id", "password2")
        expect(button).toHaveAttribute("type", "submit")
    })

    // test("onclick Update button", async () => {
    //     render(<Router><PasswordReset /></Router>)
    //     const button = screen.getByRole("button")
    //     // console.log(button, "button")
    //     const Response = fireEvent.click(button)
    //     // expect(Response).toEqual()
    //     // console.log(window.location.href)
    // })

    test("with empty fileds, required error should be display", async () => {
        render(<Router><PasswordReset /></Router>)
        const buttonElement = screen.getByRole("button")
        await userEvent.click(buttonElement);
        const res = screen.queryAllByText("Required")
        expect(res.length).not.toBe(0);
    })

    test("required error should not be display if it should contain values", async () => {
        const { testScreen } = render(<Router><PasswordReset /></Router>)
        const password = screen.getByTestId("Password-input1");
        const cpassword = screen.getByTestId("Password-input2");
        fireEvent.change(password, { target: { value: 'xyz' } })
        fireEvent.blur(password)
        fireEvent.change(cpassword, { target: { value: 'xyz' } })
        fireEvent.blur(cpassword)
        console.log(password, "password")
        // const buttonElement = screen.getByRole("button")
        // await userEvent.click(buttonElement)

        console.log(testScreen, "{ exact: false }")
        // console.log(res, "response")
        // expect(res.length).toBe(0);
    })
})