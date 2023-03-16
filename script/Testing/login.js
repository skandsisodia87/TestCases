import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    vus: 1,
    duration: '1s',
};

export default function () {
    const payload = {
        userNameOrEmail: "skand",
        password: "Skand@123"
    }
    const res = http.post('http://localhost:5000/auth/login', payload);
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
