DROP DATABASE IF EXISTS eventhop_db;
CREATE DATABASE eventhop_db;

USE eventhop_db;

CREATE TABLE user (
	user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    user_route_one TEXT,
    user_route_two TEXT,
    user_route_three TEXT,
    number_of_groups INT,
	PRIMARY KEY (user_id)
);

CREATE TABLE groups (
	group_id INT NOT NULL AUTO_INCREMENT,
    group_name VARCHAR(80) NOT NULL,
    group_members INT,
    is_event BOOLEAN,
    event_cost DECIMAL(6,2),
    event_spots INT,
    route TEXT,
    PRIMARY KEY(group_id)
);
    
CREATE TABLE user2groups (
	user_id INT NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups (group_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY(user_id, group_id)
);

INSERT INTO user (email, user_name, password)
VALUES ("user@email.com","Andy", "123456");

INSERT INTO user (user_name, password)
VALUES ("user2@email.com", "Zach", "12345");

INSERT INTO user (email, user_name, password)
VALUES ("user3@email.com", "Kaitlyn", "password3");

INSERT INTO groups (email, group_name, group_members, is_event)
VALUES ("user3@email.com", "PartyTown", "32", False);

INSERT INTO groups (email, group_name, group_members, is_event)
VALUES ("Radville", "13", True);

INSERT INTO groups (group_name, group_members, is_event)
VALUES ("Margaritaville", "80", False);

INSERT INTO user2groups (user_id, group_id)
VALUES ("1", "3");

Select * FROM user;
SELECT * FROM groups;
SELECT * FROM user2groups;
