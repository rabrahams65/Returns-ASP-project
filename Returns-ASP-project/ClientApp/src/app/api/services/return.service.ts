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

import { ReturnDto } from '../models/return-dto';
import { ReturnRm } from '../models/return-rm';

@Injectable({ providedIn: 'root' })
export class ReturnService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `searchReturn()` */
  static readonly SearchReturnPath = '/Return';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchReturn$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchReturn$Plain$Response(
    params?: {
      Page?: number;
      Size?: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<ReturnRm>>> {
    const rb = new RequestBuilder(this.rootUrl, ReturnService.SearchReturnPath, 'get');
    if (params) {
      rb.query('Page', params.Page, {});
      rb.query('Size', params.Size, {});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ReturnRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchReturn$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchReturn$Plain(
    params?: {
      Page?: number;
      Size?: number;
    },
    context?: HttpContext
  ): Observable<Array<ReturnRm>> {
    return this.searchReturn$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ReturnRm>>): Array<ReturnRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchReturn()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchReturn$Response(
    params?: {
      Page?: number;
      Size?: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<ReturnRm>>> {
    const rb = new RequestBuilder(this.rootUrl, ReturnService.SearchReturnPath, 'get');
    if (params) {
      rb.query('Page', params.Page, {});
      rb.query('Size', params.Size, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ReturnRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchReturn$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchReturn(
    params?: {
      Page?: number;
      Size?: number;
    },
    context?: HttpContext
  ): Observable<Array<ReturnRm>> {
    return this.searchReturn$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ReturnRm>>): Array<ReturnRm> => r.body)
    );
  }

  /** Path part for operation `createReturnReturn()` */
  static readonly CreateReturnReturnPath = '/Return';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createReturnReturn$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createReturnReturn$Plain$Response(
    params?: {
      body?: ReturnDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ReturnRm>> {
    const rb = new RequestBuilder(this.rootUrl, ReturnService.CreateReturnReturnPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReturnRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createReturnReturn$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createReturnReturn$Plain(
    params?: {
      body?: ReturnDto
    },
    context?: HttpContext
  ): Observable<ReturnRm> {
    return this.createReturnReturn$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReturnRm>): ReturnRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createReturnReturn()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createReturnReturn$Response(
    params?: {
      body?: ReturnDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ReturnRm>> {
    const rb = new RequestBuilder(this.rootUrl, ReturnService.CreateReturnReturnPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReturnRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createReturnReturn$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createReturnReturn(
    params?: {
      body?: ReturnDto
    },
    context?: HttpContext
  ): Observable<ReturnRm> {
    return this.createReturnReturn$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReturnRm>): ReturnRm => r.body)
    );
  }

  /** Path part for operation `deleteReturnReturn()` */
  static readonly DeleteReturnReturnPath = '/Return';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteReturnReturn()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deleteReturnReturn$Response(
    params?: {
      body?: ReturnDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, ReturnService.DeleteReturnReturnPath, 'delete');
    if (params) {
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
   * To access the full response (for headers, for example), `deleteReturnReturn$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deleteReturnReturn(
    params?: {
      body?: ReturnDto
    },
    context?: HttpContext
  ): Observable<void> {
    return this.deleteReturnReturn$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findReturn()` */
  static readonly FindReturnPath = '/Return/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findReturn$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findReturn$Plain$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ReturnRm>> {
    const rb = new RequestBuilder(this.rootUrl, ReturnService.FindReturnPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReturnRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findReturn$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findReturn$Plain(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<ReturnRm> {
    return this.findReturn$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReturnRm>): ReturnRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findReturn()` instead.
   *
   * This method doesn't expect any request body.
   */
  findReturn$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ReturnRm>> {
    const rb = new RequestBuilder(this.rootUrl, ReturnService.FindReturnPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReturnRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findReturn$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findReturn(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<ReturnRm> {
    return this.findReturn$Response(params, context).pipe(
      map((r: StrictHttpResponse<ReturnRm>): ReturnRm => r.body)
    );
  }

  /** Path part for operation `updateReturnReturn()` */
  static readonly UpdateReturnReturnPath = '/Return/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateReturnReturn()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateReturnReturn$Response(
    params: {
      id: string;
      body?: ReturnRm
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, ReturnService.UpdateReturnReturnPath, 'put');
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
   * To access the full response (for headers, for example), `updateReturnReturn$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateReturnReturn(
    params: {
      id: string;
      body?: ReturnRm
    },
    context?: HttpContext
  ): Observable<void> {
    return this.updateReturnReturn$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
