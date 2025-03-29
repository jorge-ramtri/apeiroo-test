\connect to_do_list

-- Create the table for Duties, further updates for this table should be done in a new sql file.
CREATE TABLE IF NOT EXISTS duties (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL
);