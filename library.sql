-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2019 at 04:56 PM
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
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `writter` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `category_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `name`, `writter`, `location`, `category_id`) VALUES
(1, 'Dongeng favorite si Kancil', 'Astri Damayanti', 'lantai 1,rak A', 1),
(2, 'Kisah Putri Cinderella', 'lintas Media', 'lantai 1,rak A', 1),
(3, 'Petualangan Pinokio', 'Carlo Collodi', 'lantai 1,rak A', 1),
(4, 'Arduino : Belajar Cepat dan Pemrograman', 'Heri Andrianto', 'lantai 2,rak A', 2),
(5, 'Mengenal Pemrograman React JS', 'Jubite Enterprise', 'lantai 2,rak A', 2),
(6, 'Teknologi Komunikasi Data Modern', 'Jusak', 'lantai 2, rak A', 2),
(17, 'Buku Sejarah', 'Anonymous', 'lantai 1,rak B', 2),
(18, 'Buku Sejarah', 'Anonymous', 'lantai 1,rak B', 2),
(19, 'Buku Sejarah', 'Anonymous', 'lantai 2,rak B', 2),
(21, 'Buku DUMMY', 'Anonymous', 'lantai 2,rak B', 1),
(22, 'Buku DUMMY', 'Anonymous', 'lantai 2,rak B', 1);

-- --------------------------------------------------------

--
-- Table structure for table `book_category`
--

CREATE TABLE `book_category` (
  `id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `book_category`
--

INSERT INTO `book_category` (`id`, `category`, `category_id`) VALUES
(1, 'anak-anak', 1),
(2, 'Teknik', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book_category`
--
ALTER TABLE `book_category`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `book_category`
--
ALTER TABLE `book_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
