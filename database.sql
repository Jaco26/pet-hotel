CREATE TABLE owners
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR
);

CREATE TABLE pets
(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    breed VARCHAR,
    color VARCHAR
);

CREATE TABLE visits
(
    id SERIAL PRIMARY KEY,
    check_in DATE,
    check_out DATE,
    pet_id INT references pets
);


CREATE TABLE pets_owners
(
    id SERIAL PRIMARY KEY,
    pet_id INT references pets,
    owner_id INT references owners
);