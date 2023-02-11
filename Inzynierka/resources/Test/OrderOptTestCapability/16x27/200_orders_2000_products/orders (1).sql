-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 06 Lut 2023, 11:57
-- Wersja serwera: 8.0.32-0ubuntu0.20.04.2
-- Wersja PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `Inzynierka`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `grid_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `orders`
--

INSERT INTO `orders` (`id`, `primary`, `created_at`, `updated_at`, `grid_id`) VALUES
(2965, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2966, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2967, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2968, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2969, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2970, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2971, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2972, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2973, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2974, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2975, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2976, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2977, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2978, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2979, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2980, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2981, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2982, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2983, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2984, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2985, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2986, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2987, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2988, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2989, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2990, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2991, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2992, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2993, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2994, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2995, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2996, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2997, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2998, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(2999, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3000, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3001, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3002, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3003, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3004, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3005, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3006, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3007, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3008, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3009, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3010, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3011, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3012, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3013, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22),
(3014, 0, '2023-02-06 09:56:03', '2023-02-06 09:56:03', 22);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_grid_id_foreign` (`grid_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5030;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_grid_id_foreign` FOREIGN KEY (`grid_id`) REFERENCES `grids` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
