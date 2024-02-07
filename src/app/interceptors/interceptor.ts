import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "../service/auth.service";

@Injectable()
export class Interceptor implements HttpInterceptor{

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        let intReq = req;
        if(token){
          intReq = req.clone({headers: req.headers.set('Authorization','Bearer '+token)});
        }
        return next.handle(intReq).pipe(
            catchError((error: HttpErrorResponse) => {
              console.log('error',error);
              
              let errorMessage = 'Error desconocido';
              if (error.error) {
                errorMessage = `Error: ${error.error?.mensaje}`;
                alert(errorMessage);
              } else {
                // Error del lado del servidor
                if (error.status == 403 && error.url?.includes('/login')) {
                  alert('No se pudo iniciar sesión 😢');
                }
                else if(error.status == 403){
                  alert('No tiene permiso para realizar esta acción')
                } 
                else {
                  alert(error.error?.mensaje);
                }
              }
              return throwError(errorMessage);
            })
          );
    }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}];