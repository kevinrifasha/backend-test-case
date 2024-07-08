CREATE DATABASE IF NOT EXISTS mini_library;

\c library

CREATE TABLE IF NOT EXISTS Members (
    member_id SERIAL PRIMARY KEY,
    member_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    is_penalized BOOLEAN DEFAULT FALSE,
    penalty_end_date DATE
);


CREATE TABLE IF NOT EXISTS Books (
    book_id SERIAL PRIMARY KEY,
    book_code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,    
    stock INT 
);


CREATE TABLE IF NOT EXISTS Transactions (
    transaction_id SERIAL PRIMARY KEY,
    member_id INT NOT NULL,
    member_code VARCHAR(50) NOT NULL,
    book_id INT NOT NULL,
    book_code VARCHAR(50) NOT NULL,
    borrow_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY (member_id) REFERENCES Members(member_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

