-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema scalingdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema scalingdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `scalingdb` DEFAULT CHARACTER SET utf8 ;
USE `scalingdb` ;

-- -----------------------------------------------------
-- Table `scalingdb`.`businesses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scalingdb`.`businesses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `business_name` VARCHAR(100) NULL,
  `owner_first_name` VARCHAR(100) NULL,
  `owner_last_name` VARCHAR(100) NULL,
  `image_link` VARCHAR(255) NULL,
  `updated_at` DATETIME NULL,
  `created_at` DATETIME NULL,
  `bus_id` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scalingdb`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scalingdb`.`addresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street_address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `zipcode` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  `lat` DECIMAL NULL,
  `lon` DECIMAL NULL,
  `first_three_number` INT(3) NULL,
  `area_code` INT(3) NULL,
  `last_four_number` INT(4) NULL,
  `bus_id`INT NOT NULL,
  `business_id` INT NOT NULL,
  PRIMARY KEY (`id`, `business_id`),
  INDEX `fk_address_businesses_idx` (`business_id` ASC),
  CONSTRAINT `fk_address_businesses`
    FOREIGN KEY (`business_id`)
    REFERENCES `scalingdb`.`businesses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scalingdb`.`business_infos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scalingdb`.`business_infos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number_of_employee` DECIMAL(20) NULL,
  `department` VARCHAR(45) NULL,
  `slogan` VARCHAR(255) NULL,
  `annual_business_cost` DECIMAL(20) NULL,
  `annual_revenue` DECIMAL(20) NULL,
  `annual_profit` DECIMAL(20) NULL,
  `number_of_like` INT NULL,
  `number_of_dislike` INT NULL,
  `bus_id`INT NOT NULL,
  `business_id` INT NOT NULL,
  PRIMARY KEY (`id`, `business_id`),
  INDEX `fk_business_info_businesses1_idx` (`business_id` ASC),
  CONSTRAINT `fk_business_info_businesses1`
    FOREIGN KEY (`business_id`)
    REFERENCES `scalingdb`.`businesses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;