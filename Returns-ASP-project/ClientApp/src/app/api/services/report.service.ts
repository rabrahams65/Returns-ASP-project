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


@Injectable({ providedIn: 'root' })
export class ReportService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getReport()` */
  static readonly GetReportPath = '/{reportName}/{reportType}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getReport()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReport$Response(
    params: {
      reportName: string;
      reportType: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, ReportService.GetReportPath, 'get');
    if (params) {
      rb.path('reportName', params.reportName, {});
      rb.path('reportType', params.reportType, {});
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
   * To access the full response (for headers, for example), `getReport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReport(
    params: {
      reportName: string;
      reportType: string;
    },
    context?: HttpContext
  ): Observable<void> {
    return this.getReport$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
