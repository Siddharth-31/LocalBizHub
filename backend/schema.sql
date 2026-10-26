
CREATE TABLE IF NOT EXISTS businesses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    location VARCHAR(150) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enquiries (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(id),
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO businesses (name, category, location, description)
SELECT 'Pune Tech Solutions', 'Technology', 'Pune',
       'IT support and web development services.'
WHERE NOT EXISTS (
    SELECT 1 FROM businesses WHERE name = 'Pune Tech Solutions'
);

INSERT INTO businesses (name, category, location, description)
SELECT 'Green Leaf Cafe', 'Food', 'Pune',
       'Fresh food and beverages.'
WHERE NOT EXISTS (
    SELECT 1 FROM businesses WHERE name = 'Green Leaf Cafe'
);

INSERT INTO businesses (name, category, location, description)
SELECT 'Local Craft Studio', 'Handicrafts', 'Nashik',
       'Handmade gifts and local products.'
WHERE NOT EXISTS (
    SELECT 1 FROM businesses WHERE name = 'Local Craft Studio'
);
