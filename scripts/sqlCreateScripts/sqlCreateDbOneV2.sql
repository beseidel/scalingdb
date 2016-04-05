SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

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
  `business_name` VARCHAR(50) NULL,
  `owner_first_name` VARCHAR(50) NULL,
  `owner_last_name` VARCHAR(50) NULL,
  `updated_at` DATETIME NULL,
  `created_at` DATETIME NULL,
  `image_link` VARCHAR(50) NULL,
  `street_address` VARCHAR(55) NULL,
  `city` VARCHAR(55) NULL,
  `zipcode` VARCHAR(55) NULL,
  `country` VARCHAR(55) NULL,
  `lat` DECIMAL NULL,
  `lon` DECIMAL NULL,
  `first_three_number` INT(3) NULL,
  `area_code` INT(3) NULL,
  `last_four_number` INT(4) NULL,
  `number_of_employee` DECIMAL(20) NULL,
  `department` VARCHAR(55) NULL,
  `slogan` VARCHAR(255) NULL,
  `annual_business_cost` DECIMAL(20) NULL,
  `annual_revenue` DECIMAL(20) NULL,
  `annual_profit` DECIMAL(20) NULL,
  `number_of_like` INT(8) NULL,
  `number_of_dislike` INT(8) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
