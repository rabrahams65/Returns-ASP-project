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

import { Fault } from '../models/fault';
import { FaultRm } from '../models/fault-rm';
import { NewFaultDto } from '../models/new-fault-dto';

@Injectable({ providedIn: 'root' })
export class FaultService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `searchFault()` */
  static readonly SearchFaultPath = '/Fault';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFault$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFault$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<FaultRm>>> {
    const rb = new RequestBuilder(this.rootUrl, FaultService.SearchFaultPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FaultRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFault$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFault$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<FaultRm>> {
    return this.searchFault$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FaultRm>>): Array<FaultRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchFault()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFault$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<FaultRm>>> {
    const rb = new RequestBuilder(this.rootUrl, FaultService.SearchFaultPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FaultRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchFault$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchFault(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<FaultRm>> {
    return this.searchFault$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FaultRm>>): Array<FaultRm> => r.body)
    );
  }

  /** Path part for operation `createFault()` */
  static readonly CreateFaultPath = '/Fault';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createFault$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createFault$Plain$Response(
    params?: {
      body?: NewFaultDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<NewFaultDto>> {
    const rb = new RequestBuilder(this.rootUrl, FaultService.CreateFaultPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewFaultDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createFault$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createFault$Plain(
    params?: {
      body?: NewFaultDto
    },
    context?: HttpContext
  ): Observable<NewFaultDto> {
    return this.createFault$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<NewFaultDto>): NewFaultDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createFault()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createFault$Response(
    params?: {
      body?: NewFaultDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<NewFaultDto>> {
    const rb = new RequestBuilder(this.rootUrl, FaultService.CreateFaultPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewFaultDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createFault$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createFault(
    params?: {
      body?: NewFaultDto
    },
    context?: HttpContext
  ): Observable<NewFaultDto> {
    return this.createFault$Response(params, context).pipe(
      map((r: StrictHttpResponse<NewFaultDto>): NewFaultDto => r.body)
    );
  }

  /** Path part for operation `deleteFault()` */
  static readonly DeleteFaultPath = '/Fault';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFault()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFault$Response(
    params?: {
      id?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, FaultService.DeleteFaultPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteFault$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFault(
    params?: {
      id?: string;
    },
    context?: HttpContext
  ): Observable<void> {
    return this.deleteFault$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findFault()` */
  static readonly FindFaultPath = '/Fault/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFault$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFault$Plain$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<FaultRm>> {
    const rb = new RequestBuilder(this.rootUrl, FaultService.FindFaultPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FaultRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFault$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFault$Plain(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<FaultRm> {
    return this.findFault$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FaultRm>): FaultRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findFault()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFault$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<FaultRm>> {
    const rb = new RequestBuilder(this.rootUrl, FaultService.FindFaultPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FaultRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findFault$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findFault(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<FaultRm> {
    return this.findFault$Response(params, context).pipe(
      map((r: StrictHttpResponse<FaultRm>): FaultRm => r.body)
    );
  }

  /** Path part for operation `updateFault()` */
  static readonly UpdateFaultPath = '/Fault/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateFault()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateFault$Response(
    params: {
      id: string;
      body?: Fault
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, FaultService.UpdateFaultPath, 'put');
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
   * To access the full response (for headers, for example), `updateFault$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateFault(
    params: {
      id: string;
      body?: Fault
    },
    context?: HttpContext
  ): Observable<void> {
    return this.updateFault$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
