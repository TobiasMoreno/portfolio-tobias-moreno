# Portafolio de Proyectos Personales

Este es un portafolio de proyectos personales desarrollado con Angular, que muestra diversas aplicaciones que he creado. El portafolio incluye detalles de los proyectos, como títulos, descripciones y enlaces a las páginas y a los repositorios de GitHub.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características](#características)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías-utilizadas)

## Descripción General

Este proyecto sirve como una colección de proyectos personales que demuestran mis habilidades en desarrollo frontend utilizando Angular. Cada proyecto en el portafolio incluye:

- Título del proyecto
- Breve descripción
- Enlace a la demo en vivo
- Enlace al repositorio de GitHub
- Imagen de vista previa

## Características

- Diseño responsivo utilizando Bootstrap.
- Lista organizada de proyectos con títulos, descripciones y enlaces externos.
- Navegación fácil a cada demo en vivo y al código fuente en GitHub.
- Archivo JSON para gestionar los datos de los proyectos, lo que facilita actualizaciones y escalabilidad.

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clona el repositorio:**

   ````bash
   git clone https://github.com/TobiasMoreno/personal-pages-angular.git
2. **Navegar al directorio del proyecto:**

   ```bash
   cd tu repo
   ````
3. **Instalar dependencias:**

    Ejecuta el siguiente comando para instalar las dependencias necesarias:
   ```bash
   npm install
   ````
3. **Ejecución:**

    Para ejecutar la aplicación localmente, usa el siguiente comando:
   ```bash
   ng serve
   ````
   Luego abre tu navegador y ve a http://localhost:4200/ para ver la aplicación en acción.

## Estructura del proyecto
````

public
├── assets/
│   ├── img/               # Contiene las imágenes de los proyectos
│   └── data/
│       └── projects.json   # Contiene la lista de proyectos
│
src/
├── app/
│   ├── components/
│   │   ├── project-list/
│   │   │   ├── project-list.component.ts
│   │   │   ├── project-list.component.html
│   │   │   ├── project-list.component.css
│   │
│   ├── services/
│   │   └── pages.service.ts
│   │
│   └── app.component.ts
│
└── environments/
````

## Tecnologías Utilizadas
- Angular: Framework principal utilizado para el desarrollo.
- Bootstrap: Utilizado para estilos y diseño responsivo.
- RxJS: Manejo de flujos asíncronos.
- JSON: Archivo para almacenar y cargar la lista de proyectos.
- Netlify: Para el despliegue de la aplicación en línea.
