import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KeycloakService {
  private baseUrl = process.env.KEYCLOAK_BASE_URL;
  private realm = process.env.KEYCLOAK_REALM;
  private clientId = process.env.KEYCLOAK_CLIENT_ID;
  private clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;
  async register(user: any) {
    const url = `${this.baseUrl}admin/realms/${this.realm}/users`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await this.getAdminAccessToken()}`,
    };

    console.log(headers);
    const data = {
      username: user.username,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: user.password,
          temporary: false,
        },
      ],
    };
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await this.getAdminAccessToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      return error;
    }
  }

  async getAdminAccessToken() {
    const url = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const data = new URLSearchParams();
    data.append('client_id', this.clientId);
    data.append('client_secret', this.clientSecret);
    data.append('grant_type', 'client_credentials');

    const response = await axios.post(url, data);
    return response.data.access_token;
  }

  async getrefreshToken() {
    const url = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const data = new URLSearchParams();
    data.append('client_id', this.clientId);
    data.append('client_secret', this.clientSecret);
    data.append('grant_type', 'client_credentials');

    const response = await axios.post(url, data);
    return response.data.access_token;
  }

  async login(username: string, password: string) {
    const url = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const data = new URLSearchParams();
    data.append('client_id', this.clientId);
    data.append('client_secret', this.clientSecret);
    data.append('grant_type', 'password');
    data.append('username', username);
    data.append('password', password);

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.error_description· || 'Login·failed',
        );
      }
      throw new Error('Login failed');
    }
  }
}
