/** @format */

import axios, { AxiosHeaders } from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders,
} from "axios";
import { HttpStatusCode } from "./http-status-code";
import { API_BASE_URL, AUTHORIZATION_BEARER } from "./url.constant";

// Đóng gói kết quả API
export interface HttpResult<T> {
  isSuccess: boolean;
  status: HttpStatusCode | number;
  statusText: string;
  data: T;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: AxiosRequestConfig;
  error?: unknown;
  errorCode?: string;
}

// Các loại lỗi cơ bản
export enum HttpServiceError {
  ApiError = "API_ERROR",
  NoResponse = "NO_RESPONSE",
  RequestError = "REQUEST_ERROR",
}

export class HttpService {
  private client: AxiosInstance;

  constructor(
    headers: Record<string, string> = { "Accept-Language": "vi" },
    skipToken: boolean = true,
    baseUrl: string = API_BASE_URL
  ) {
    this.client = axios.create({
      headers,
      baseURL: baseUrl,
    });

    // Interceptor chỉ giữ nguyên AxiosResponse/AxiosError
    this.client.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );

    if (!skipToken) {
      this.client.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
          // Dùng AxiosHeaders.from để đảm bảo đúng kiểu AxiosRequestHeaders
          const current =
            config.headers instanceof AxiosHeaders
              ? config.headers
              : AxiosHeaders.from(config.headers ?? {});
          config.headers = AxiosHeaders.from({
            ...current.toJSON(),
            Authorization: AUTHORIZATION_BEARER + token,
          });
        }
        return config;
      });
    }
  }

  private responseHandler<T>(response: AxiosResponse<T>): HttpResult<T> {
    return {
      isSuccess: response.status < 300,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      config: response.config,
    };
  }

  private errorHandler<T>(error: AxiosError): HttpResult<T | null> {
    if (error.response) {
      return {
        isSuccess: false,
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: null,
        config: error.response.config,
        error: error.response.data,
        errorCode: HttpServiceError.ApiError,
      };
    }

    const errorCode = error.request
      ? HttpServiceError.NoResponse
      : HttpServiceError.RequestError;

    return {
      isSuccess: false,
      error,
      errorCode,
      status: 0,
      statusText: "",
      headers: {},
      data: null,
      config: {},
    };
  }

  async get<T>(
    url: string,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<T | null>> {
    try {
      const response = await this.client.get<T>(url, configs);
      return this.responseHandler(response);
    } catch (err) {
      return this.errorHandler<T>(err as AxiosError);
    }
  }

  async post<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse | null>> {
    try {
      const response = await this.client.post<TResponse>(url, data, configs);
      return this.responseHandler(response);
    } catch (err) {
      return this.errorHandler<TResponse>(err as AxiosError);
    }
  }

  async put<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse | null>> {
    try {
      const response = await this.client.put<TResponse>(url, data, configs);
      return this.responseHandler(response);
    } catch (err) {
      return this.errorHandler<TResponse>(err as AxiosError);
    }
  }

  async patch<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse | null>> {
    try {
      const response = await this.client.patch<TResponse>(url, data, configs);
      return this.responseHandler(response);
    } catch (err) {
      return this.errorHandler<TResponse>(err as AxiosError);
    }
  }

  async delete<T>(
    url: string,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<T | null>> {
    try {
      const response = await this.client.delete<T>(url, configs);
      return this.responseHandler(response);
    } catch (err) {
      return this.errorHandler<T>(err as AxiosError);
    }
  }
}
