-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-02-15 03:26:08
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
  `privateItemName` varchar(30) DEFAULT NULL,
  `privateItemCount` int(20) DEFAULT NULL,
  `privateItemNote` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `shareitems`
--

CREATE TABLE `shareitems` (
  `tripId` int(20) NOT NULL,
  `sharedItemName` varchar(20) DEFAULT NULL,
  `sharedItemCount` int(255) DEFAULT NULL,
  `userId` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `spotmessageboards`
--

CREATE TABLE `spotmessageboards` (
  `spotId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `spotMessageDate` datetime DEFAULT NULL,
  `spotMessageText` varchar(255) DEFAULT NULL,
  `spotMessageImg` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `spots`
--

CREATE TABLE `spots` (
  `spotId` int(20) NOT NULL,
  `spotName` varchar(20) NOT NULL,
  `spotCoordinate` varchar(255) DEFAULT NULL,
  `spotDetail` varchar(255) DEFAULT NULL,
  `spotImg` blob NOT NULL,
  `spotArea` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `tripmembers`
--

CREATE TABLE `tripmembers` (
  `tripId` int(20) NOT NULL,
  `userId` int(20) DEFAULT NULL,
  `positionState` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `tripmessageboards`
--

CREATE TABLE `tripmessageboards` (
  `tripId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `tripMessageTime` datetime DEFAULT NULL,
  `tripMessageText` varchar(255) DEFAULT NULL,
  `tripMessageImg` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `trips`
--

CREATE TABLE `trips` (
  `tripId` int(20) NOT NULL,
  `tripName` varchar(20) NOT NULL,
  `spotId` int(20) NOT NULL,
  `tripStarDate` date NOT NULL,
  `tripEndDate` date NOT NULL,
  `tripNote` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `tripschedules`
--

CREATE TABLE `tripschedules` (
  `tripId` int(20) NOT NULL,
  `day` int(20) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `schedule` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `userID` int(20) NOT NULL,
  `userName` varchar(20) NOT NULL,
  `userAccount` int(20) NOT NULL,
  `userPassword` int(20) NOT NULL,
  `userPhoto` blob NOT NULL,
  `userPhone` int(20) NOT NULL,
  `userEmail` varchar(20) NOT NULL,
  `userExprnience` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `userstats`
--

CREATE TABLE `userstats` (
  `userId` int(20) NOT NULL,
  `leadership` int(20) DEFAULT NULL,
  `teamwork` int(20) DEFAULT NULL,
  `strength` int(20) DEFAULT NULL,
  `heal` int(20) DEFAULT NULL,
  `surriral` int(20) DEFAULT NULL,
  `direction` int(20) DEFAULT NULL,
  `commentCount` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `privateitems`
--
ALTER TABLE `privateitems`
  ADD PRIMARY KEY (`tripId`);

--
-- 資料表索引 `shareitems`
--
ALTER TABLE `shareitems`
  ADD PRIMARY KEY (`tripId`);

--
-- 資料表索引 `spotmessageboards`
--
ALTER TABLE `spotmessageboards`
  ADD PRIMARY KEY (`spotId`);

--
-- 資料表索引 `spots`
--
ALTER TABLE `spots`
  ADD PRIMARY KEY (`spotId`);

--
-- 資料表索引 `tripmembers`
--
ALTER TABLE `tripmembers`
  ADD PRIMARY KEY (`tripId`);

--
-- 資料表索引 `tripmessageboards`
--
ALTER TABLE `tripmessageboards`
  ADD PRIMARY KEY (`tripId`);

--
-- 資料表索引 `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`tripId`);

--
-- 資料表索引 `tripschedules`
--
ALTER TABLE `tripschedules`
  ADD PRIMARY KEY (`tripId`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- 資料表索引 `userstats`
--
ALTER TABLE `userstats`
  ADD PRIMARY KEY (`userId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `privateitems`
--
ALTER TABLE `privateitems`
  MODIFY `tripId` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `shareitems`
--
ALTER TABLE `shareitems`
  MODIFY `tripId` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `spotmessageboards`
--
ALTER TABLE `spotmessageboards`
  MODIFY `spotId` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `spots`
--
ALTER TABLE `spots`
  MODIFY `spotId` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `tripmembers`
--
ALTER TABLE `tripmembers`
  MODIFY `tripId` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `tripmessageboards`
--
ALTER TABLE `tripmessageboards`
  MODIFY `tripId` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `trips`
--
ALTER TABLE `trips`
  MODIFY `tripId` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `tripschedules`
--
ALTER TABLE `tripschedules`
  MODIFY `tripId` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `userstats`
--
ALTER TABLE `userstats`
  MODIFY `userId` int(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
