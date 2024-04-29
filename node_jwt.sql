/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 100432
Source Host           : localhost:3306
Source Database       : node_jwt

Target Server Type    : MYSQL
Target Server Version : 100432
File Encoding         : 65001

Date: 2024-04-29 18:15:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `picUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('1', 'cat6', '17143131261097361-.JPG', '2024-04-22 16:33:24', '2024-04-28 14:06:49');
INSERT INTO `categories` VALUES ('6', 'cat7', '17143131261097361-.JPG', '2024-04-28 14:05:26', '2024-04-28 14:05:26');

-- ----------------------------
-- Table structure for prodimages
-- ----------------------------
DROP TABLE IF EXISTS `prodimages`;
CREATE TABLE `prodimages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `picUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `prodimages_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of prodimages
-- ----------------------------
INSERT INTO `prodimages` VALUES ('4', '17143159746396742-.JPG', '2024-04-28 14:52:54', '2024-04-28 14:52:54', '4');
INSERT INTO `prodimages` VALUES ('5', '17143159806706742-.JPG', '2024-04-28 14:53:00', '2024-04-28 14:53:00', '5');
INSERT INTO `prodimages` VALUES ('6', '17143159904226742-.JPG', '2024-04-28 14:53:10', '2024-04-28 14:53:10', '6');
INSERT INTO `prodimages` VALUES ('7', '17143159945846742-.JPG', '2024-04-28 14:53:14', '2024-04-28 14:53:14', '7');
INSERT INTO `prodimages` VALUES ('8', '17143159984406742-.JPG', '2024-04-28 14:53:18', '2024-04-28 14:53:18', '8');
INSERT INTO `prodimages` VALUES ('9', '17143160100996742-.JPG', '2024-04-28 14:53:30', '2024-04-28 14:53:30', '9');
INSERT INTO `prodimages` VALUES ('10', '17143161306306820-.JPG', '2024-04-28 14:55:30', '2024-04-28 14:55:30', '10');
INSERT INTO `prodimages` VALUES ('11', '17143167058386820-.JPG', '2024-04-28 15:05:05', '2024-04-28 15:05:05', '11');
INSERT INTO `prodimages` VALUES ('12', '17143167058666820-.JPG', '2024-04-28 15:05:05', '2024-04-28 15:05:05', '11');
INSERT INTO `prodimages` VALUES ('13', '17143167058987005-.JPG', '2024-04-28 15:05:06', '2024-04-28 15:05:06', '11');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('4', 'Ani', '111111', '12', 'good', null, '2024-04-28 14:52:54', '2024-04-29 14:07:03', '1', '1');
INSERT INTO `products` VALUES ('5', 'prod2', '119999', '130', 'good', '0', '2024-04-28 14:53:00', '2024-04-28 15:58:34', '1', '6');
INSERT INTO `products` VALUES ('6', 'Ani', '119999', '130', 'good', '0', '2024-04-28 14:53:10', '2024-04-29 14:14:18', '1', '6');
INSERT INTO `products` VALUES ('7', 'prod5', '119999', '130', 'good', '0', '2024-04-28 14:53:14', '2024-04-28 14:53:14', '1', '6');
INSERT INTO `products` VALUES ('8', 'prod4', '119999', '130', 'good', '0', '2024-04-28 14:53:18', '2024-04-28 14:53:18', '1', '6');
INSERT INTO `products` VALUES ('9', 'prod7', '119999', '130', 'good', '0', '2024-04-28 14:53:30', '2024-04-28 14:53:30', '1', '1');
INSERT INTO `products` VALUES ('10', 'prod7', '119999', '130', 'good', '0', '2024-04-28 14:55:30', '2024-04-28 14:55:30', '1', '1');
INSERT INTO `products` VALUES ('11', 'prod12', '119999', '130', 'good', '0', '2024-04-28 15:05:05', '2024-04-28 15:05:05', '1', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `emailToken` varchar(255) DEFAULT NULL,
  `isVerified` tinyint(4) DEFAULT 0,
  `refreshToken` varchar(255) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'Anna1', 'Anyan1', '11@gmail.com', '$2b$10$dHbA02/GqTnHxG9s3Ap76eJQ3UQLpGLb.032kjrS/sHdj/suK/XSm', 'AD83FA', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFubmExIiwic3VybmFtZSI6IkFueWFuMSIsImVtYWlsIjoiMTFAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6MSwidHlwZSI6MCwiaWF0IjoxNzE0Mzk5MDU4LCJleHAiOjE3MTQ0MDA1NTh9.cB3WjrT0jQzh5OPUbzlTm9Fze7uje_9fJ4ieOrXH4Es', '0', '2024-04-22 16:17:30', '2024-04-29 13:57:38');
INSERT INTO `users` VALUES ('2', 'Admin', 'Admin', 'admin@gmail.com', '$2b$10$Kh0FrXg3FClP5IETSeu6qOFvg.2RnoSwXFpzrinsGVW5Sy7yqGn82', 'F05C16', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFkbWluIiwic3VybmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc1ZlcmlmaWVkIjoxLCJ0eXBlIjoxLCJpYXQiOjE3MTQzOTg1MjgsImV4cCI6MTcxNDQwMDAyOH0.AVDTdX4bJrqK0Paq0I00Hsf3xNu6uQiOKeTSINyRqSg', '1', '2024-04-22 16:17:55', '2024-04-29 13:48:48');

-- ----------------------------
-- Table structure for wishlists
-- ----------------------------
DROP TABLE IF EXISTS `wishlists`;
CREATE TABLE `wishlists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `userId` (`userId`),
  CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `wishlists_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of wishlists
-- ----------------------------
INSERT INTO `wishlists` VALUES ('1', '2024-04-28 15:55:13', '2024-04-28 15:55:13', '4', '1');
INSERT INTO `wishlists` VALUES ('2', '2024-04-28 15:55:28', '2024-04-28 15:55:28', '6', '1');
SET FOREIGN_KEY_CHECKS=1;
