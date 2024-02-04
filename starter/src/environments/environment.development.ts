// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200',
  API_URL_TODOS_PERSONA_JAVA :'http://localhost:9096/file/get',
    API_URL_TODOS_ADD_PERSONA_JAVA :'http://localhost:9096/file/save',
    API_URL_TODOS_EDIT_PERSONA_JAVA :'http://localhost:9096/file/update',
    API_URL_TODOS_DELETE_PERSONA_JAVA :'http://localhost:9096/file/delete/',
    API_URL_TODOS_FINDBYID_PERSONA_JAVA :'http://localhost:9096/file/',

    API_URL_TODOS_PRODUCTO_JAVA :'http://localhost:9093/producto/get',
    API_URL_TODOS_ADD_PRODUCTO_JAVA :'http://localhost:9093/producto/add',
    API_URL_TODOS_PRODUCTO_BYID_JAVA :'http://localhost:9093/producto/get',
    API_URL_TODOS_EDIT_PRODUCTO_JAVA :'http://localhost:9093/producto/update',
    API_URL_TODOS_DELETE_PRODUCTO_JAVA :'http://localhost:9093/producto/delete/',
    API_URL_TODOS_FINDBYID_PRODUCTO_JAVA :'http://localhost:9093/producto/',
    AUTH_API_JAVA :'http://localhost:9096/api/auth/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
