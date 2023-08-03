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
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<ReturnRm>>> {
    const rb = new RequestBuilder(this.rootUrl, ReturnService.SearchReturnPath, 'get');
    if (params) {
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
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<ReturnRm>>> {
    const rb = new RequestBuilder(this.rootUrl, ReturnService.SearchReturnPath, 'get');
    if (params) {
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
    },
    context?: HttpContext
  ): Observable<Array<ReturnRm>> {
    return this.searchReturn$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ReturnRm>>): Array<ReturnRm> => r.body)
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

}
