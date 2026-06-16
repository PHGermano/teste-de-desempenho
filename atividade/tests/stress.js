import http from 'k6/http';
import { check } from 'k6';

export const options = {
    stages: [
        { duration: '2m', target: 200 }, // ramp-up de 0 para 200 VUs
        { duration: '2m', target: 500 }, // ramp-up 200 → 500 VUs
        { duration: '2m', target: 1000 }, // ramp-up 500 → 1000 VUs
    ],
    thresholds: {
        http_req_failed: ['rate<0.5'], // Procurar onde começa a dar problemas (50% de falhas ou mais)
    },
};

export default function () {
    const response = http.post(
        'http://localhost:3000/checkout/crypto'
    );

    check(response, {
        'status é 201': (r) => r.status === 201,
    });
}