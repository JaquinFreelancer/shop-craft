## 3. Mapa de rutas Backend

Ahora continuemos con el tercer documento: **Mapa de rutas Backend**

Este documento define todas las rutas de la API RESTful del e-commerce, organizadas por módulos funcionales, incluyendo métodos HTTP, parámetros, autenticación requerida y códigos de respuesta.

### API Base URL
```
https://api.ecommerce.com/v1
```

### Estructura de Respuesta Estándar
```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "errors": string[],
  "meta": {
    "timestamp": "ISO 8601",
    "requestId": "UUID",
    "version": "1.0.0",
    "pagination": {
      "page": number,
      "limit": number,
      "total": number,
      "totalPages": number
    }
  }
}
```

---

## 🔐 **AUTHENTICATION & AUTHORIZATION**

### Auth Routes (`/auth`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `POST` | `/auth/register` | Registro de nuevo usuario | ❌ | `{email, password, firstName, lastName, phone?}` |
| `POST` | `/auth/login` | Inicio de sesión | ❌ | `{email, password, rememberMe?}` |
| `POST` | `/auth/logout` | Cerrar sesión | ✅ | `{refreshToken}` |
| `POST` | `/auth/refresh` | Renovar token de acceso | ❌ | `{refreshToken}` |
| `POST` | `/auth/forgot-password` | Solicitar reset de contraseña | ❌ | `{email}` |
| `POST` | `/auth/reset-password` | Restablecer contraseña | ❌ | `{token, newPassword}` |
| `POST` | `/auth/verify-email` | Verificar email | ❌ | `{token}` |
| `POST` | `/auth/resend-verification` | Reenviar verificación | ✅ | `{}` |
| `GET` | `/auth/me` | Obtener perfil actual | ✅ | - |

**Respuestas de Autenticación:**
- `200`: Operación exitosa
- `400`: Datos inválidos
- `401`: Credenciales incorrectas
- `403`: Cuenta no verificada
- `429`: Demasiados intentos

---

## 👤 **USER MANAGEMENT**

### User Routes (`/users`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/users/profile` | Obtener perfil del usuario | ✅ | - |
| `PUT` | `/users/profile` | Actualizar perfil | ✅ | `{firstName?, lastName?, phone?, dateOfBirth?, gender?}` |
| `POST` | `/users/change-password` | Cambiar contraseña | ✅ | `{currentPassword, newPassword}` |
| `DELETE` | `/users/account` | Eliminar cuenta (soft delete) | ✅ | `{password}` |
| `GET` | `/users/{userId}` | Obtener usuario por ID (Admin) | ✅ | - |

### User Addresses Routes (`/users/addresses`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/users/addresses` | Obtener direcciones del usuario | ✅ | `?type={billing|shipping}` |
| `POST` | `/users/addresses` | Agregar nueva dirección | ✅ | `{type, firstName, lastName, company?, addressLine1, addressLine2?, city, state, postalCode, country, phone?, isDefault?}` |
| `GET` | `/users/addresses/{addressId}` | Obtener dirección específica | ✅ | - |
| `PUT` | `/users/addresses/{addressId}` | Actualizar dirección | ✅ | `{firstName?, lastName?, company?, addressLine1?, addressLine2?, city?, state?, postalCode?, country?, phone?, isDefault?}` |
| `DELETE` | `/users/addresses/{addressId}` | Eliminar dirección | ✅ | - |
| `POST` | `/users/addresses/{addressId}/set-default` | Establecer como predeterminada | ✅ | `{}` |

---

## 📦 **PRODUCT CATALOG**

### Product Routes (`/products`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/products` | Listar productos públicos | ❌ | `?category={categoryId}&featured={true|false}&status=active&page={page}&limit={limit}&search={query}&sort={price|name|created}&order={asc|desc}&minPrice={price}&maxPrice={price}` |
| `GET` | `/products/{productId}` | Obtener producto por ID | ❌ | - |
| `GET` | `/products/slug/{slug}` | Obtener producto por slug | ❌ | - |
| `POST` | `/products` | Crear producto (Admin) | ✅ | `{name, description, shortDescription?, sku, categoryId, price, comparePrice?, costPrice?, trackQuantity?, quantity?, weight?, dimensions?, requiresShipping?, taxable?, taxRate?, featured?, metaTitle?, metaDescription?, tags?}` |
| `PUT` | `/products/{productId}` | Actualizar producto (Admin) | ✅ | `{name?, description?, shortDescription?, price?, comparePrice?, quantity?, featured?, status?}` |
| `DELETE` | `/products/{productId}` | Eliminar producto (Admin) | ✅ | - |
| `POST` | `/products/{productId}/publish` | Publicar producto (Admin) | ✅ | `{}` |
| `POST` | `/products/{productId}/archive` | Archivar producto (Admin) | ✅ | `{}` |

### Product Images Routes (`/products/{productId}/images`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/products/{productId}/images` | Listar imágenes del producto | ❌ | - |
| `POST` | `/products/{productId}/images` | Subir imagen de producto (Admin) | ✅ | `multipart/form-data: {file, altText?, sortOrder?, isPrimary?}` |
| `PUT` | `/products/{productId}/images/{imageId}` | Actualizar imagen (Admin) | ✅ | `{altText?, sortOrder?, isPrimary?}` |
| `DELETE` | `/products/{productId}/images/{imageId}` | Eliminar imagen (Admin) | ✅ | - |
| `POST` | `/products/{productId}/images/{imageId}/set-primary` | Establecer como imagen principal (Admin) | ✅ | `{}` |

### Product Variants Routes (`/products/{productId}/variants`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/products/{productId}/variants` | Listar variantes del producto | ❌ | - |
| `POST` | `/products/{productId}/variants` | Crear variante (Admin) | ✅ | `{variantName, sku, price?, comparePrice?, costPrice?, quantity?, weight?, imageUrl?, variantOptions}` |
| `GET` | `/products/{productId}/variants/{variantId}` | Obtener variante específica | ❌ | - |
| `PUT` | `/products/{productId}/variants/{variantId}` | Actualizar variante (Admin) | ✅ | `{variantName?, price?, quantity?, variantOptions?}` |
| `DELETE` | `/products/{productId}/variants/{variantId}` | Eliminar variante (Admin) | ✅ | - |

### Product Stock Routes (`/products/stock`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/products/stock/low` | Productos con stock bajo (Admin) | ✅ | `?threshold={number}` |
| `PUT` | `/products/{productId}/stock` | Actualizar stock (Admin) | ✅ | `{quantity, operation: 'set'|'add'|'subtract'}` |
| `PUT` | `/products/{productId}/variants/{variantId}/stock` | Actualizar stock de variante (Admin) | ✅ | `{quantity, operation: 'set'|'add'|'subtract'}` |
| `GET` | `/products/{productId}/stock-history` | Historial de movimientos de stock (Admin) | ✅ | `?page={page}&limit={limit}` |

---

## 📂 **CATEGORIES**

### Category Routes (`/categories`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/categories` | Listar categorías activas | ❌ | `?parent={categoryId}&includeProducts={true|false}` |
| `GET` | `/categories/{categoryId}` | Obtener categoría por ID | ❌ | - |
| `GET` | `/categories/slug/{slug}` | Obtener categoría por slug | ❌ | - |
| `POST` | `/categories` | Crear categoría (Admin) | ✅ | `{name, slug?, description?, parentId?, imageUrl?, metaTitle?, metaDescription?, sortOrder?}` |
| `PUT` | `/categories/{categoryId}` | Actualizar categoría (Admin) | ✅ | `{name?, description?, parentId?, imageUrl?, metaTitle?, metaDescription?, sortOrder?}` |
| `DELETE` | `/categories/{categoryId}` | Eliminar categoría (Admin) | ✅ | - |
| `GET` | `/categories/{categoryId}/products` | Productos de una categoría | ❌ | `?page={page}&limit={limit}&sort={sort}&order={order}` |
| `GET` | `/categories/tree` | Árbol completo de categorías | ❌ | - |

---

## 🛒 **SHOPPING CART**

### Cart Routes (`/cart`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/cart` | Obtener carrito actual | ❌* | - |
| `POST` | `/cart/items` | Agregar item al carrito | ❌* | `{productId, variantId?, quantity}` |
| `PUT` | `/cart/items/{itemId}` | Actualizar cantidad de item | ❌* | `{quantity}` |
| `DELETE` | `/cart/items/{itemId}` | Remover item del carrito | ❌* | - |
| `DELETE` | `/cart` | Vaciar carrito completo | ❌* | - |
| `GET` | `/cart/totals` | Obtener totales del carrito | ❌* | `?shippingZone={zoneId}&couponCode={code}` |
| `POST` | `/cart/merge` | Fusionar carrito de invitado con usuario | ✅ | `{guestCartId}` |
| `POST` | `/cart/validate` | Validar items del carrito | ❌* | - |

*❌* = Funciona sin auth (usando sessionId) o con auth (usando userId)

---

## 📋 **ORDERS**

### Order Routes (`/orders`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `POST` | `/orders` | Crear nueva orden | ❌* | `{email?, billingAddress, shippingAddress?, shippingMethod?, paymentMethod, couponCode?, notes?}` |
| `GET` | `/orders` | Listar órdenes del usuario | ✅ | `?status={status}&page={page}&limit={limit}` |
| `GET` | `/orders/{orderId}` | Obtener orden específica | ✅** | - |
| `PUT` | `/orders/{orderId}` | Actualizar orden (Admin) | ✅ | `{status?, fulfillmentStatus?, trackingNumber?, notes?}` |
| `POST` | `/orders/{orderId}/cancel` | Cancelar orden | ✅** | `{reason}` |
| `GET` | `/orders/{orderId}/track` | Rastrear orden | ❌ | `?email={email}` |
| `POST` | `/orders/{orderId}/refund` | Procesar reembolso (Admin) | ✅ | `{amount?, reason}` |
| `GET` | `/orders/{orderId}/invoice` | Generar factura PDF | ✅** | - |

**✅** = Requiere auth, **❌*** = Invitados pueden crear, **✅**** = Owner o Admin

### Order Management Routes (Admin) (`/admin/orders`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/admin/orders` | Listar todas las órdenes | ✅ | `?status={status}&paymentStatus={status}&fulfillmentStatus={status}&dateFrom={date}&dateTo={date}&page={page}&limit={limit}` |
| `GET` | `/admin/orders/{orderId}` | Obtener orden completa | ✅ | - |
| `PUT` | `/admin/orders/{orderId}/status` | Cambiar estado de orden | ✅ | `{status, notes?}` |
| `POST` | `/admin/orders/{orderId}/ship` | Marcar como enviado | ✅ | `{trackingNumber, shippingCarrier?, estimatedDelivery?}` |
| `POST` | `/admin/orders/{orderId}/deliver` | Marcar como entregado | ✅ | `{}` |
| `GET` | `/admin/orders/stats` | Estadísticas de órdenes | ✅ | `?period={7d|30d|90d|1y}` |

---

## 💳 **PAYMENTS**

### Payment Routes (`/payments`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `POST` | `/payments/process` | Procesar pago | ❌* | `{orderId, paymentMethod, paymentData}` |
| `GET` | `/payments/{paymentId}` | Obtener estado del pago | ✅** | - |
| `POST` | `/payments/{paymentId}/refund` | Solicitar reembolso (Admin) | ✅ | `{amount?, reason}` |
| `GET` | `/payments/methods` | Métodos de pago disponibles | ❌ | - |

### Payment Webhooks (`/payments/webhooks`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `POST` | `/payments/webhooks/stripe` | Webhook de Stripe | ❌ | `Stripe payload` |
| `POST` | `/payments/webhooks/paypal` | Webhook de PayPal | ❌ | `PayPal payload` |

---

## 🎫 **COUPONS & DISCOUNTS**

### Coupon Routes (`/coupons`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `POST` | `/coupons/validate` | Validar código de cupón | ❌ | `{code, cartTotal}` |
| `POST` | `/coupons/apply` | Aplicar cupón al carrito | ❌* | `{code}` |
| `DELETE` | `/coupons/remove` | Remover cupón del carrito | ❌* | - |

### Coupon Management Routes (Admin) (`/admin/coupons`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/admin/coupons` | Listar todos los cupones | ✅ | `?status={active|expired|disabled}&page={page}&limit={limit}` |
| `POST` | `/admin/coupons` | Crear nuevo cupón | ✅ | `{code, name, description, type, value, minimumAmount?, maximumDiscount?, usageLimit?, userUsageLimit?, startsAt?, expiresAt?}` |
| `GET` | `/admin/coupons/{couponId}` | Obtener cupón específico | ✅ | - |
| `PUT` | `/admin/coupons/{couponId}` | Actualizar cupón | ✅ | `{name?, description?, usageLimit?, expiresAt?, isActive?}` |
| `DELETE` | `/admin/coupons/{couponId}` | Eliminar cupón | ✅ | - |
| `GET` | `/admin/coupons/{couponId}/usage` | Estadísticas de uso | ✅ | `?page={page}&limit={limit}` |

---

## ⭐ **REVIEWS & RATINGS**

### Review Routes (`/reviews`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/products/{productId}/reviews` | Obtener reseñas del producto | ❌ | `?page={page}&limit={limit}&sort={rating|helpful|date}&order={asc|desc}&rating={1-5}` |
| `POST` | `/products/{productId}/reviews` | Crear reseña | ✅ | `{rating, title?, reviewText, orderId?}` |
| `GET` | `/reviews/{reviewId}` | Obtener reseña específica | ❌ | - |
| `PUT` | `/reviews/{reviewId}` | Actualizar reseña propia | ✅ | `{rating?, title?, reviewText?}` |
| `DELETE` | `/reviews/{reviewId}` | Eliminar reseña propia | ✅ | - |
| `POST` | `/reviews/{reviewId}/helpful` | Marcar reseña como útil | ✅ | `{}` |
| `GET` | `/users/reviews` | Mis reseñas | ✅ | `?page={page}&limit={limit}` |

### Review Management Routes (Admin) (`/admin/reviews`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/admin/reviews` | Listar todas las reseñas | ✅ | `?isApproved={true|false}&page={page}&limit={limit}` |
| `PUT` | `/admin/reviews/{reviewId}/approve` | Aprobar reseña | ✅ | `{}` |
| `PUT` | `/admin/reviews/{reviewId}/reject` | Rechazar reseña | ✅ | `{reason?}` |
| `DELETE` | `/admin/reviews/{reviewId}` | Eliminar reseña | ✅ | - |

---

## 💝 **WISHLIST**

### Wishlist Routes (`/wishlist`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/wishlist` | Obtener wishlist del usuario | ✅ | - |
| `POST` | `/wishlist` | Crear nueva wishlist | ✅ | `{name, isPublic?}` |
| `GET` | `/wishlist/{wishlistId}` | Obtener wishlist específica | ✅ | - |
| `PUT` | `/wishlist/{wishlistId}` | Actualizar wishlist | ✅ | `{name?, isPublic?}` |
| `DELETE` | `/wishlist/{wishlistId}` | Eliminar wishlist | ✅ | - |
| `POST` | `/wishlist/{wishlistId}/items` | Agregar producto a wishlist | ✅ | `{productId, variantId?}` |
| `DELETE` | `/wishlist/{wishlistId}/items/{itemId}` | Remover de wishlist | ✅ | - |
| `POST` | `/wishlist/{wishlistId}/items/{itemId}/move-to-cart` | Mover al carrito | ✅ | `{quantity?}` |
| `GET` | `/wishlist/public/{wishlistId}` | Ver wishlist pública | ❌ | - |

---

## 🚚 **SHIPPING**

### Shipping Routes (`/shipping`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `POST` | `/shipping/calculate` | Calcular tarifas de envío | ❌ | `{items, shippingAddress}` |
| `GET` | `/shipping/zones` | Obtener zonas de envío | ❌ | `?country={countryCode}` |
| `GET` | `/shipping/methods` | Métodos de envío disponibles | ❌ | `?zoneId={zoneId}&weight={weight}&total={amount}` |

### Shipping Management Routes (Admin) (`/admin/shipping`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/admin/shipping/zones` | Listar zonas de envío | ✅ | - |
| `POST` | `/admin/shipping/zones` | Crear zona de envío | ✅ | `{name, countries, isActive?}` |
| `PUT` | `/admin/shipping/zones/{zoneId}` | Actualizar zona | ✅ | `{name?, countries?, isActive?}` |
| `DELETE` | `/admin/shipping/zones/{zoneId}` | Eliminar zona | ✅ | - |
| `GET` | `/admin/shipping/zones/{zoneId}/rates` | Tarifas de una zona | ✅ | - |
| `POST` | `/admin/shipping/zones/{zoneId}/rates` | Crear tarifa | ✅ | `{name, description?, rateType, price, minWeight?, maxWeight?, minPrice?, maxPrice?, estimatedDeliveryDays?}` |
| `PUT` | `/admin/shipping/rates/{rateId}` | Actualizar tarifa | ✅ | `{name?, price?, estimatedDeliveryDays?, isActive?}` |
| `DELETE` | `/admin/shipping/rates/{rateId}` | Eliminar tarifa | ✅ | - |

---

## 📧 **NEWSLETTER**

### Newsletter Routes (`/newsletter`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `POST` | `/newsletter/subscribe` | Suscribirse al newsletter | ❌ | `{email, firstName?, lastName?}` |
| `POST` | `/newsletter/unsubscribe` | Desuscribirse | ❌ | `{email}` |
| `GET` | `/newsletter/unsubscribe/{token}` | Desuscribirse via link | ❌ | - |

### Newsletter Management Routes (Admin) (`/admin/newsletter`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/admin/newsletter/subscribers` | Listar suscriptores | ✅ | `?status={subscribed|unsubscribed}&page={page}&limit={limit}` |
| `POST` | `/admin/newsletter/send` | Enviar newsletter | ✅ | `{subject, content, recipientFilter?}` |
| `GET` | `/admin/newsletter/stats` | Estadísticas de newsletter | ✅ | - |

---

## 🔍 **SEARCH**

### Search Routes (`/search`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/search/products` | Búsqueda de productos | ❌ | `?q={query}&category={categoryId}&minPrice={price}&maxPrice={price}&inStock={true|false}&featured={true|false}&sort={relevance|price|name|rating}&order={asc|desc}&page={page}&limit={limit}` |
| `GET` | `/search/suggestions` | Sugerencias de búsqueda | ❌ | `?q={query}&limit={limit}` |
| `GET` | `/search/popular` | Búsquedas populares | ❌ | `?limit={limit}` |

---

## 📊 **ANALYTICS & REPORTS**

### Analytics Routes (`/analytics`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/analytics/dashboard` | Dashboard principal (Admin) | ✅ | `?period={7d|30d|90d|1y}` |
| `GET` | `/analytics/sales` | Reporte de ventas | ✅ | `?period={period}&groupBy={day|week|month}` |
| `GET` | `/analytics/products` | Productos más vendidos | ✅ | `?period={period}&limit={limit}` |
| `GET` | `/analytics/customers` | Análisis de clientes | ✅ | `?period={period}` |
| `GET` | `/analytics/abandoned-carts` | Carritos abandonados | ✅ | `?period={period}&page={page}&limit={limit}` |
| `GET` | `/analytics/inventory` | Análisis de inventario | ✅ | `?lowStock={true|false}` |

---

## 👑 **ADMIN ROUTES**

### Admin User Management (`/admin/users`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/admin/users` | Listar todos los usuarios | ✅ | `?status={active|inactive}&role={role}&page={page}&limit={limit}&search={query}` |
| `GET` | `/admin/users/{userId}` | Obtener usuario específico | ✅ | - |
| `PUT` | `/admin/users/{userId}/status` | Cambiar estado del usuario | ✅ | `{status: 'active'|'inactive'|'banned', reason?}` |
| `PUT` | `/admin/users/{userId}/roles` | Asignar/quitar roles | ✅ | `{roleIds: string[]}` |
| `GET` | `/admin/users/{userId}/orders` | Órdenes del usuario | ✅ | `?page={page}&limit={limit}` |

### Admin Settings (`/admin/settings`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `GET` | `/admin/settings` | Obtener configuraciones | ✅ | - |
| `PUT` | `/admin/settings` | Actualizar configuraciones | ✅ | `{storeName?, currency?, taxRate?, emailSettings?, paymentSettings?}` |
| `GET` | `/admin/settings/audit-logs` | Logs de auditoría | ✅ | `?entityType={type}&action={action}&userId={userId}&page={page}&limit={limit}` |

---

## 📄 **FILE MANAGEMENT**

### File Routes (`/files`)

| Método | Ruta | Descripción | Auth | Body/Params |
|--------|------|-------------|------|-------------|
| `POST` | `/files/upload` | Subir archivo | ✅ | `multipart/form-data: {file, folder: 'products'|'categories'|'avatars'}` |
| `GET` | `/files/{fileId}` | Obtener archivo | ❌ | - |
| `DELETE` | `/files/{fileId}` | Eliminar archivo | ✅ | - |
| `POST` | `/files/bulk-upload` | Subida múltiple | ✅ | `multipart/form-data: {files[], folder}` |

---

## 🔒 **MIDDLEWARE & SECURITY**

### Middleware Stack
1. **CORS** - Cross-Origin Resource Sharing
2. **Rate Limiting** - 100 req/min por IP, 1000 req/min autenticado
3. **Authentication** - JWT Bearer Token
4. **Authorization** - Role-based access control
5. **Validation** - Joi/Yup schema validation
6. **Audit Logging** - Todas las operaciones CRUD
7. **Error Handling** - Manejo centralizado de errores
8. **Request Sanitization** - Limpieza de inputs maliciosos

### Headers Requeridos
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
X-API-Version: 1.0.0
X-Request-ID: <uuid>
```

### Códigos de Respuesta HTTP

| Código | Descripción | Casos de Uso |
|---------|-------------|--------------|
| `200` | Operación exitosa | GET, PUT exitosos |
| `201` | Recurso creado exitosamente | POST exitoso |
| `204` | Operación exitosa sin contenido | DELETE exitoso |
| `400` | Solicitud inválida | Datos malformados |
| `401` | No autenticado | Token inválido/expirado |
| `403` | Sin permisos | Permisos insuficientes |
| `404` | Recurso no encontrado | Producto/Usuario no existe |
| `409` | Conflicto | Email duplicado, SKU duplicado |
| `422` | Error de validación | Validación de negocio falló |
| `429` | Límite de rate excedido | Demasiadas requests |
| `500` | Error interno del servidor | Error no manejado |

---

## 🔄 **WEBHOOKS**

### Webhook Events

| Evento | Descripción | Payload |
|--------|-------------|---------|
| `order.created` | Nueva orden creada | `{orderId, amount, status}` |
| `order.paid` | Orden pagada exitosamente | `{orderId, paymentId, amount}` |
| `order.shipped` | Orden enviada | `{orderId, trackingNumber, carrier}` |
| `order.delivered` | Orden entregada | `{orderId, deliveredAt}` |
| `product.low_stock` | Stock bajo detectado | `{productId, currentStock, threshold}` |
| `user.registered` | Usuario registrado | `{userId, email}` |

### Webhook Configuration
```json
{
  "url": "https://your-site.com/webhooks/ecommerce",
  "events": ["order.created", "order.paid", "order.shipped"],
  "secret": "webhook_secret_key"
}
```

---

## 🚀 **PERFORMANCE & CACHING**

### Caching Strategy

| Endpoint | Cache TTL | Cache Key |
|----------|-----------|-----------|
| `GET /products` | 5 min | `products:{query_hash}` |
| `GET /products/{id}` | 10 min | `product:{id}` |
| `GET /categories` | 30 min | `categories:tree` |
| `GET /cart` | No cache | - |
| `GET /orders` | 2 min | `user_orders:{userId}` |

### Rate Limiting Rules

| Endpoint Pattern | Limit | Window |
|------------------|--------|---------|
| `/auth/*` | 5 req/min | Per IP |
| `/cart/*` | 30 req/min | Per session |
| `/orders` | 10 req/min | Per user |
| `/products` | 100 req/min | Per IP |
| `/admin/*` | 200 req/min | Per user |
