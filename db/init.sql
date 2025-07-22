CREATE TABLE IF NOT EXISTS diplomas (
  id SERIAL PRIMARY KEY,
  student_name TEXT,
  institution TEXT,
  issue_date DATE,
  is_valid BOOLEAN DEFAULT TRUE
);
