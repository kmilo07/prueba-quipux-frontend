import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, finalize, throwError } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor{

    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6InF1aXB1eCIsImlhdCI6MTcwNjk0OTE0NSwiZXhwIjoxNzA4MjQ1MTQ1fQ.v0Vnst4fbLt9aILX9RA6gG_VbcoISdRNPFY__FEY_Q0';
        let intReq = req.clone({headers: req.headers.set('Authorization','Bearer '+token)});
        return next.handle(intReq).pipe(
            catchError((error: HttpErrorResponse) => {
              console.log(error);
              let errorMessage = 'Error desconocido';
      
              if (error.error instanceof ErrorEvent) {
                // Error del lado del cliente
                errorMessage = `Error: ${error.error?.message}`;
                alert({text: errorMessage});
              } else {
                // Error del lado del servidor
                if (error.status == 403 && error.url?.includes('/login')) {
                  alert({title: 'No se pudo iniciar sesión 😢', text: 'Nombre de usuario o contraseña incorrectos'});
                } else {
                  alert({text: error.error?.humanMessage});
                }
              }
      
              return throwError(errorMessage);
            })
          );
    }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}];