CREATE TABLE lists (
  id serial,
  name VARCHAR(96) NOT NULL,
  PRIMARY KEY (id),
)

CREATE TABLE items (
  id serial,
  list_id int NOT NULL,
  description VARCHAR(255),
  checked boolean DEFAULT TRUE,
  PRIMARY KEY (id),
  FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
)