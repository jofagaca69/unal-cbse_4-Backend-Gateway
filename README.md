# Proyecto de Microservicios para Jangol

Este repositorio contiene los componentes del sistema basado en microservicios de Jangol, incluyendo el API Gateway. A continuación se detalla la información del componente.

---

## Componente del Sistema

### API Gateway
- **Tipo de componente**: API Gateway
- **Nombre**: API Gateway - Enrutador de solicitudes
- **Paradigma**: Enrutamiento y autorización centralizada de microservicios
- **Sistema de gestión**: N/A (No almacena datos)

---

## Descripción del Sistema

El sistema está diseñado bajo una arquitectura de microservicios donde cada componente es responsable de una funcionalidad específica dentro del dominio del sistema:

- **MS1**: Gestión de usuarios y operaciones relacionadas con los datos de los usuarios.
- **MS2**: Administración de reservaciones, incluyendo la lógica de negocio necesaria para validar y gestionar las reservas.
- **MS3**: Procesamiento de pagos e integración con sistemas externos para completar transacciones financieras.
- **API Gateway**: Responsable de centralizar las solicitudes y distribuirlas a los microservicios correspondientes.

## Tecnologías

- **Node.js** y **NestJS**: Framework principal utilizado para desarrollar cada microservicio y el API Gateway.
- **MySQL**: Base de datos relacional utilizada en los microservicios MS1 y MS2.
- **Firestore**: Base de datos NoSQL utilizada para almacenar registros de pagos en MS3.
- **Google Cloud Platform (GCP)**: Infraestructura de nube en la que se despliegan los microservicios y el API Gateway.

## Configuración

Cada microservicio y el API Gateway pueden configurarse mediante variables de entorno definidas en archivos `.env` o en la configuración de despliegue en GCP.

---

## Despliegue

Cada componente se despliega independientemente, permitiendo una escalabilidad horizontal y un control separado para cada servicio. El API Gateway está configurado para manejar todas las solicitudes externas y distribuirlas a los microservicios según las rutas especificadas.

---

## Ejecución Local

Para ejecutar los microservicios y el API Gateway localmente:

1. Clona el repositorio y navega a cada carpeta de los microservicios.
2. Ejecuta `yarn` para instalar las dependencias de cada componente.
3. Configura los archivos `.env` con las variables de entorno necesarias.
4. Ejecuta `npm run start:dev` en cada componente para levantar los servicios en desarrollo.

---

## Estructura de Archivos `.env`

Cada microservicio y el API Gateway utilizan variables de entorno para configurar sus conexiones y servicios. A continuación, se detalla la estructura de los archivos `.env` necesarios:

### MS y API Gateway

```plaintext
# Configuración de la base de datos MySQL
DATABASE_HOST=<URL_db_sql>
DATABASE_PORT=<puerto_db_sql>
DATABASE_USERNAME=<usuario_db_sql>
DATABASE_PASSWORD=<contraseña_db_sql>
DATABASE_NAME=<nombre_db_sql>
NODE_ENV=<environment>

