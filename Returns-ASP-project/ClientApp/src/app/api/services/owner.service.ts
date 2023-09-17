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

import { NewOwnerDto } from '../models/new-owner-dto';
import { Owner } from '../models/owner';
import { OwnerRm } from '../models/owner-rm';

@Injectable({ providedIn: 'root' })
export class OwnerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `searchOwner()` */
  static readonly SearchOwnerPath = '/Owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchOwner$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchOwner$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<OwnerRm>>> {
    const rb = new RequestBuilder(this.rootUrl, OwnerService.SearchOwnerPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OwnerRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchOwner$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchOwner$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<OwnerRm>> {
    return this.searchOwner$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OwnerRm>>): Array<OwnerRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchOwner$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<OwnerRm>>> {
    const rb = new RequestBuilder(this.rootUrl, OwnerService.SearchOwnerPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OwnerRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchOwner(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<OwnerRm>> {
    return this.searchOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OwnerRm>>): Array<OwnerRm> => r.body)
    );
  }

  /** Path part for operation `createOwner()` */
  static readonly CreateOwnerPath = '/Owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOwner$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createOwner$Plain$Response(
    params?: {
      body?: NewOwnerDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<NewOwnerDto>> {
    const rb = new RequestBuilder(this.rootUrl, OwnerService.CreateOwnerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewOwnerDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOwner$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createOwner$Plain(
    params?: {
      body?: NewOwnerDto
    },
    context?: HttpContext
  ): Observable<NewOwnerDto> {
    return this.createOwner$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<NewOwnerDto>): NewOwnerDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOwner()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createOwner$Response(
    params?: {
      body?: NewOwnerDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<NewOwnerDto>> {
    const rb = new RequestBuilder(this.rootUrl, OwnerService.CreateOwnerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewOwnerDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOwner$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createOwner(
    params?: {
      body?: NewOwnerDto
    },
    context?: HttpContext
  ): Observable<NewOwnerDto> {
    return this.createOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<NewOwnerDto>): NewOwnerDto => r.body)
    );
  }

  /** Path part for operation `deleteOwner()` */
  static readonly DeleteOwnerPath = '/Owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOwner$Response(
    params?: {
      id?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, OwnerService.DeleteOwnerPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOwner(
    params?: {
      id?: string;
    },
    context?: HttpContext
  ): Observable<void> {
    return this.deleteOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findOwner()` */
  static readonly FindOwnerPath = '/Owner/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOwner$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOwner$Plain$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<OwnerRm>> {
    const rb = new RequestBuilder(this.rootUrl, OwnerService.FindOwnerPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OwnerRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findOwner$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOwner$Plain(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<OwnerRm> {
    return this.findOwner$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<OwnerRm>): OwnerRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOwner$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<OwnerRm>> {
    const rb = new RequestBuilder(this.rootUrl, OwnerService.FindOwnerPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OwnerRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOwner(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<OwnerRm> {
    return this.findOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<OwnerRm>): OwnerRm => r.body)
    );
  }

  /** Path part for operation `updateOwner()` */
  static readonly UpdateOwnerPath = '/Owner/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOwner()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateOwner$Response(
    params: {
      id: string;
      body?: Owner
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, OwnerService.UpdateOwnerPath, 'put');
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
   * To access the full response (for headers, for example), `updateOwner$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateOwner(
    params: {
      id: string;
      body?: Owner
    },
    context?: HttpContext
  ): Observable<void> {
    return this.updateOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
