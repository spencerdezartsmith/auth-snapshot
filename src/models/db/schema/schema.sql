DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS users;

CREATE TABLE contacts (
  id serial,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL
);

CREATE TABLE users (
  id serial,
  username VARCHAR(255) CHECK (char_length(username) > 0) NOT NULL,
  password VARCHAR(255) CHECK (char_length(password) > 0) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT ('regular')
)
