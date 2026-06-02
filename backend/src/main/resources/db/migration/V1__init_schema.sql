-- Create custom extensions for UUIDs and search trigrams
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Enum declarations
CREATE TYPE order_status_type AS ENUM ('PENDING', 'PROCESSING', 'AUTHORIZED', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED');
CREATE TYPE payment_gateway_type AS ENUM ('STRIPE', 'RAZORPAY');
CREATE TYPE payment_status_type AS ENUM ('INITIALIZED', 'PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
CREATE TYPE sub_status_type AS ENUM ('ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED');

-- Users table (identity mapped from Firebase Auth)
CREATE TABLE users (
    id VARCHAR(128) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'CUSTOMER',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Catalog: Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Catalog: Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price_cents INTEGER NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE RESTRICT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    metadata JSONB,
    tsv_search tsvector,
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Table (Optimistic locking via version)
CREATE TABLE inventory (
    sku VARCHAR(100) PRIMARY KEY REFERENCES products(sku) ON DELETE RESTRICT,
    available_qty INTEGER NOT NULL CHECK (available_qty >= 0),
    reserved_qty INTEGER NOT NULL CHECK (reserved_qty >= 0),
    version BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Coupons
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_cents INTEGER NOT NULL,
    is_percentage BOOLEAN NOT NULL DEFAULT FALSE,
    max_uses INTEGER,
    used_count INTEGER NOT NULL DEFAULT 0,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Carts
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(128) REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    sku VARCHAR(100) NOT NULL REFERENCES products(sku) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0)
);

-- Orders (Partitioned by range of created_at)
CREATE TABLE orders (
    id UUID NOT NULL,
    order_number VARCHAR(100) NOT NULL,
    user_id VARCHAR(128) NOT NULL REFERENCES users(id),
    status order_status_type NOT NULL DEFAULT 'PENDING',
    total_cents INTEGER NOT NULL,
    discount_cents INTEGER NOT NULL DEFAULT 0,
    shipping_address JSONB NOT NULL,
    billing_address JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Monthly partition examples (Bootstrap standard partitions for 2026/2027)
CREATE TABLE orders_y2026m05 PARTITION OF orders FOR VALUES FROM ('2026-05-01 00:00:00+00') TO ('2026-06-01 00:00:00+00');
CREATE TABLE orders_y2026m06 PARTITION OF orders FOR VALUES FROM ('2026-06-01 00:00:00+00') TO ('2026-07-01 00:00:00+00');
CREATE TABLE orders_y2026m07 PARTITION OF orders FOR VALUES FROM ('2026-07-01 00:00:00+00') TO ('2026-08-01 00:00:00+00');

-- Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    order_created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    sku VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price_cents INTEGER NOT NULL,
    FOREIGN KEY (order_id, order_created_at) REFERENCES orders(id, created_at) ON DELETE CASCADE
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    order_created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    gateway payment_gateway_type NOT NULL,
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    amount_cents INTEGER NOT NULL,
    status payment_status_type NOT NULL DEFAULT 'INITIALIZED',
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id, order_created_at) REFERENCES orders(id, created_at) ON DELETE RESTRICT
);

-- Subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(128) NOT NULL REFERENCES users(id),
    sku VARCHAR(100) NOT NULL REFERENCES products(sku),
    status sub_status_type NOT NULL DEFAULT 'ACTIVE',
    frequency_days INTEGER NOT NULL DEFAULT 30,
    next_billing_date TIMESTAMP WITH TIME ZONE NOT NULL,
    payment_token VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id VARCHAR(128) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs (Partitioned by range of created_at)
CREATE TABLE audit_logs (
    id UUID NOT NULL,
    actor_id VARCHAR(128) NOT NULL,
    action VARCHAR(255) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    changes JSONB NOT NULL,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

CREATE TABLE audit_logs_y2026m05 PARTITION OF audit_logs FOR VALUES FROM ('2026-05-01 00:00:00+00') TO ('2026-06-01 00:00:00+00');
CREATE TABLE audit_logs_y2026m06 PARTITION OF audit_logs FOR VALUES FROM ('2026-06-01 00:00:00+00') TO ('2026-07-01 00:00:00+00');

-- Admin Actions Tracker
CREATE TABLE admin_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id VARCHAR(128) NOT NULL REFERENCES users(id),
    action_type VARCHAR(100) NOT NULL,
    target_resource VARCHAR(255) NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Idempotency Records
CREATE TABLE idempotency_records (
    idempotency_key VARCHAR(255) PRIMARY KEY,
    response_code INTEGER NOT NULL,
    response_body TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Outbox Events table for CDC / Eventual Consistency Sync
CREATE TABLE event_outbox (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aggregate_type VARCHAR(100) NOT NULL,
    aggregate_id VARCHAR(100) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    processed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance engineering
CREATE INDEX idx_products_search ON products USING GIN (tsv_search);
CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);
CREATE INDEX idx_products_active ON products(active) WHERE deleted_at IS NULL;
CREATE INDEX idx_inventory_sku ON inventory(sku);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_outbox_unprocessed ON event_outbox(created_at) WHERE processed = FALSE;
