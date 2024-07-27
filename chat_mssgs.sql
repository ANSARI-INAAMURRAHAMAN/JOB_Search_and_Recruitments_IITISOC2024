-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2024 at 07:59 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recruitment_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_mssgs`
--

CREATE TABLE `chat_mssgs` (
  `id` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Message` varchar(255) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `reg_date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_mssgs`
--

INSERT INTO `chat_mssgs` (`id`, `Username`, `Message`, `receiver_id`, `sender_id`, `reg_date`) VALUES
(83, 'Abhijit', 'hi', 0, 1, 'Wed Jul 24 2024 03:15:01 GMT+0530 (India Standard '),
(84, 'Abhijit', 'sasd', 2, 1, 'Wed Jul 24 2024 03:16:33 GMT+0530 (India Standard '),
(85, 'Abhijit', 'joke', 2, 1, 'Wed Jul 24 2024 03:16:38 GMT+0530 (India Standard '),
(86, 'Abhijit', 'aaaa', 2, 1, 'Wed Jul 24 2024 03:16:44 GMT+0530 (India Standard '),
(87, 'Golu', 'hoy', 3, 2, 'Wed Jul 24 2024 03:22:23 GMT+0530 (India Standard '),
(88, 'Golu', 'sass', 0, 2, 'Wed Jul 24 2024 03:22:27 GMT+0530 (India Standard '),
(89, 'Abhijit', 'dddd', 2, 1, 'Wed Jul 24 2024 03:22:38 GMT+0530 (India Standard '),
(90, 'Abhijit', 'a', 2, 1, 'Wed Jul 24 2024 03:24:25 GMT+0530 (India Standard ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_mssgs`
--
ALTER TABLE `chat_mssgs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_mssgs`
--
ALTER TABLE `chat_mssgs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
