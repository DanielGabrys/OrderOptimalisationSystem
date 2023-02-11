-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 06 Lut 2023, 11:58
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
-- Struktura tabeli dla tabeli `order_product`
--

CREATE TABLE `order_product` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `amount` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `order_product`
--

INSERT INTO `order_product` (`id`, `order_id`, `product_id`, `amount`, `created_at`, `updated_at`) VALUES
(12209, 2965, 1342, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12210, 2965, 1430, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12211, 2965, 1408, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12212, 2965, 1309, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12213, 2965, 1438, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12214, 2965, 1209, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12215, 2965, 1435, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12216, 2965, 1364, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12217, 2965, 1299, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12218, 2966, 1396, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12219, 2966, 1436, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12220, 2966, 1341, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12221, 2966, 1288, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12222, 2966, 1298, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12223, 2966, 1276, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12224, 2966, 1315, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12225, 2966, 1338, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12226, 2967, 1323, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12227, 2967, 1216, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12228, 2967, 1335, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12229, 2967, 1372, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12230, 2967, 1280, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12231, 2967, 1203, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12232, 2968, 1335, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12233, 2968, 1259, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12234, 2969, 1380, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12235, 2969, 1207, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12236, 2969, 1411, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12237, 2969, 1413, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12238, 2969, 1326, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12239, 2969, 1240, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12240, 2969, 1210, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12241, 2969, 1353, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12242, 2969, 1336, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12243, 2970, 1395, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12244, 2970, 1406, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12245, 2970, 1232, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12246, 2970, 1359, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12247, 2970, 1225, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12248, 2970, 1307, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12249, 2970, 1310, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12250, 2970, 1323, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12251, 2970, 1251, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12252, 2970, 1349, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12253, 2971, 1299, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12254, 2971, 1307, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12255, 2971, 1367, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12256, 2972, 1206, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12257, 2972, 1387, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12258, 2972, 1241, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12259, 2972, 1274, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12260, 2973, 1377, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12261, 2973, 1260, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12262, 2973, 1278, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12263, 2973, 1379, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12264, 2973, 1283, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12265, 2973, 1203, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12266, 2974, 1401, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12267, 2974, 1309, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12268, 2974, 1297, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12269, 2974, 1317, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12270, 2974, 1349, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12271, 2974, 1224, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12272, 2975, 1343, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12273, 2975, 1221, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12274, 2975, 1306, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12275, 2975, 1421, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12276, 2975, 1243, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12277, 2975, 1438, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12278, 2975, 1268, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12279, 2975, 1266, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12280, 2975, 1294, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12281, 2976, 1334, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12282, 2976, 1286, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12283, 2976, 1339, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12284, 2976, 1423, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12285, 2976, 1253, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12286, 2977, 1328, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12287, 2977, 1297, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12288, 2977, 1292, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12289, 2977, 1243, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12290, 2977, 1262, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12291, 2977, 1341, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12292, 2978, 1376, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12293, 2978, 1276, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12294, 2978, 1339, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12295, 2978, 1229, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12296, 2978, 1368, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12297, 2978, 1358, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12298, 2979, 1204, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12299, 2979, 1376, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12300, 2979, 1349, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12301, 2979, 1259, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12302, 2980, 1336, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12303, 2980, 1332, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12304, 2980, 1210, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12305, 2980, 1404, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12306, 2981, 1378, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12307, 2981, 1423, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12308, 2981, 1233, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12309, 2982, 1392, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12310, 2982, 1369, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12311, 2982, 1433, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12312, 2982, 1411, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12313, 2982, 1278, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12314, 2982, 1371, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12315, 2983, 1319, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12316, 2983, 1416, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12317, 2983, 1235, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12318, 2983, 1439, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12319, 2983, 1422, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12320, 2984, 1205, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12321, 2984, 1420, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12322, 2984, 1273, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12323, 2984, 1356, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12324, 2984, 1267, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12325, 2985, 1409, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12326, 2985, 1210, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12327, 2985, 1393, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12328, 2985, 1219, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12329, 2986, 1242, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12330, 2986, 1279, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12331, 2986, 1417, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12332, 2986, 1425, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12333, 2986, 1259, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12334, 2986, 1405, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12335, 2986, 1260, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12336, 2986, 1246, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12337, 2987, 1245, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12338, 2987, 1328, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12339, 2987, 1423, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12340, 2987, 1214, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12341, 2987, 1286, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12342, 2988, 1287, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12343, 2988, 1210, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12344, 2988, 1413, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12345, 2988, 1349, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12346, 2988, 1248, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12347, 2988, 1401, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12348, 2988, 1314, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12349, 2988, 1432, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12350, 2988, 1439, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12351, 2988, 1362, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12352, 2988, 1376, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12353, 2989, 1337, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12354, 2989, 1436, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12355, 2989, 1402, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12356, 2989, 1274, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12357, 2989, 1409, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12358, 2989, 1425, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12359, 2989, 1438, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12360, 2989, 1276, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12361, 2989, 1256, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12362, 2989, 1434, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12363, 2989, 1391, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12364, 2990, 1412, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12365, 2990, 1402, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12366, 2990, 1391, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12367, 2990, 1221, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12368, 2990, 1233, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12369, 2990, 1387, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12370, 2990, 1352, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12371, 2990, 1227, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12372, 2990, 1204, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12373, 2990, 1403, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12374, 2991, 1327, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12375, 2991, 1362, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12376, 2991, 1334, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12377, 2991, 1376, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12378, 2991, 1306, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12379, 2991, 1396, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12380, 2991, 1208, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12381, 2992, 1404, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12382, 2992, 1266, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12383, 2992, 1323, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12384, 2992, 1279, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12385, 2993, 1381, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12386, 2993, 1243, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12387, 2993, 1399, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12388, 2993, 1407, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12389, 2993, 1206, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12390, 2993, 1429, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12391, 2993, 1247, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12392, 2994, 1289, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12393, 2994, 1273, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12394, 2994, 1241, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12395, 2994, 1420, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12396, 2994, 1329, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12397, 2995, 1276, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12398, 2995, 1223, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12399, 2995, 1217, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12400, 2995, 1224, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12401, 2995, 1240, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12402, 2995, 1323, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12403, 2996, 1273, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12404, 2997, 1299, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12405, 2997, 1332, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12406, 2997, 1338, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12407, 2997, 1378, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12408, 2997, 1267, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12409, 2998, 1279, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12410, 2998, 1380, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12411, 2998, 1312, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12412, 2998, 1299, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12413, 2999, 1230, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12414, 2999, 1351, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12415, 2999, 1285, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12416, 2999, 1268, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12417, 2999, 1320, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12418, 2999, 1422, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12419, 2999, 1240, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12420, 3000, 1235, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12421, 3000, 1368, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12422, 3000, 1204, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12423, 3000, 1252, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12424, 3000, 1236, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12425, 3000, 1383, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12426, 3001, 1302, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12427, 3001, 1422, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12428, 3001, 1279, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12429, 3001, 1366, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12430, 3001, 1429, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12431, 3002, 1414, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12432, 3002, 1439, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12433, 3002, 1417, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12434, 3002, 1373, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12435, 3002, 1406, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12436, 3003, 1248, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12437, 3004, 1295, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12438, 3004, 1419, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12439, 3004, 1347, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12440, 3004, 1400, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12441, 3004, 1328, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12442, 3004, 1207, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12443, 3005, 1233, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12444, 3005, 1320, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12445, 3005, 1384, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12446, 3005, 1388, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12447, 3005, 1394, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12448, 3006, 1230, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12449, 3006, 1374, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12450, 3006, 1265, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12451, 3006, 1240, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12452, 3006, 1305, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12453, 3006, 1263, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12454, 3007, 1225, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12455, 3008, 1383, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12456, 3008, 1387, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12457, 3008, 1292, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12458, 3008, 1348, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12459, 3008, 1244, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12460, 3008, 1382, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12461, 3009, 1269, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12462, 3010, 1235, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12463, 3010, 1360, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12464, 3010, 1318, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12465, 3010, 1308, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12466, 3010, 1211, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12467, 3010, 1239, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12468, 3010, 1378, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12469, 3010, 1250, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12470, 3010, 1259, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12471, 3011, 1370, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12472, 3011, 1332, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12473, 3011, 1413, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12474, 3011, 1355, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12475, 3011, 1379, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12476, 3011, 1339, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12477, 3011, 1245, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12478, 3011, 1218, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12479, 3011, 1254, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12480, 3011, 1441, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12481, 3011, 1374, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12482, 3011, 1270, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12483, 3012, 1311, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12484, 3012, 1325, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12485, 3012, 1266, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12486, 3012, 1387, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12487, 3012, 1226, 1, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12488, 3012, 1422, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12489, 3012, 1255, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12490, 3012, 1342, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12491, 3012, 1384, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12492, 3013, 1222, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12493, 3013, 1203, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12494, 3013, 1252, 5, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12495, 3013, 1319, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12496, 3014, 1214, 3, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12497, 3014, 1226, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12498, 3014, 1255, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12499, 3014, 1364, 6, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12500, 3014, 1222, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12501, 3014, 1393, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12502, 3014, 1434, 4, '2023-02-06 09:56:03', '2023-02-06 09:56:03'),
(12503, 3014, 1236, 2, '2023-02-06 09:56:03', '2023-02-06 09:56:03');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_product_order_id_foreign` (`order_id`),
  ADD KEY `order_product_product_id_foreign` (`product_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `order_product`
--
ALTER TABLE `order_product`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12504;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `order_product_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_product_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
