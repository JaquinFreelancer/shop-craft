# 📋 CASOS DE USO DETALLADOS

## UC301: Agregar al Carrito

**Actor Principal:** Cliente (Anónimo o Registrado)  
**Precondiciones:** Producto existe y está disponible  
**Postcondiciones:** Producto agregado al carrito, totales actualizados

### Flujo Principal:
1. El cliente navega a la página del producto
2. El sistema muestra detalles del producto, precio y disponibilidad
3. El cliente selecciona variante del producto (si aplica):
   - Talla, color, modelo, etc.
4. El cliente especifica la cantidad deseada
5. El cliente hace clic en "Agregar al Carrito"
6. El sistema valida disponibilidad del stock
7. El sistema verifica que la cantidad no exceda el stock disponible
8. El sistema agrega el producto al carrito
9. El sistema actualiza el contador del carrito en la UI
10. El sistema muestra notificación de confirmación
11. El sistema sugiere productos relacionados (opcional)

### Flujos Alternativos:
- **3a.** Producto sin variantes: Omite selección de variante
- **6a.** Producto sin stock: Muestra mensaje "Agotado" y opción "Notificarme"
- **7a.** Cantidad excede stock: Ajusta automáticamente a máximo disponible
- **8a.** Producto ya en carrito: Incrementa cantidad existente

### Flujos de Excepción:
- **E1.** Producto eliminado: Muestra error y redirige a catálogo
- **E2.** Sesión expirada: Solicita re-autenticación
- **E3.** Error de conexión: Guarda en almacenamiento local para sincronizar

---

## UC404: Procesar Pago

**Actor Principal:** Cliente  
**Actores Secundarios:** Sistema de Pagos (Stripe/PayPal)  
**Precondiciones:** Carrito con productos, dirección de envío seleccionada  
**Postcondiciones:** Pago procesado, orden creada

### Flujo Principal:
1. El cliente revisa el resumen de la orden en checkout
2. El sistema muestra métodos de pago disponibles:
   - Tarjeta de crédito/débito
   - PayPal
   - Transferencia bancaria (si está habilitada)
3. El cliente selecciona método de pago
4. El sistema presenta formulario de pago correspondiente
5. El cliente ingresa información de pago:
   - **Tarjeta:** Número, fecha de vencimiento, CVV, nombre
   - **PayPal:** Redirección a PayPal
6. El sistema valida la información de pago
7. El sistema calcula totales finales (productos + envío + impuestos - descuentos)
8. El cliente confirma el pago
9. El sistema procesa el pago con el gateway correspondiente
10. El gateway responde con confirmación o rechazo
11. Si es exitoso:
    - El sistema crea la orden
    - Reduce el stock de productos
    - Envía email de confirmación
    - Redirige a página de éxito
12. El sistema muestra número de orden y detalles

### Flujos Alternativos:
- **5a.** PayPal seleccionado: Redirige a PayPal para autenticación
- **10a.** Pago rechazado: Muestra error específico y permite reintentar
- **10b.** Fondos insuficientes: Sugiere otros métodos de pago
- **10c.** Tarjeta expirada: Solicita actualizar información

### Flujos de Excepción:
- **E1.** Gateway no disponible: Ofrece métodos alternativos
- **E2.** Stock agotado durante pago: Cancela transacción y notifica
- **E3.** Timeout de pago: Mantiene orden pendiente por 15 minutos

---

## UC801: Crear Producto

**Actor Principal:** Administrador  
**Precondiciones:** Usuario autenticado con permisos de administrador  
**Postcondiciones:** Producto creado en estado "borrador"

### Flujo Principal:
1. El administrador accede al panel de administración
2. El administrador navega a "Gestión de Productos"
3. El administrador hace clic en "Crear Nuevo Producto"
4. El sistema muestra formulario de creación con pestañas:
   - **Información Básica:** Nombre, descripción, SKU
   - **Precios:** Precio regular, precio de comparación, costo
   - **Inventario:** Stock, seguimiento, umbral de stock bajo
   - **Envío:** Peso, dimensiones, requiere envío
   - **SEO:** Meta título, meta descripción, URL amigable
5. El administrador completa la información básica:
   - Nombre del producto (requerido)
   - Descripción completa
   - SKU único (auto-generado o manual)
   - Categoría (selecciona de lista existente)
6. El administrador configura precios:
   - Precio de venta (requerido)
   - Precio de comparación (para mostrar descuento)
   - Precio de costo (para cálculo de márgenes)
7. El administrador configura inventario:
   - Activar seguimiento de stock
   - Cantidad inicial en stock
   - Umbral para alerta de stock bajo
8. El administrador sube imágenes del producto:
   - Imagen principal (requerida)
   - Imágenes adicionales (hasta 10)
   - Texto alternativo para SEO
9. El administrador configura variantes (si aplica):
   - Opciones (talla, color, material)
   - Combinaciones con precios y stock específicos
10. El sistema valida toda la información
11. El sistema guarda el producto en estado "borrador"
12. El sistema muestra confirmación y opciones siguientes

### Flujos Alternativos:
- **5a.** SKU duplicado: Sistema genera SKU alternativo automáticamente
- **8a.** Imagen muy grande: Sistema redimensiona automáticamente
- **9a.** Producto sin variantes: Omite configuración de variantes

### Flujos de Excepción:
- **E1.** Categoría no existe: Permite crear categoría nueva
- **E2.** Error al subir imagen: Permite continuar sin imagen temporal
- **E3.** Sesión expirada: Guarda borrador y solicita re-autenticación

---

## UC501: Ver Historial de Órdenes

**Actor Principal:** Cliente Registrado  
**Precondiciones:** Usuario autenticado con órdenes previas  
**Postcondiciones:** Lista de órdenes mostrada con filtros aplicados

### Flujo Principal:
1. El cliente accede a su cuenta
2. El cliente navega a "Mis Órdenes"
3. El sistema consulta todas las órdenes del usuario
4. El sistema muestra lista de órdenes con información resumida:
   - Número de orden
   - Fecha de compra
   - Estado actual (pendiente, procesando, enviado, entregado)
   - Total de la orden
   - Cantidad de productos
5. El sistema proporciona opciones de filtrado:
   - Por estado (todas, pendientes, enviadas, entregadas)
   - Por rango de fechas
   - Por monto
6. El sistema proporciona opciones de ordenamiento:
   - Por fecha (más reciente primero)
   - Por monto (mayor a menor)
   - Por estado
7. Para cada orden, el sistema muestra acciones disponibles:
   - Ver detalles
   - Rastrear envío (si está enviado)
   - Cancelar (si está pendiente)
   - Solicitar devolución (si está entregado)
   - Reordenar productos
   - Descargar factura
8. El sistema implementa paginación para listas largas

### Flujos Alternativos:
- **3a.** Usuario sin órdenes: Muestra estado vacío con sugerencias de productos
- **5a.** Aplicar filtros: Actualiza lista según criterios seleccionados
- **7a.** Orden cancelable: Muestra botón "Cancelar Orden"
- **7b.** Orden rastreable: Muestra enlace "Rastrear Envío"

### Flujos de Excepción:
- **E1.** Error de carga: Muestra mensaje de error y botón reintentar
- **E2.** Sesión expirada: Redirige a login preservando la URL

---

## UC701: Escribir Reseña

**Actor Principal:** Cliente Registrado  
**Precondiciones:** Usuario autenticado, producto comprado previamente  
**Postcondiciones:** Reseña creada pendiente de moderación

### Flujo Principal:
1. El cliente navega a la página del producto
2. El cliente hace clic en "Escribir Reseña" en la sección de reseñas
3. El sistema verifica que el cliente haya comprado el producto
4. El sistema muestra formulario de reseña:
   - Calificación con estrellas (1-5, requerido)
   - Título de la reseña (opcional)
   - Texto de la reseña (requerido, mín. 50 caracteres)
   - Opción para subir fotos (máximo 5)
5. El cliente selecciona calificación en estrellas
6. El cliente ingresa título descriptivo de la reseña
7. El cliente escribe el contenido de la reseña
8. El cliente puede subir fotos del producto (opcional)
9. El cliente marca si recomendaría el producto
10. El sistema valida que la reseña cumpla políticas:
    - Sin contenido ofensivo
    - Longitud mínima del texto
    - Imágenes apropiadas
11. El sistema guarda la reseña en estado "pendiente de moderación"
12. El sistema muestra confirmación y tiempo estimado de aprobación
13. El sistema notifica al administrador para revisión

### Flujos Alternativos:
- **3a.** Cliente no ha comprado: Muestra mensaje informativo y sugiere comprar
- **8a.** Imagen muy grande: Redimensiona automáticamente
- **10a.** Contenido rechazado: Muestra errores específicos para corrección

### Flujos de Excepción:
- **E1.** Cliente ya reseñó: Redirige a opción "Editar Reseña Existente"
- **E2.** Producto eliminado: Muestra error y redirige a catálogo
- **E3.** Error al subir foto: Permite continuar sin fotos