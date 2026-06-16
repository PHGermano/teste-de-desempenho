import http from 'k6/http';
import { check } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 50 }, // ramp-up de 0 para 50 VUs
        { duration: '2m', target: 50 }, // mantém 50 VUs por 2 minutos
        { duration: '30s', target: 0 }, // ramp-down para 0 VUs
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% das requisições devem ser respondidas em menos de 500ms
        http_req_failed: ['rate<0.01'], // Menos de 1% das requisições devem falhar
    },
};

export default function () {
    const response = http.post(
        'http://localhost:3000/checkout/simple'
    );

    check(response, {
        'status é 201': (r) => r.status === 201,
    });
}