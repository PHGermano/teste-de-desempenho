import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1, // 1 usuário virtual
    duration: '30s', // duração total do teste
};

export default function () {
    const response = http.get('http://localhost:3000/health');

    check(response, {
        'status é 200': (r) => r.status === 200,
    });
}