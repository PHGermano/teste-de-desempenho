import http from 'k6/http';
import { check } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 10 },   // ramp-up inicial suave
        { duration: '10s', target: 300 },  // pico súbito
        { duration: '1m', target: 300 },   // manteendo o pico por um tempo
        { duration: '10s', target: 10 },   // ramp-down rápido
    ],
};

export default function () {
    const response = http.post(
        'http://localhost:3000/checkout/simple'
    );

    check(response, {
        'status é 201': (r) => r.status === 201,
    });
}