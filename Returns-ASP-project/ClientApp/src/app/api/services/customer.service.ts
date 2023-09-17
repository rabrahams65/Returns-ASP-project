/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';

import { Customer } from '../models/customer';
import { CustomerRm } from '../models/customer-rm';
import { NewCustomerDto } from '../models/new-customer-dto';

@Injectable({ providedIn: 'root' })
export class CustomerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `searchCustomer()` */
  static readonly SearchCustomerPath = '/Customer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchCustomer$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchCustomer$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<CustomerRm>>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.SearchCustomerPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CustomerRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchCustomer$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchCustomer$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<CustomerRm>> {
    return this.searchCustomer$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CustomerRm>>): Array<CustomerRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchCustomer$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<CustomerRm>>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.SearchCustomerPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CustomerRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchCustomer(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<CustomerRm>> {
    return this.searchCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CustomerRm>>): Array<CustomerRm> => r.body)
    );
  }

  /** Path part for operation `createReturnCustomer()` */
  static readonly CreateReturnCustomerPath = '/Customer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createReturnCustomer$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createReturnCustomer$Plain$Response(
    params?: {
      body?: NewCustomerDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<NewCustomerDto>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CreateReturnCustomerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewCustomerDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createReturnCustomer$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createReturnCustomer$Plain(
    params?: {
      body?: NewCustomerDto
    },
    context?: HttpContext
  ): Observable<NewCustomerDto> {
    return this.createReturnCustomer$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<NewCustomerDto>): NewCustomerDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createReturnCustomer()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createReturnCustomer$Response(
    params?: {
      body?: NewCustomerDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<NewCustomerDto>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CreateReturnCustomerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewCustomerDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createReturnCustomer$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createReturnCustomer(
    params?: {
      body?: NewCustomerDto
    },
    context?: HttpContext
  ): Observable<NewCustomerDto> {
    return this.createReturnCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<NewCustomerDto>): NewCustomerDto => r.body)
    );
  }

  /** Path part for operation `deleteCustomer()` */
  static readonly DeleteCustomerPath = '/Customer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCustomer$Response(
    params?: {
      id?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.DeleteCustomerPath, 'delete');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: '*/*', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCustomer(
    params?: {
      id?: string;
    },
    context?: HttpContext
  ): Observable<void> {
    return this.deleteCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findCustomer()` */
  static readonly FindCustomerPath = '/Customer/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCustomer$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCustomer$Plain$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<CustomerRm>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.FindCustomerPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomerRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCustomer$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCustomer$Plain(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<CustomerRm> {
    return this.findCustomer$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CustomerRm>): CustomerRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCustomer$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<CustomerRm>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.FindCustomerPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomerRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCustomer(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<CustomerRm> {
    return this.findCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<CustomerRm>): CustomerRm => r.body)
    );
  }

  /** Path part for operation `updateCustomer()` */
  static readonly UpdateCustomerPath = '/Customer/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCustomer()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateCustomer$Response(
    params: {
      id: string;
      body?: Customer
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.UpdateCustomerPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: '*/*', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCustomer$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateCustomer(
    params: {
      id: string;
      body?: Customer
    },
    context?: HttpContext
  ): Observable<void> {
    return this.updateCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
