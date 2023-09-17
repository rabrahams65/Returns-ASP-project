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

import { NewProductDto } from '../models/new-product-dto';
import { Product } from '../models/product';
import { ProductRm } from '../models/product-rm';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `searchProduct()` */
  static readonly SearchProductPath = '/Product';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchProduct$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchProduct$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<ProductRm>>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.SearchProductPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchProduct$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchProduct$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<ProductRm>> {
    return this.searchProduct$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProductRm>>): Array<ProductRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchProduct$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<ProductRm>>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.SearchProductPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ProductRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchProduct(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<ProductRm>> {
    return this.searchProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProductRm>>): Array<ProductRm> => r.body)
    );
  }

  /** Path part for operation `createProduct()` */
  static readonly CreateProductPath = '/Product';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProduct$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createProduct$Plain$Response(
    params?: {
      body?: NewProductDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<NewProductDto>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.CreateProductPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewProductDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createProduct$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createProduct$Plain(
    params?: {
      body?: NewProductDto
    },
    context?: HttpContext
  ): Observable<NewProductDto> {
    return this.createProduct$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<NewProductDto>): NewProductDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProduct()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createProduct$Response(
    params?: {
      body?: NewProductDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<NewProductDto>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.CreateProductPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewProductDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createProduct$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createProduct(
    params?: {
      body?: NewProductDto
    },
    context?: HttpContext
  ): Observable<NewProductDto> {
    return this.createProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<NewProductDto>): NewProductDto => r.body)
    );
  }

  /** Path part for operation `deleteProduct()` */
  static readonly DeleteProductPath = '/Product';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProduct$Response(
    params?: {
      id?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.DeleteProductPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProduct(
    params?: {
      id?: string;
    },
    context?: HttpContext
  ): Observable<void> {
    return this.deleteProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `findProduct()` */
  static readonly FindProductPath = '/Product/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findProduct$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  findProduct$Plain$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ProductRm>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.FindProductPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findProduct$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findProduct$Plain(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<ProductRm> {
    return this.findProduct$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductRm>): ProductRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findProduct()` instead.
   *
   * This method doesn't expect any request body.
   */
  findProduct$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ProductRm>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.FindProductPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findProduct$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findProduct(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<ProductRm> {
    return this.findProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductRm>): ProductRm => r.body)
    );
  }

  /** Path part for operation `updateProduct()` */
  static readonly UpdateProductPath = '/Product/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProduct()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateProduct$Response(
    params: {
      id: string;
      body?: Product
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.UpdateProductPath, 'put');
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
   * To access the full response (for headers, for example), `updateProduct$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateProduct(
    params: {
      id: string;
      body?: Product
    },
    context?: HttpContext
  ): Observable<void> {
    return this.updateProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
