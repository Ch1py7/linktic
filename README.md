# Prueba Linktic

## Descripción
Este proyecto es una prueba técnica para Linktic y consiste en una aplicación web de e-commerce. Los administradores podrán visualizar, crear, editar y eliminar productos y usuarios, así como gestionar los envíos de las órdenes. Los usuarios comunes podrán registrarse sin intervención de un administrador, agregar productos al carrito y realizar compras.

## Tecnologías
- Frontend: Sveltekit, TailwindCSS
- Backend: Node.js, Express.js
- Base de datos: PostgreSQL (gestionado con Supabase)

## Instalación
Para este proyecto se utilizó el monorepo de pnpm. Por lo que para realizar una instalación simple, se debe tener instalado pnpm. Luego, se debe ejecutar el siguiente comando en la raíz del proyecto:
```bash
pnpm install
```

En caso de no tener pnpm instalado, entrar con la consola a la carpeta `apps/frontend` y `apps/backend` de forma individual y ejecutar el comando de instalación de tu gestor de paquetes preferido.

## Ejecución
Para ejecutar el proyecto de forma local, se debe ejecutar el siguiente comando en la raíz de los proyectos:
```bash
cd apps/backend
pnpm tscs
```
```bash
cd apps/frontend
pnpm dev
```

## Demo
Para visualizar una demo del proyecto, se puede acceder al siguiente enlace: [Demo](https://linktic-three.vercel.app/)

Se han creado dos usuarios de prueba para facilitar la visualización de la aplicación:
- Usuario administrador:
  - Correo: admin@admin.com
  - Contraseña: admin
  - Role: admin
- Usuario común:
  - Correo: user@test.com
  - Contraseña: user
  - Role: user
  
## Documentación
Para visualizar la documentación de la API, se ha creado la documentación de Postman en la carpeta `apps/backend/src/docs/postman.json`. Tambien se han añadido las queries de creación de la base de datos en la carpeta `apps/backend/src/docs/queries.sql`.

## Notas
En este apartado detallare algunas notas adicionales sobre el proyecto, aclaraciones sobre decisiones tomadas y posibles mejoras.

### Backend
- En la documentacion de la prueba se pidio un CRUD para productos y tambien para listarlos. Para que sea mas simple y orientativo se decidio utilizar los metodos `PUT` para actualizar, `POST` al insertar, `DELETE` al eliminar y `GET` al recuperar datos. Cada uno de estos métodos está orientado a cumplir con las buenas prácticas de REST, facilitando una gestión eficiente y clara de los productos dentro del sistema. Además, se implementan medidas de validación para garantizar la integridad de los datos enviados y recibidos, así como una gestión adecuada de los errores para brindar retroalimentación útil a los usuarios y desarrolladores.

- Para las solicitudes de eliminación, también se decidió utilizar la misma solicitud `PUT`, con un campo adicional llamado `enabled` en la entidad de productos. Esto se realizó de esta forma debido a que en muchas normativas, los datos no deben ser eliminados y se deben almacenar durante un tiempo determinado. Por lo que, en lugar de eliminar el producto, se deshabilita y se mantiene en la base de datos.

- En las peticiones `DELETE`, se elimina completamente la información de la base de datos. Aunque esta práctica no es la más recomendada en un entorno de producción, donde generalmente es preferible marcar los registros como "deshabilitados" o "eliminados" mediante un campo (como un campo is_deleted o active), en este caso, se optó por la eliminación total debido a que es un entorno de pruebas y no se requiere conservar estos datos a largo plazo (La unica tabla con el campo is_delete en este entorno es productos).

- Se reconoce que podrían haberse implementado validaciones más robustas, así como un mejor manejo de los tokens JWT para la autenticación y autorización de los usuarios y otras mejoras relacionadas con la seguridad. Si bien el proyecto priorizó una solución funcional por motivos de tiempo, se mantuvo el enfoque en la seguridad y la integridad de los datos mediante el uso de herramientas como express-validator para validar los tipos de datos y garantizar que las entradas fueran seguras.

- Otra mejora que a implementar son los mensajes de error, aunque se intentaron cubrir todos los casos, algunos son muy básicos y no ofrecen suficiente información al frontend. Con más tiempo, se podrían hacer más descriptivos y agregar códigos de error personalizados para facilitar la identificación de problemas y su manejo por parte del cliente.

### Frontend
- Se ha intentado seguir una buena practica a nivel de manejo de estados en la aplicación. Pero debido al tiempo, no se ha podido ahondar en las mejores practicas de Sveltekit. Por lo que, se podrian realizar mejoras en la implementación de estados globales y locales.

## Autenticacion
- En la documentación de la prueba, se solicitaba la implementación de un sistema de autenticación. Se creó un panel simple para permitir el registro y acceso de usuarios, ya sea como administradores o usuarios comunes, utilizando un campo de roles dentro de la tabla de usuarios.
Sin embargo, esta implementación fue realizada de forma general y aún se pueden mejorar aspectos clave, como la validación de roles en el backend. Actualmente, no se restringe adecuadamente el acceso a ciertos endpoints según el rol del usuario, lo cual debería corregirse para garantizar que solo los administradores puedan acceder a endpoints específicos. Esto permitiría un control de acceso más seguro y acorde a las mejores prácticas.


### Despliegue
- Para el despliegue de la aplicación se ha utilizado Vercel para el frontend y Render para el backend. Se ha utilizado Vercel para el frontend debido a que es una plataforma que facilita el despliegue de aplicaciones Sveltekit. Por otro lado, se ha utilizado Render debido a que actualmente es una de las pocas plataformas que permite el despliegue de aplicaciones Node.js de forma gratuita y sencilla.


## Autor
- [Gerardo Garcia](https://github.com/Ch1py7)