-- Ejecutar en SQL Editor de Supabase Dashboard

-- 1. Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT ''
);

-- 2. Crear tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  category_id TEXT NOT NULL REFERENCES categories(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Índice para búsquedas por categoría
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);

-- 4. Insertar categorías
INSERT INTO categories (id, name, description) VALUES
  ('cajas', 'Cajas de Regalo', 'Cajas de regalo con un diseño elegante y una variedad de productos'),
  ('desayunos', 'Desayunos', 'Desayunos deliciosos y saludables preparados con ingredientes frescos y orgánicos')
ON CONFLICT (id) DO NOTHING;

-- 5. Insertar productos
INSERT INTO products (id, name, description, price, image, category_id) VALUES
  ('corazon_red_oso', 'Box de Corazón con Peluche Oso', 'Elegante box en forma de corazón de cartón corrugado. Incluye un peluche de oso (colores según stock), 6 flores de cinta de raso (colores a elección), 6 bombones Ferrero Rocher, cinta de envoltura, lazo decorativo y una mariposa dorada. Se entrega con tarjeta de regalo.', 1850, '/products/corazon_red_oso.jpg', 'cajas'),
  ('corazon_red', 'Box Corazón Grande Red', 'Box grande en forma de corazón de cartón corrugado. Incluye 8 flores de cinta de raso (colores a elección), 12 bombones Ferrero Rocher, cinta de envoltura, lazo decorativo y una mariposa dorada. Se entrega con tarjeta de regalo.', 1750, '/products/corazon_red.jpg', 'cajas'),
  ('girasol_bombones', 'Box Girasol con Bombones', 'Caja decorada con motivo de girasol. Incluye 4 flores de cinta de raso (colores a elección), 6 bombones Ferrero Rocher, tarjeta de regalo, cinta de envoltura y detalles decorativos.', 1350, '/products/girasol_bombones.jpg', 'cajas'),
  ('caja_mixta', 'Caja Mixta', 'Caja mediana cuadrada con 3 flores de cinta de raso, 5 bombones Ferrero Rocher, un peluche pequeño (sujeto a stock), tarjeta y cinta de envoltura.', 1650, '/products/caja_mixta.jpg', 'cajas'),
  ('box_carta', 'Box Carta', 'Caja tipo carta con diseño romántico. Incluye 4 flores de cinta de raso (colores a elección), 4 bombones Ferrero Rocher, tarjeta de regalo, lazo decorativo y cinta de envoltura.', 1000, '/products/box_carta.jpg', 'cajas'),
  ('canasta_bombones', 'Canasta de Bombones', 'Canasta decorativa con 12 bombones Ferrero Rocher, 2 flores de cinta de raso, tarjeta de regalo y lazo decorativo.', 1450, '/products/canasta_bombones.jpg', 'cajas'),
  ('desayuno_clasico', 'Desayuno Clásico', 'Desayuno tradicional que incluye: café, jugo de naranja natural, medialunas, facturas variadas y fruta de estación. Presentado en bandeja decorativa.', 1200, '/products/desayuno_clasico.jpg', 'desayunos'),
  ('desayuno_premium', 'Desayuno Premium', 'Desayuno completo con café especial, jugo exprimido, medialunas artesanales, facturas rellenas, fruta fresca, yogur natural con granola y mini torta. Incluye tarjeta de regalo.', 1800, '/products/desayuno_premium.jpg', 'desayunos'),
  ('desayuno_saludable', 'Desayuno Saludable', 'Desayuno fitness con bowl de açaí, granola casera, frutas frescas, yogur griego, jugo verde detox, té de hierbas y pan integral con palta.', 1400, '/products/desayuno_saludable.jpg', 'desayunos'),
  ('desayuno_romantico', 'Desayuno Romántico', 'Desayuno para dos con café, jugo de naranja, medialunas en forma de corazón, facturas, frutillas con chocolate, queso y dulce, y una rosa natural. Incluye tarjeta de regalo personalizada.', 2200, '/products/desayuno_romantico.jpg', 'desayunos')
ON CONFLICT (id) DO NOTHING;

-- 6. Configurar Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 7. Políticas: cualquiera puede leer
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);

-- 8. Políticas: solo usuarios autenticados pueden escribir (admin)
CREATE POLICY "Authenticated can insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update products" ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete products" ON products FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can insert categories" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update categories" ON categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete categories" ON categories FOR DELETE USING (auth.role() = 'authenticated');

-- 9. Crear bucket de Storage para imágenes de productos
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 10. Políticas para el bucket: cualquiera puede leer imágenes
CREATE POLICY "Public can read product images"
ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

-- 11. Solo autenticados pueden subir/actualizar/eliminar imágenes
CREATE POLICY "Authenticated can upload product images"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update product images"
ON storage.objects FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete product images"
ON storage.objects FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
