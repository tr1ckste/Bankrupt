DROP TABLE IF EXISTS client;
CREATE TABLE client(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  login VARCHAR(30),
  password VARCHAR(30)
);

DROP TABLE IF EXISTS bank;
CREATE TABLE bank (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(30),
  interestRate REAL,
  maximumLoan BIGINT,
  minimumDownPayment INTEGER,
  loanTerm INTEGER,
  clientId INTEGER,
  FOREIGN KEY (clientId) REFERENCES client(id)
);

DROP TABLE IF EXISTS loan;
CREATE TABLE loan (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  downPayment BIGINT,
  loan BIGINT,
  loanTerm INTEGER,
  monthlyPayment INTEGER,
  bankId INTEGER,
  FOREIGN KEY (bankId) REFERENCES bank(id)
);
