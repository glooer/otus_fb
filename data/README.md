LOAD DATA LOCAL INFILE "C:/Users/User/Downloads/myFile0/myFile5.csv" INTO TABLE test.t_users
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(email,password,first_name,last_name,age,sex,interests,city);