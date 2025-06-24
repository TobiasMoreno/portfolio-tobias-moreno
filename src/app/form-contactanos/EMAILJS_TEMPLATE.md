# 📧 Template Optimizado de EmailJS

## 🚀 Variables Disponibles

### 📋 Información del Usuario
- `{{nombre}}` - Nombre del remitente
- `{{email}}` - Email del remitente
- `{{asuntoEmail}}` - Asunto del mensaje
- `{{mensaje}}` - Contenido del mensaje

### 🕒 Información Temporal y del Sistema
- `{{fecha}}` - Fecha y hora formateada (ej: "15 de enero de 2024, 14:30")
- `{{fechaISO}}` - Fecha en formato ISO
- `{{timestamp}}` - Timestamp Unix
- `{{userAgent}}` - Navegador y sistema operativo
- `{{idioma}}` - Idioma del navegador
- `{{timezone}}` - Zona horaria del usuario
- `{{urlOrigen}}` - URL desde donde se envió el formulario
- `{{referrer}}` - Página de origen (si aplica)

### 📊 Análisis del Mensaje
- `{{longitudMensaje}}` - Número de caracteres del mensaje
- `{{longitudAsunto}}` - Número de caracteres del asunto
- `{{tipoConsulta}}` - Tipo detectado automáticamente:
  - Oportunidad Laboral
  - Proyecto de Desarrollo
  - Consulta Técnica
  - Colaboración
  - Cotización
  - Consulta General
- `{{prioridad}}` - Prioridad detectada (Alta/Media/Normal)
- `{{palabrasClave}}` - Tecnologías mencionadas (ej: "angular, typescript, node")

### 🎯 Variables para Respuesta
- `{{saludo}}` - Saludo según la hora (Buenos días/tardes/noches)
- `{{resumen}}` - Resumen del mensaje
- `{{instruccionesRespuesta}}` - Instrucciones específicas para responder

---

## 📝 Template HTML Optimizado

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Mensaje de Contacto</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
        .section { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #007bff; }
        .priority-high { border-left-color: #dc3545; background: #fff5f5; }
        .priority-medium { border-left-color: #ffc107; background: #fffbf0; }
        .priority-normal { border-left-color: #28a745; background: #f0fff4; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0; }
        .info-item { background: white; padding: 8px; border-radius: 5px; border: 1px solid #dee2e6; }
        .label { font-weight: bold; color: #495057; font-size: 0.9em; }
        .value { color: #212529; }
        .message-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6; margin: 10px 0; }
        .footer { background: #e9ecef; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 0.9em; color: #6c757d; }
        .badge { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 0.8em; font-weight: bold; }
        .badge-primary { background: #007bff; color: white; }
        .badge-success { background: #28a745; color: white; }
        .badge-warning { background: #ffc107; color: #212529; }
        .badge-danger { background: #dc3545; color: white; }
        .badge-info { background: #17a2b8; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>📧 Nuevo Mensaje de Contacto</h1>
            <p>{{saludo}}, tienes un nuevo mensaje en tu portafolio</p>
        </div>

        <!-- Información Principal -->
        <div class="section">
            <h2>👤 Información del Remitente</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="label">Nombre:</div>
                    <div class="value">{{nombre}}</div>
                </div>
                <div class="info-item">
                    <div class="label">Email:</div>
                    <div class="value">{{email}}</div>
                </div>
                <div class="info-item">
                    <div class="label">Asunto:</div>
                    <div class="value">{{asuntoEmail}}</div>
                </div>
                <div class="info-item">
                    <div class="label">Fecha:</div>
                    <div class="value">{{fecha}}</div>
                </div>
            </div>
        </div>

        <!-- Análisis del Mensaje -->
        <div class="section priority-{{prioridad == 'Alta' ? 'high' : prioridad == 'Media' ? 'medium' : 'normal'}}">
            <h2>📊 Análisis del Mensaje</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="label">Tipo de Consulta:</div>
                    <div class="value">
                        <span class="badge badge-primary">{{tipoConsulta}}</span>
                    </div>
                </div>
                <div class="info-item">
                    <div class="label">Prioridad:</div>
                    <div class="value">
                        <span class="badge badge-{{prioridad == 'Alta' ? 'danger' : prioridad == 'Media' ? 'warning' : 'success'}}">{{prioridad}}</span>
                    </div>
                </div>
                <div class="info-item">
                    <div class="label">Longitud Mensaje:</div>
                    <div class="value">{{longitudMensaje}} caracteres</div>
                </div>
                <div class="info-item">
                    <div class="label">Longitud Asunto:</div>
                    <div class="value">{{longitudAsunto}} caracteres</div>
                </div>
            </div>
            
            <div style="margin-top: 15px;">
                <div class="label">Tecnologías Mencionadas:</div>
                <div class="value">
                    <span class="badge badge-info">{{palabrasClave}}</span>
                </div>
            </div>
        </div>

        <!-- Mensaje -->
        <div class="section">
            <h2>💬 Mensaje</h2>
            <div class="message-box">
                {{mensaje}}
            </div>
        </div>

        <!-- Instrucciones de Respuesta -->
        <div class="section">
            <h2>🎯 Instrucciones de Respuesta</h2>
            <div class="message-box" style="background: #e3f2fd; border-left: 4px solid #2196f3;">
                <strong>Acción Sugerida:</strong><br>
                {{instruccionesRespuesta}}
            </div>
        </div>

        <!-- Información Técnica -->
        <div class="section">
            <h2>🔧 Información Técnica</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="label">Navegador:</div>
                    <div class="value">{{userAgent}}</div>
                </div>
                <div class="info-item">
                    <div class="label">Idioma:</div>
                    <div class="value">{{idioma}}</div>
                </div>
                <div class="info-item">
                    <div class="label">Zona Horaria:</div>
                    <div class="value">{{timezone}}</div>
                </div>
                <div class="info-item">
                    <div class="label">URL Origen:</div>
                    <div class="value">{{urlOrigen}}</div>
                </div>
                <div class="info-item">
                    <div class="label">Referrer:</div>
                    <div class="value">{{referrer}}</div>
                </div>
                <div class="info-item">
                    <div class="label">Timestamp:</div>
                    <div class="value">{{timestamp}}</div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Resumen:</strong> {{resumen}}</p>
            <p><em>Este mensaje fue enviado automáticamente desde tu formulario de contacto.</em></p>
            <p><small>Fecha ISO: {{fechaISO}}</small></p>
        </div>
    </div>
</body>
</html>
```

---

## 🎨 Template Texto Simple (Alternativo)

Si prefieres un template más simple en texto plano:

```
📧 NUEVO MENSAJE DE CONTACTO
═══════════════════════════════════════════════════════════════

{{saludo}},

Has recibido un nuevo mensaje en tu portafolio:

👤 INFORMACIÓN DEL REMITENTE
───────────────────────────────────────────────────────────────
• Nombre: {{nombre}}
• Email: {{email}}
• Asunto: {{asuntoEmail}}
• Fecha: {{fecha}}

📊 ANÁLISIS DEL MENSAJE
───────────────────────────────────────────────────────────────
• Tipo de Consulta: {{tipoConsulta}}
• Prioridad: {{prioridad}}
• Longitud del Mensaje: {{longitudMensaje}} caracteres
• Tecnologías Mencionadas: {{palabrasClave}}

💬 MENSAJE
───────────────────────────────────────────────────────────────
{{mensaje}}

🎯 INSTRUCCIONES DE RESPUESTA
───────────────────────────────────────────────────────────────
{{instruccionesRespuesta}}

🔧 INFORMACIÓN TÉCNICA
───────────────────────────────────────────────────────────────
• Navegador: {{userAgent}}
• Idioma: {{idioma}}
• Zona Horaria: {{timezone}}
• URL Origen: {{urlOrigen}}
• Referrer: {{referrer}}

═══════════════════════════════════════════════════════════════
{{resumen}}
═══════════════════════════════════════════════════════════════
```

---

## 🚀 Beneficios de estas Variables

### 📈 **Análisis Automático**
- **Detección de tipo de consulta** - Te ayuda a categorizar automáticamente
- **Priorización inteligente** - Identifica mensajes urgentes
- **Extracción de tecnologías** - Detecta qué tecnologías mencionan

### 🎯 **Mejor Respuesta**
- **Instrucciones específicas** - Te dice cómo responder según el tipo
- **Contexto completo** - Toda la información necesaria en un vistazo
- **Saludo personalizado** - Según la hora del día

### 🔍 **Información Técnica**
- **Trazabilidad** - Sabes desde dónde y cuándo se envió
- **Contexto del usuario** - Navegador, idioma, zona horaria
- **Análisis de comportamiento** - Referrer y URL de origen

### 📊 **Métricas Útiles**
- **Longitud de mensajes** - Para entender el nivel de detalle
- **Patrones de consulta** - Para mejorar tu portafolio
- **Tecnologías populares** - Para enfocar tu contenido

¡Con estas variables tendrás toda la información necesaria para responder de manera profesional y efectiva! 🎉 