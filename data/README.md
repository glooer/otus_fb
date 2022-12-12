SET GLOBAL local_infile=1;

LOAD DATA LOCAL INFILE "C:/learn/git/otus_fb/data/users/myFile1.csv" INTO TABLE test.t_users
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(email,password,first_name,last_name,age,sex,interests,city);