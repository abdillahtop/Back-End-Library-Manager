-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2019 at 12:15 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `lantai1`
--

CREATE TABLE `lantai1` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `writter` varchar(50) NOT NULL,
  `location` text NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lantai1`
--

INSERT INTO `lantai1` (`id`, `name`, `writter`, `location`, `category`) VALUES
(1, 'Dongeng favorite si Kancil', 'Astri Damayanti', 'Lt1.A0', 'Anak-anak'),
(2, 'Kisah Putri Cinderella', 'lintas Media', 'Lt1.A0', 'Anak-anak'),
(3, 'Petualangan Pinokio', 'Carlo Collodi', 'Lt1.A0', 'Anak-anak'),
(4, 'Arduino : Belajar Cepat dan Pemrograman', 'Heri Andrianto', 'Lt1.A1', 'Teknik'),
(5, 'Mengenal Pemrograman React JS', 'Jubite Enterprise', 'Lt1.A1', 'Teknik'),
(6, 'Teknologi Komunikasi Data Modern', 'Jusak', 'Lt1.A1', 'Teknik');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lantai1`
--
ALTER TABLE `lantai1`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lantai1`
--
ALTER TABLE `lantai1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
