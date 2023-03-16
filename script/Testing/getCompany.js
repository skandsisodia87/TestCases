import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '1s',
};

export default function () {
    const param = {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzJkMWUxZWMwMTZhZTVhOTkwYTRjYSIsImlhdCI6MTY3ODg3MDgwMiwiZXhwIjoxNjc4OTU3MjAyfQ.pAHhnXvUA-p_B8V6AkutiwFNLf6m8dGh3dDTrwv1CTw`
        }
    }
    const res = http.get('http://localhost:5000/company/get', param);
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}