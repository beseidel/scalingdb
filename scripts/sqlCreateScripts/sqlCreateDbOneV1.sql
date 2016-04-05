SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema scalingdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `scalingdb` DEFAULT CHARACTER SET utf8 ;
USE `scalingdb` ;

-- -----------------------------------------------------
-- Table ` scalingdb`.`businesses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scalingdb`.`businesses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `business_name` TEXT NULL,
  `owner_first_name` TEXT NULL,
  `owner_last_name` TEXT NULL,
  `image_link` TEXT NULL,
  `street_address` TEXT NULL,
  `city` TEXT NULL,
  `zipcode` TEXT NULL,
  `country` TEXT NULL,
  `lat` DECIMAL NULL,
  `lon` DECIMAL NULL,
  `area_code` TEXT NULL,
  `first_three_number` TEXT NULL,
  `last_four_number` TEXT NULL,
  `number_of_employee` TEXT NULL,
  `department` TEXT NULL,
  `slogan` TEXT NULL,
  `annual_business_cost` TEXT NULL,
  `annual_revenue` TEXT NULL,
  `annual_profit` TEXT NULL,
  `number_of_like` INT NULL,
  `number_of_dislike` INT NULL,
  `updated_at` DATETIME NULL,
  `created_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;