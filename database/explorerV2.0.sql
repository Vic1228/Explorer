-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-03-03 04:44:32
-- 伺服器版本： 10.4.22-MariaDB
-- PHP 版本： 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `explorer`
--

-- --------------------------------------------------------

--
-- 資料表結構 `privateitems`
--

CREATE TABLE `privateitems` (
  `tripId` int(20) NOT NULL,
  `privateItem` varchar(20) CHARACTER SET utf8 NOT NULL,
  `itemCount` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `privateitems`
--

INSERT INTO `privateitems` (`tripId`, `privateItem`, `itemCount`) VALUES
(2, 'bear', 5),
(2, 'elephant', 4),
(2, 'horse', 6),
(2, 'monkey', 3),
(2, 'plant', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `schedule`
--

CREATE TABLE `schedule` (
  `tripId` int(20) NOT NULL,
  `day` int(20) NOT NULL,
  `startTime` time NOT NULL,
  `activity` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 資料表結構 `shareditems`
--

CREATE TABLE `shareditems` (
  `tripId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `sharedItem` varchar(20) CHARACTER SET utf8 NOT NULL,
  `itemCount` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `shareditems`
--

INSERT INTO `shareditems` (`tripId`, `userId`, `sharedItem`, `itemCount`) VALUES
(2, 1, 'tent4p', NULL),
(2, 2, 'tent3p', 2),
(2, 3, 'tent3p', 1),
(2, 4, 'tent4p', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `spotcomments`
--

CREATE TABLE `spotcomments` (
  `number` int(20) NOT NULL,
  `spotId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `spotMessageDate` datetime NOT NULL,
  `spotMessageText` varchar(255) DEFAULT NULL,
  `spotMsgNum` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `spots`
--

CREATE TABLE `spots` (
  `spotId` int(20) NOT NULL,
  `spotName` varchar(20) NOT NULL,
  `spotDetail` varchar(255) DEFAULT NULL,
  `spotImg` longblob DEFAULT NULL,
  `spotArea` varchar(20) DEFAULT NULL,
  `placeID` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `spots`
--

INSERT INTO `spots` (`spotId`, `spotName`, `spotDetail`, `spotImg`, `spotArea`, `placeID`) VALUES
(1, '雪山', '424台灣台中市和平區雪山', NULL, '中', 'ChIJH0OLXIhfaDQRe2M3VHul_nY'),
(2, '翡翠谷水廉瀑布', '972台灣花蓮縣秀林鄉榕樹', NULL, '東', 'ChIJ_a1qN2SiaDQRZHNavQE-JnM'),
(3, '火炎山登山口', '367台灣苗栗縣三義鄉火炎山登山口', NULL, '中', 'ChIJCQG9vQwFaTQRLe7JGdAOZVk'),
(4, '賊仔澳玻璃海灘', '270台灣宜蘭縣蘇澳鎮造船路', NULL, '北', 'ChIJ30vCQtzpZzQRY_ZjcfWOjDk'),
(5, '燭台沙灘', '208台灣新北市金山區磺港里', NULL, '北', 'ChIJ8S89IWhLXTQRIwebUtrDH1w'),
(6, '蝙蝠洞瀑布', '715台灣台南市楠西區灣丘里', NULL, '南', 'ChIJUalgY62KbjQR6zGh_oOih1w'),
(7, '金樽陸連島', '959台灣台東縣東河鄉\r\n', NULL, '東', 'ChIJpb0epRKfbzQR2FJHsZNy3bw'),
(8, '雲龍瀑布', '556台灣南投縣信義鄉', NULL, '中', 'ChIJ745sjlAmbzQRgds_w0ah-lw'),
(9, '北大武山步道', '921台灣屏東縣泰武鄉', NULL, '南', 'ChIJU8R7M6w6bjQRMAjp0TYLshA'),
(10, '精英瀑布', '546台灣南投縣仁愛鄉精英村\r\n', NULL, '中', 'ChIJu2DussXBaDQRsbt2lWVVSv8');

-- --------------------------------------------------------

--
-- 資料表結構 `tripchatboard`
--

CREATE TABLE `tripchatboard` (
  `number` int(11) NOT NULL,
  `tripId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `chatTime` datetime NOT NULL,
  `chatMessage` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `chatImgNum` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `tripchatboard`
--

INSERT INTO `tripchatboard` (`number`, `tripId`, `userId`, `chatTime`, `chatMessage`, `chatImgNum`) VALUES
(1, 1, 1, '2022-03-03 04:43:54', '1', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `tripmembers`
--

CREATE TABLE `tripmembers` (
  `tripId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `positionState` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `tripmembers`
--

INSERT INTO `tripmembers` (`tripId`, `userId`, `positionState`) VALUES
(2, 1, 2),
(2, 2, 1),
(2, 3, 1),
(2, 4, 1),
(2, 5, 0),
(2, 6, 0),
(3, 1, 1),
(3, 2, 2),
(3, 4, 0),
(3, 5, 0),
(3, 6, 1),
(4, 1, 2),
(4, 2, 1),
(4, 3, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `trips`
--

CREATE TABLE `trips` (
  `tripId` int(20) NOT NULL,
  `tripName` varchar(20) NOT NULL,
  `spotId` int(20) NOT NULL,
  `tripStartDate` date NOT NULL,
  `tripEndDate` date NOT NULL,
  `tripDesc` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `trips`
--

INSERT INTO `trips` (`tripId`, `tripName`, `spotId`, `tripStartDate`, `tripEndDate`, `tripDesc`) VALUES
(1, '不能刪', 1, '2022-02-08', '2022-02-11', '不能刪!'),
(2, '雪山攻頂', 1, '2022-03-01', '2022-03-03', '雪山攻頂！'),
(3, '雪山泡溫泉', 1, '2022-03-04', '2022-03-05', '雪山泡溫泉！'),
(4, '雪山打雪仗', 1, '2022-03-06', '2022-03-07', '雪山打雪仗！');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `userId` int(20) NOT NULL,
  `userName` varchar(20) NOT NULL,
  `userEmail` varchar(20) NOT NULL,
  `userPassword` varchar(15) NOT NULL,
  `userPhone` varchar(10) DEFAULT NULL,
  `userExp` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPassword`, `userPhone`, `userExp`) VALUES
(1, 'hello', 'hello@gmail.com', 'hello', '0911111111', 'Hello!'),
(2, 'world', 'world@gmail.com', 'world', '0922222222', 'World!'),
(3, 'hi', 'hi@gmail.com', 'hi', '0933333333', 'Hi!'),
(4, 'test', 'test@gmail.com', 'test', '0944444444', 'Test!'),
(5, 'oh', 'oh@gmail.com', 'oh', '0955555555', 'Oh!'),
(6, 'no', 'no@gmail.com', 'no', '0966666666', 'No!');

-- --------------------------------------------------------

--
-- 資料表結構 `userstats`
--

CREATE TABLE `userstats` (
  `userId` int(20) NOT NULL,
  `leadership` float DEFAULT NULL,
  `teamwork` float DEFAULT NULL,
  `strength` float DEFAULT NULL,
  `heal` float DEFAULT NULL,
  `survival` float DEFAULT NULL,
  `direction` float DEFAULT NULL,
  `commentCount` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `userstats`
--

INSERT INTO `userstats` (`userId`, `leadership`, `teamwork`, `strength`, `heal`, `survival`, `direction`, `commentCount`) VALUES
(1, 2, 3, 4, 5, 4, 4, 2),
(2, 2.5, 3.4, 4, 5, 3.2, 4.2, 3),
(3, 2.1, 1.6, 1.8, 5, 3.5, 4.2, 3),
(4, 2.2, 3.5, 1.5, 3, 3.5, 4.2, 3),
(5, 2.5, 1.2, 3.5, 4.5, 2, 3, 3),
(6, 2.5, 2.7, 2.8, 2.9, 3, 5, 3);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `privateitems`
--
ALTER TABLE `privateitems`
  ADD PRIMARY KEY (`tripId`,`privateItem`);

--
-- 資料表索引 `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`tripId`,`day`,`startTime`);

--
-- 資料表索引 `shareditems`
--
ALTER TABLE `shareditems`
  ADD PRIMARY KEY (`tripId`,`userId`,`sharedItem`),
  ADD KEY `userId` (`userId`);

--
-- 資料表索引 `spotcomments`
--
ALTER TABLE `spotcomments`
  ADD PRIMARY KEY (`number`);

--
-- 資料表索引 `spots`
--
ALTER TABLE `spots`
  ADD PRIMARY KEY (`spotId`,`spotName`) USING BTREE,
  ADD UNIQUE KEY `spotId` (`spotId`);

--
-- 資料表索引 `tripchatboard`
--
ALTER TABLE `tripchatboard`
  ADD PRIMARY KEY (`number`);

--
-- 資料表索引 `tripmembers`
--
ALTER TABLE `tripmembers`
  ADD PRIMARY KEY (`tripId`,`userId`) USING BTREE,
  ADD KEY `userId` (`userId`);

--
-- 資料表索引 `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`tripId`,`tripName`,`spotId`) USING BTREE,
  ADD UNIQUE KEY `tripId` (`tripId`),
  ADD KEY `spotId` (`spotId`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- 資料表索引 `userstats`
--
ALTER TABLE `userstats`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `spotcomments`
--
ALTER TABLE `spotcomments`
  MODIFY `number` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `spots`
--
ALTER TABLE `spots`
  MODIFY `spotId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `trips`
--
ALTER TABLE `trips`
  MODIFY `tripId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `privateitems`
--
ALTER TABLE `privateitems`
  ADD CONSTRAINT `privateitems_ibfk_1` FOREIGN KEY (`tripId`) REFERENCES `trips` (`tripId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`tripId`) REFERENCES `trips` (`tripId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `shareditems`
--
ALTER TABLE `shareditems`
  ADD CONSTRAINT `shareditems_ibfk_1` FOREIGN KEY (`tripId`) REFERENCES `trips` (`tripId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shareditems_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `tripmembers`
--
ALTER TABLE `tripmembers`
  ADD CONSTRAINT `tripmembers_ibfk_1` FOREIGN KEY (`tripId`) REFERENCES `trips` (`tripId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tripmembers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `trips`
--
ALTER TABLE `trips`
  ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`spotId`) REFERENCES `spots` (`spotId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `userstats`
--
ALTER TABLE `userstats`
  ADD CONSTRAINT `userstats_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
