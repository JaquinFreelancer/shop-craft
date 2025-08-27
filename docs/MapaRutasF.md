## 4. Mapa de rutas Frontend

Ahora continuemos con el cuarto documento: **Mapa de rutas Frontend**

Este documento define la estructura de navegación, componentes, páginas y flujos de usuario de la aplicación e-commerce, diseñada con arquitectura SPA (Single Page Application) y responsive design.

### Tecnología Base
- **Framework**: React 18+ / Next.js 14+ / Vue 3+ 
- **Router**: React Router v6 / Next.js App Router / Vue Router v4
- **State Management**: Redux Toolkit / Zustand / Pinia
- **UI Framework**: Tailwind CSS / Material-UI / Ant Design
- **Payment Integration**: Stripe Elements / PayPal SDK

### URL Base
```
https://ecommerce.com
```

---

## 🏠 **PUBLIC ROUTES** (No requieren autenticación)

### Landing & Marketing Pages

| Ruta | Componente | Descripción | Meta Tags | Features |
|------|------------|-------------|-----------|----------|
| `/` | `HomePage` | Página principal con productos destacados | SEO optimized | Hero, featured products, categories |
| `/about` | `AboutPage` | Información sobre la tienda | Static content | Company info, values |
| `/contact` | `ContactPage` | Formulario de contacto | Contact form | Contact form, map, info |
| `/privacy` | `PrivacyPage` | Política de privacidad | Legal content | GDPR compliance |
| `/terms` | `TermsPage` | Términos de servicio | Legal content | Legal terms |
| `/faq` | `FAQPage` | Preguntas frecuentes | Help content | Search, categories |
| `/shipping` | `ShippingInfoPage` | Información de envíos | Shipping policy | Rates, zones, delivery times |
| `/returns` | `ReturnsPage` | Política de devoluciones | Return policy | Process, conditions |

### Authentication Pages

| Ruta | Componente | Descripción | Redirects | Features |
|------|------------|-------------|-----------|----------|
| `/login` | `LoginPage` | Formulario de inicio de sesión | → `/account` (if authenticated) | Social login, remember me |
| `/register` | `RegisterPage` | Formulario de registro | → `/verify-email` | Field validation, terms acceptance |
| `/forgot-password` | `ForgotPasswordPage` | Solicitud de reset | → `/login` (after submit) | Email validation |
| `/reset-password/:token` | `ResetPasswordPage` | Restablecer contraseña | → `/login` (after reset) | Password strength meter |
| `/verify-email/:token?` | `EmailVerificationPage` | Verificación de email | → `/account` (after verification) | Auto-redirect, resend option |

### Product Discovery & Shopping

| Ruta | Componente | Descripción | Features | SEO |
|------|------------|-------------|----------|-----|
| `/products` | `ProductListPage` | Catálogo completo de productos | Filters, sorting, pagination, grid/list view | Dynamic meta |
| `/products/:slug` | `ProductDetailPage` | Detalles del producto | Image gallery, variants, reviews, related products | Rich snippets |
| `/categories/:slug` | `CategoryPage` | Productos por categoría | Category filters, breadcrumbs | Category meta |
| `/search` | `SearchResultsPage` | Resultados de búsqueda | Advanced filters, suggestions | Search meta |
| `/search/suggestions` | `SearchSuggestionsPage` | Sugerencias de búsqueda | Autocomplete, popular searches | No index |
| `/brands` | `BrandsPage` | Lista de marcas | Brand grid, search | Brand directory |
| `/brands/:slug` | `BrandPage` | Productos por marca | Brand info, products | Brand meta |
| `/collections/:slug` | `CollectionPage` | Colecciones especiales | Curated products | Collection meta |
| `/deals` | `DealsPage` | Ofertas y descuentos | Sale products, countdown timers | Promo meta |
| `/new-arrivals` | `NewArrivalsPage` | Productos nuevos | Recent products, filters | Fresh content |

### Shopping Cart & Checkout

| Ruta | Componente | Descripción | Features | Auth Required |
|------|------------|-------------|----------|---------------|
| `/cart` | `CartPage` | Carrito de compras | Update quantities, remove items, totals | ❌ |
| `/checkout` | `CheckoutPage` | Proceso de checkout | Multi-step, address forms, payment | ❌* |
| `/checkout/shipping` | `ShippingPage` | Selección de envío | Address form, shipping methods | ❌* |
| `/checkout/payment` | `PaymentPage` | Información de pago | Payment methods, billing address | ❌* |
| `/checkout/review` | `OrderReviewPage` | Revisión final | Order summary, terms acceptance | ❌* |
| `/checkout/success/:orderId` | `OrderSuccessPage` | Confirmación de orden | Order details, tracking info | ❌ |
| `/checkout/failed` | `CheckoutFailedPage` | Pago fallido | Error details, retry options | ❌ |

*❌* = Funciona para invitados con email, mejor experiencia autenticado

### Order & Customer Support

| Ruta | Componente | Descripción | Features | Auth Required |
|------|------------|-------------|----------|---------------|
| `/track-order` | `OrderTrackingPage` | Rastrear orden (invitados) | Order lookup by number + email | ❌ |
| `/track-order/:orderNumber` | `OrderTrackingDetailPage` | Detalles de seguimiento | Status updates, shipping info | ❌ |
| `/reviews/:productSlug` | `ProductReviewsPage` | Todas las reseñas del producto | Pagination, filters, sorting | ❌ |

---

## 🔒 **PROTECTED ROUTES** (Requieren autenticación)

### Main Navigation Structure
```
/account (Layout: AccountLayout)
├── /profile
├── /orders
├── /addresses
├── /wishlist
├── /reviews
└── /settings
```

### Customer Account

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/account` | `AccountDashboardPage` | Panel principal del cliente | Order summary, quick actions |
| `/account/profile` | `ProfilePage` | Información personal | Edit profile, avatar upload |
| `/account/profile/edit` | `EditProfilePage` | Editar perfil | Form validation, photo upload |
| `/account/security` | `SecurityPage` | Configuración de seguridad | Change password, 2FA setup |

### Order Management

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/account/orders` | `OrdersPage` | Historial de órdenes | Status filtering, search, pagination |
| `/account/orders/:orderId` | `OrderDetailPage` | Detalles de la orden | Tracking info, download invoice |
| `/account/orders/:orderId/track` | `OrderTrackingPage` | Seguimiento detallado | Real-time updates, delivery map |
| `/account/orders/:orderId/invoice` | `InvoicePage` | Factura de la orden | Printable invoice, download PDF |
| `/account/orders/:orderId/return` | `ReturnRequestPage` | Solicitar devolución | Return form, reason selection |

### Address Management

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/account/addresses` | `AddressesPage` | Gestión de direcciones | List addresses, set default |
| `/account/addresses/add` | `AddAddressPage` | Agregar nueva dirección | Address form, map integration |
| `/account/addresses/:addressId/edit` | `EditAddressPage` | Editar dirección | Update form, validation |

### Wishlist Management

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/account/wishlist` | `WishlistPage` | Lista de deseos | Move to cart, remove items |
| `/account/wishlist/create` | `CreateWishlistPage` | Crear nueva wishlist | Name, privacy settings |
| `/account/wishlist/:wishlistId` | `WishlistDetailPage` | Detalles de wishlist | Share, manage items |
| `/wishlist/public/:wishlistId` | `PublicWishlistPage` | Wishlist pública | View-only, add to own cart |

### Reviews & Ratings

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/account/reviews` | `MyReviewsPage` | Mis reseñas | Edit, delete own reviews |
| `/account/reviews/write/:productId` | `WriteReviewPage` | Escribir reseña | Rating, photos, verified purchase |
| `/account/reviews/:reviewId/edit` | `EditReviewPage` | Editar reseña | Update rating, text |

### Account Settings

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/account/settings` | `AccountSettingsPage` | Configuraciones generales | Preferences, notifications |
| `/account/settings/notifications` | `NotificationSettingsPage` | Preferencias de notificaciones | Email/SMS preferences |
| `/account/settings/privacy` | `PrivacySettingsPage` | Configuración de privacidad | Data preferences, marketing |
| `/account/settings/delete` | `DeleteAccountPage` | Eliminar cuenta | Confirmation, data download |

---

## 👑 **ADMIN ROUTES** (Solo administradores)

### Admin Panel Structure
```
/admin (Layout: AdminLayout)
├── /dashboard
├── /products
├── /orders
├── /customers
├── /analytics
├── /marketing
└── /settings
```

### Admin Dashboard

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/admin` | `AdminDashboardPage` | Panel principal de administración | KPIs, quick stats, recent activity |
| `/admin/dashboard` | `AdminDashboardPage` | Dashboard detallado | Charts, metrics, alerts |

### Product Management

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/admin/products` | `AdminProductsPage` | Gestión de productos | CRUD, bulk operations, filters |
| `/admin/products/create` | `CreateProductPage` | Crear nuevo producto | Multi-step form, image upload |
| `/admin/products/:productId` | `AdminProductDetailPage` | Detalles del producto | View, quick edit |
| `/admin/products/:productId/edit` | `EditProductPage` | Editar producto | Full edit form, variants |
| `/admin/products/:productId/variants` | `ProductVariantsPage` | Gestión de variantes | Add, edit, delete variants |
| `/admin/products/:productId/images` | `ProductImagesPage` | Gestión de imágenes | Upload, reorder, set primary |
| `/admin/products/import` | `ImportProductsPage` | Importar productos | CSV upload, mapping |
| `/admin/products/export` | `ExportProductsPage` | Exportar productos | CSV/Excel export options |

### Category Management

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/admin/categories` | `AdminCategoriesPage` | Gestión de categorías | Tree view, drag-drop reorder |
| `/admin/categories/create` | `CreateCategoryPage` | Crear categoría | Form, parent selection |
| `/admin/categories/:categoryId/edit` | `EditCategoryPage` | Editar categoría | Update form, SEO settings |

### Order Management

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/admin/orders` | `AdminOrdersPage` | Gestión de órdenes | Status filters, bulk actions |
| `/admin/orders/:orderId` | `AdminOrderDetailPage` | Detalles de la orden | Full order info, actions |
| `/admin/orders/:orderId/edit` | `EditOrderPage` | Editar orden | Update status, add notes |
| `/admin/orders/:orderId/refund` | `RefundOrderPage` | Procesar reembolso | Refund form, payment gateway |
| `/admin/orders/abandoned-carts` | `AbandonedCartsPage` | Carritos abandonados | Recovery emails, analytics |

### Customer Management

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/admin/customers` | `AdminCustomersPage` | Gestión de clientes | Search, filters, bulk actions |
| `/admin/customers/:customerId` | `AdminCustomerDetailPage` | Detalles del cliente | Profile, order history |
| `/admin/customers/:customerId/edit` | `EditCustomerPage` | Editar cliente | Update info, roles |
| `/admin/customers/:customerId/orders` | `CustomerOrdersPage` | Órdenes del cliente | Client order history |

### Inventory Management

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/admin/inventory` | `InventoryPage` | Gestión de inventario | Stock levels, low stock alerts |
| `/admin/inventory/adjustments` | `StockAdjustmentsPage` | Ajustes de stock | Bulk updates, history |
| `/admin/inventory/suppliers` | `SuppliersPage` | Gestión de proveedores | CRUD suppliers |

### Marketing & Promotions

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/admin/coupons` | `AdminCouponsPage` | Gestión de cupones | Create, edit, usage stats |
| `/admin/coupons/create` | `CreateCouponPage` | Crear cupón | Form, conditions, limits |
| `/admin/coupons/:couponId/edit` | `EditCouponPage` | Editar cupón | Update settings |
| `/admin/newsletters` | `NewsletterPage` | Gestión de newsletter | Subscribers, campaigns |
| `/admin/newsletters/create` | `CreateNewsletterPage` | Crear newsletter | Email editor, templates |

### Analytics & Reports

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/admin/analytics` | `AnalyticsPage` | Analíticas generales | Sales, customers, products |
| `/admin/analytics/sales` | `SalesAnalyticsPage` | Análisis de ventas | Revenue charts, trends |
| `/admin/analytics/products` | `ProductAnalyticsPage` | Análisis de productos | Best sellers, performance |
| `/admin/analytics/customers` | `CustomerAnalyticsPage` | Análisis de clientes | Behavior, segments |
| `/admin/reports` | `ReportsPage` | Reportes del sistema | Generate, download reports |

### System Settings

| Ruta | Componente | Descripción | Features |
|------|------------|-------------|----------|
| `/admin/settings` | `AdminSettingsPage` | Configuraciones generales | Store info, preferences |
| `/admin/settings/payments` | `PaymentSettingsPage` | Configuración de pagos | Gateway settings |
| `/admin/settings/shipping` | `ShippingSettingsPage` | Configuración de envíos | Zones, rates |
| `/admin/settings/taxes` | `TaxSettingsPage` | Configuración de impuestos | Tax rates, rules |
| `/admin/settings/users` | `UserManagementPage` | Gestión de usuarios admin | Roles, permissions |
| `/admin/settings/audit` | `AuditLogsPage` | Logs de auditoría | System activity logs |

---

## 📱 **MOBILE-SPECIFIC ROUTES**

### Mobile App Navigation (PWA)

| Ruta | Componente | Descripción | Mobile Features |
|------|------------|-------------|-----------------|
| `/mobile/scanner` | `ProductScannerPage` | Escáner de código de barras | Barcode/QR scanner |
| `/mobile/location` | `StoreLocatorPage` | Localizador de tiendas | GPS, maps integration |
| `/mobile/offline` | `OfflinePage` | Modo offline | Cached products, sync |

---

## 🎨 **LAYOUT COMPONENTS**

### Layout Hierarchy

```
App (Router Provider)
├── PublicLayout
│   ├── Header (Logo, navigation, search, cart, auth)
│   ├── Breadcrumbs
│   ├── Main Content
│   ├── Newsletter Signup
│   └── Footer (Links, social, policies)
├── AuthLayout  
│   ├── Auth Forms
│   ├── Social Login
│   └── Background/Branding
├── AccountLayout (Customer Dashboard)
│   ├── Account Header
│   ├── Account Sidebar (Navigation menu)
│   ├── Main Content Area
│   └── Account Footer
├── AdminLayout
│   ├── Admin TopBar (User menu, notifications)
│   ├── Admin Sidebar (Admin navigation)
│   ├── Admin Content
│   └── Admin Footer
└── CheckoutLayout
    ├── Checkout Header (Logo, progress)
    ├── Checkout Content
    └── Security Footer
```

### Shared Components

| Componente | Descripción | Props | Features |
|------------|-------------|-------|----------|
| `ProductCard` | Tarjeta de producto | `product, showWishlist, showQuickView` | Image, price, rating, actions |
| `ProductGrid` | Grilla de productos | `products, columns, loading` | Responsive grid, skeleton |
| `ProductCarousel` | Carrusel de productos | `products, autoplay, dots` | Swiper, responsive |
| `SearchBar` | Barra de búsqueda | `onSearch, suggestions, filters` | Autocomplete, voice search |
| `PriceDisplay` | Mostrar precio | `price, comparePrice, currency` | Format, discount badge |
| `RatingStars` | Estrellas de calificación | `rating, size, readonly` | Interactive, half stars |
| `AddToCartButton` | Botón agregar al carrito | `product, variant, quantity` | Loading states, success |
| `WishlistButton` | Botón wishlist | `product, variant` | Heart animation |
| `CategoryBreadcrumbs` | Navegación breadcrumb | `categories` | SEO friendly |
| `FilterSidebar` | Filtros de productos | `filters, onFilter` | Price range, categories |
| `SortSelector` | Selector de ordenamiento | `options, value, onChange` | Dropdown, responsive |
| `Pagination` | Paginación | `currentPage, totalPages, onPageChange` | Numbers, prev/next |
| `LoadingSpinner` | Indicador de carga | `size, color, overlay` | Various styles |
| `EmptyState` | Estado vacío | `title, message, action` | Illustrations, CTA |
| `ErrorBoundary` | Manejo de errores | `fallback, onError` | Error reporting |
| `Modal` | Modal genérico | `isOpen, title, children, size` | Responsive, overlay |
| `Toast` | Notificaciones toast | `type, message, duration, action` | Success, error, info |
| `CartSummary` | Resumen del carrito | `items, totals, editable` | Taxes, shipping |
| `AddressForm` | Formulario de dirección | `address, onSubmit, validation` | Country dropdown |
| `PaymentForm` | Formulario de pago | `method, onSubmit` | Stripe/PayPal integration |

---

## 🔄 **NAVIGATION FLOWS**

### Customer Journey Flows

#### **Guest Shopping Flow**
```
/ → /products → /products/:slug → /cart → /checkout → /checkout/success
```

#### **User Registration Flow**
```
/register → /verify-email → /account → /account/profile/edit
```

#### **Product Discovery Flow**
```
/ → /search → /products → /categories/:slug → /products/:slug
```

#### **Checkout Flow**
```
/cart → /checkout → /checkout/shipping → /checkout/payment → /checkout/review → /checkout/success
```

#### **Order Management Flow**
```
/account/orders → /account/orders/:id → /account/orders/:id/track
```

#### **Admin Product Management Flow**
```
/admin/products → /admin/products/create → /admin/products/:id/edit → /admin/products/:id/variants
```

---

## 📊 **STATE MANAGEMENT**

### Redux Store Structure (ejemplo con Redux Toolkit)

```javascript
store/
├── auth/
│   ├── authSlice.js (user, token, isAuthenticated)
│   └── authAPI.js
├── products/
│   ├── productsSlice.js (products, filters, pagination)
│   ├── productDetailSlice.js (current product, variants)
│   └── productsAPI.js
├── cart/
│   ├── cartSlice.js (items, totals, shipping)
│   └── cartAPI.js
├── orders/
│   ├── ordersSlice.js (userOrders, currentOrder)
│   └── ordersAPI.js
├── wishlist/
│   ├── wishlistSlice.js (items, lists)
│   └── wishlistAPI.js
├── categories/
│   ├── categoriesSlice.js (tree, current)
│   └── categoriesAPI.js
├── admin/
│   ├── adminProductsSlice.js
│   ├── adminOrdersSlice.js
│   ├── adminCustomersSlice.js
│   └── adminAPI.js
├── ui/
│   ├── uiSlice.js (modals, toasts, loading)
│   ├── searchSlice.js (query, suggestions, results)
│   └── themeSlice.js (theme, preferences)
└── index.js (store configuration)
```

### Context Providers
```javascript
<AuthProvider>
  <CartProvider>
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <App />
        </Router>
      </ToastProvider>
    </ThemeProvider>
  </CartProvider>
</AuthProvider>
```

---

## 🛡️ **ROUTE PROTECTION & PERMISSIONS**

### Protected Route Component
```javascript
<ProtectedRoute 
  component={AccountPage} 
  requiredAuth={true}
  fallback="/login"
  redirectAfterAuth="/account"
/>

<AdminRoute
  component={AdminDashboard}
  requiredRoles={['admin', 'manager']}
  requiredPermissions={['products.manage']}
  fallback="/unauthorized"
/>
```

### Permission Levels
- **Public**: Acceso sin autenticación
- **Customer**: Usuario autenticado estándar
- **Admin**: Administrador de la tienda
- **Manager**: Gerente con permisos limitados
- **SuperAdmin**: Super administrador del sistema

---

## 📱 **RESPONSIVE DESIGN BREAKPOINTS**

| Breakpoint | Width | Navigation | Layout | Features |
|------------|-------|------------|--------|----------|
| Mobile | < 640px | Hamburger menu | Single column | Touch gestures, swipe |
| Tablet | 640px - 1024px | Collapsible sidebar | Two columns | Touch + mouse |
| Desktop | 1024px - 1440px | Full navigation | Multi-column | Full features |
| Large | > 1440px | Extended layout | Wide columns | Enhanced experience |

---

## 🔍 **SEO & META TAGS**

### Dynamic Meta Tags
```javascript
// Product detail page
<meta name="title" content="{Product Name} - {Store Name}" />
<meta name="description" content="{Product Description}" />
<meta property="og:title" content="{Product Name}" />
<meta property="og:image" content="{Product Primary Image}" />
<meta property="og:url" content="https://ecommerce.com/products/{slug}" />
<meta property="product:price:amount" content="{Product Price}" />
<meta property="product:price:currency" content="USD" />

// Category page
<meta name="title" content="{Category Name} - {Store Name}" />
<meta name="description" content="Shop {Category Name} products at {Store Name}" />

// Search results
<meta name="title" content="Search results for '{Query}' - {Store Name}" />
<meta name="robots" content="noindex, follow" />
```

### Structured Data (JSON-LD)
```javascript
// Product page
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "{Product Name}",
  "description": "{Product Description}",
  "brand": "{Brand Name}",
  "offers": {
    "@type": "Offer",
    "price": "{Price}",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
```

### Sitemap Structure
```
/
/products
/categories/*
/brands/*
/collections/*
/about
/contact
/shipping
/returns
/privacy
/terms
```

---

## ⚡ **PERFORMANCE OPTIMIZATIONS**

### Code Splitting
```javascript
// Lazy loading for routes
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// Dynamic imports for heavy components
const ProductCarousel = lazy(() => import('./components/ProductCarousel'));
```

### Image Optimization
- **Lazy loading**: Intersection Observer para imágenes
- **WebP format**: Formato moderno con fallback
- **Responsive images**: Múltiples tamaños por breakpoint
- **CDN integration**: Optimización automática de imágenes

### Caching Strategy
- **Static assets**: Long-term caching (1 year)
- **API responses**: Short-term caching con SWR/React Query
- **Product images**: CDN caching con versioning
- **Search results**: Client-side caching (5 min)

---

## 🎯 **ERROR HANDLING & FALLBACKS**

### Error Boundaries
| Ruta | Fallback Component | Recovery Action |
|------|-------------------|-----------------|
| `/products/*` | `ProductErrorFallback` | Retry, show alternatives |
| `/checkout/*` | `CheckoutErrorFallback` | Contact support, retry |
| `/admin/*` | `AdminErrorFallback` | Report error, safe mode |
| `/*` | `GlobalErrorFallback` | Reload app, error report |

### 404 Handling
```
/* (Catch-all route) → NotFoundPage → Product suggestions/Search
```

### Offline Handling (PWA)
```
Service Worker → Cached pages → Offline indicator → Sync when online
```

---

## 🔔 **REAL-TIME FEATURES**

### WebSocket Integration
- **Stock updates**: Real-time inventory changes
- **Cart sync**: Multi-device cart synchronization  
- **Order status**: Live order status updates
- **Admin notifications**: New orders, low stock alerts

### Push Notifications (PWA)
- **Order updates**: Shipping confirmations
- **Abandoned cart**: Recovery reminders
- **Back in stock**: Wishlist item availability
- **Promotions**: New deals and discounts