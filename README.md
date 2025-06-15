# AdministradorAppFinal

AdministradorAppFinal es una aplicación web desarrollada con Angular para la gestión de citas. Utiliza Angular Material para la interfaz de usuario y Firebase como backend.

## 🧰 Tecnologías utilizadas

- Angular 19
- Angular Material
- Firebase
- Bootstrap 5

## 🚀 Instalación

### Requisitos previos

- Tener [Node.js](https://nodejs.org/) instalado (versión recomendada: ≥18)
- Tener Angular CLI instalado globalmente:
  ```bash
  npm install -g @angular/cli
  ```

### Pasos para ejecutar la aplicación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/ISSG2004/AdministradorAppFinal.git
   cd AdministradorAppFinal
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Ejecutar la aplicación en modo desarrollo:
   ```bash
   ng serve
   ```

   La app estará disponible en `http://localhost:4200`.

## 📁 Estructura del proyecto

```
AdministradorAppFinal/
├── src/                  # Código fuente principal
├── dist/                 # Archivos generados tras build
├── angular.json          # Configuración Angular CLI
├── package.json          # Dependencias y scripts
└── README.md             # Este archivo
```

## 📦 Scripts útiles

| Comando | Descripción |
|--------|-------------|
| `ng serve` | Ejecuta la app en modo desarrollo |
| `ng build` | Compila la app para producción |
| `npm run serve:ssr:adminappcitas` | Sirve con renderizado del lado del servidor (SSR) |

## 🔥 Firebase

Esta app utiliza Firebase. Asegúrate de configurar tu proyecto y agregar los datos en los archivos `environment.ts` correspondientes.

## 🌐 Link de app desplegada

[https://appoadmin-issg2004s-projects.vercel.app/login](https://appoadmin-issg2004s-projects.vercel.app/login)

## 📄 Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).
