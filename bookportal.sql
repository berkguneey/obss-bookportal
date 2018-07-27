-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 26 Tem 2018, 22:43:30
-- Sunucu sürümü: 10.1.33-MariaDB
-- PHP Sürümü: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `bookportal`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `author`
--

CREATE TABLE `author` (
  `author_id` int(11) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `author_surname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `author`
--

INSERT INTO `author` (`author_id`, `author_name`, `author_surname`) VALUES
(1, 'Roger', 'Hobbs'),
(2, 'Dan', 'Brown'),
(3, 'Cemal', 'Süreya'),
(4, 'Paulo', 'Coelho'),
(5, 'George', 'Orwell'),
(6, 'Sabahattin', 'Ali'),
(12, 'Aziz', 'Nesin');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `book`
--

CREATE TABLE `book` (
  `book_id` int(11) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `book_src` varchar(255) NOT NULL,
  `author_id` int(11) NOT NULL,
  `book_added_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `book`
--

INSERT INTO `book` (`book_id`, `book_name`, `book_src`, `author_id`, `book_added_date`) VALUES
(4, 'Cehennem', 'http://www.altinkitaplar.com.tr/static/img/2013/05/dan-brown-cehennem4-m.jpg', 2, '2018-07-21'),
(10, 'Hayalet Adam', 'https://www.kitapberlin.com/u/kitapberlin/img/b/h/a/hayalet-adam56238874d6fcca19c6753d2fb06fa493.jpg', 1, '2018-07-21'),
(11, 'Sevda Sözleri', 'https://i.dr.com.tr/cache/600x600-0/originals/0000000057951-1.jpg', 3, '2018-07-21'),
(12, 'Üvercinka', 'https://content.babil.com/urun/37b7cab0e22c48a89b97e3c4af914051/Front/Big', 3, '2018-07-22'),
(14, 'Simyacı', 'https://i.dr.com.tr/cache/600x600-0/originals/0000000064552-1.jpg', 4, '2018-07-22'),
(15, 'Hippie', 'https://i.idefix.com/cache/600x600-0/originals/0001760883001-1.jpg', 4, '2018-07-22'),
(16, 'Wigan İskelesi Yolu', 'https://canyayinlari.com/Upload/BooksImage/9789750732867.jpg', 5, '2018-07-22'),
(17, '1984', 'https://i.dr.com.tr/cache/600x600-0/originals/0000000064038-1.jpg', 5, '2018-07-22'),
(18, 'İçimizdeki Şeytan', 'https://i.dr.com.tr/cache/600x600-0/originals/0000000058246-1.jpg', 6, '2018-07-24'),
(24, 'Şimdiki Çocuklar Harika', 'https://i.dr.com.tr/cache/600x600-0/originals/0000000193784-1.jpg', 12, '2018-07-26');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_surname` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_surname`, `user_email`, `user_password`, `user_role`) VALUES
(1, 'Berk', 'Güney', 'berkcanguney@gmail.com', '$2a$10$4lV/3kVBRxqUd8QdKh6XxeAgGP3HKe8Zp42WnqsipC0m0kvOSnLwS', 'ROLE_ADMIN'),
(2, 'Barış', 'Aytekin', 'baytekin96@gmail.com', '$2a$10$DJNv7NqVDifvMexxu8GEauCYDHEf3HflBhX03mMXLf8QKksZU9jfS', 'ROLE_USER'),
(4, 'Mutlu', 'Eren', 'mutlueren01@gmail.com', '$2a$10$pXyDqM4XMH3VwnLaIJY0L.Qgj.DhsZZuR7vB.4vIWBeJcJMYibWNi', 'ROLE_USER');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `user_to_book_relation`
--

CREATE TABLE `user_to_book_relation` (
  `relation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `relation_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `user_to_book_relation`
--

INSERT INTO `user_to_book_relation` (`relation_id`, `user_id`, `book_id`, `relation_type`) VALUES
(4, 1, 10, 2),
(5, 1, 11, 2),
(8, 1, 12, 1),
(10, 2, 4, 2),
(15, 1, 15, 2);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`author_id`);

--
-- Tablo için indeksler `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Tablo için indeksler `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Tablo için indeksler `user_to_book_relation`
--
ALTER TABLE `user_to_book_relation`
  ADD PRIMARY KEY (`relation_id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `author`
--
ALTER TABLE `author`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Tablo için AUTO_INCREMENT değeri `book`
--
ALTER TABLE `book`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Tablo için AUTO_INCREMENT değeri `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `user_to_book_relation`
--
ALTER TABLE `user_to_book_relation`
  MODIFY `relation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`);

--
-- Tablo kısıtlamaları `user_to_book_relation`
--
ALTER TABLE `user_to_book_relation`
  ADD CONSTRAINT `user_to_book_relation_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  ADD CONSTRAINT `user_to_book_relation_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
