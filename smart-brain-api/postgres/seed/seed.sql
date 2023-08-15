BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) VALUES ('jessie', 'jessie@gmail.com', 5, '2018-01-01');
INSERT INTO login (hash, email) VALUES ('$2a$10$IoviW5HdNVDZ8AahyxAWUOUxD.M7u5fekMKZS17ffl43qDMk7Fc4K', 'jessie@gmail.com');

COMMIT