/** @format */

import axios, {
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

  private responseHandler = (response: AxiosResponse): HttpResult<any> => {
    return {
      isSuccess: response.status < 300,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data || null,
      config: response.config,
    };
  };

  private errorHandler = (error: AxiosError): HttpResult<null> => {
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
  };

  constructor(
    headers: Record<string, string> = { "Accept-Language": "vi" },
    skipToken: boolean = true,
    baseUrl: string = API_BASE_URL
  ) {
    this.client = axios.create({
      headers,
      baseURL: baseUrl,
    });

    this.client.interceptors.response.use(
      this.responseHandler,
      this.errorHandler
    );

    if (!skipToken) {
      this.client.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = AUTHORIZATION_BEARER + token;
        }
        return config;
      });
    }
  }

  get<T>(url: string, configs?: AxiosRequestConfig): Promise<HttpResult<T>> {
    return this.client.get(url, configs) as Promise<HttpResult<T>>;
  }

  post<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse>> {
    return this.client.post(url, data, configs) as Promise<
      HttpResult<TResponse>
    >;
  }

  put<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse>> {
    return this.client.put(url, data, configs) as Promise<
      HttpResult<TResponse>
    >;
  }

  patch<TData, TResponse>(
    url: string,
    data: TData,
    configs?: AxiosRequestConfig
  ): Promise<HttpResult<TResponse>> {
    return this.client.patch(url, data, configs) as Promise<
      HttpResult<TResponse>
    >;
  }

  delete<T>(url: string, configs?: AxiosRequestConfig): Promise<HttpResult<T>> {
    return this.client.delete(url, configs) as Promise<HttpResult<T>>;
  }
}
