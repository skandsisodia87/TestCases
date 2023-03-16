import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    vus: 1,
    duration: '1s',
};

export default function () {
    const payload = {
        username: "averyAdmin"
    }
    const res = http.post('http://localhost:5000/auth/forget-password', payload);
    console.log(JSON.stringify(res))
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
