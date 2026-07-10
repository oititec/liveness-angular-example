import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class CertiFaceSaasService {
    private SERVER_API_URL = environment.apiUrlSaas;

    constructor(private http: HttpClient) { }

    login() {
        const url = `${this.SERVER_API_URL}/api/v1/login`;

        const body = {
            login: localStorage.getItem('login'),
            password: localStorage.getItem('senhaMd5'),
        };

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(url, body, { headers, observe: 'response' });
    }

    createToken(saasBearerToken: any) {
        const url = `${this.SERVER_API_URL}/api/v1/protected/genToken`;

        let nascimento = localStorage.getItem('nascimento');

        if (nascimento == null || nascimento == '') {
            nascimento = '01/01/2001';
        }

        const body = {
            documentNumber: localStorage.getItem('cpf'),
            birthDate: nascimento,
            fullName: localStorage.getItem('nome'),
            processType: "ALT",
            journeyType: 2,
            livenessProvider: "FORTFACE"
        };

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${saasBearerToken}`
        });

        return this.http.post(url, body, { headers, observe: 'response' });
    }

    livenessResolve(saasUuid: any) {
        const url = `${this.SERVER_API_URL}/api/v1/token/${saasUuid}/liveness/resolve`;

        const body = {};

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(url, body, { headers, observe: 'response' });
    }

    initialize(saasUuid: any, deviceRequestInfo: any) {
        const url = `${this.SERVER_API_URL}/api/v1/token/${saasUuid}/liveness/initialize`;

        const body = {
            payload: {
                deviceRequestInfo: deviceRequestInfo,
                externalTransactionId: saasUuid
            }
        }

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(url, body, { headers, observe: 'response' });
    }

    verifyLiveness(saasUuid: any, livenessInfo: any, location: any) {
        const url = `${this.SERVER_API_URL}/api/v1/token/${saasUuid}/liveness/verify`;

        const body = {
            payload: livenessInfo,
            geolocation: {
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
                accuracy: location?.coords.accuracy
            }
        }

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(url, body, { headers, observe: 'response' });
    }
};
