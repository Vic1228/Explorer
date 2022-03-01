-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:8889
-- 產生時間： 2022 年 03 月 01 日 09:20
-- 伺服器版本： 5.7.34
-- PHP 版本： 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `explorer`
--

-- --------------------------------------------------------

--
-- 資料表結構 `privateitems`
--

CREATE TABLE `privateitems` (
  `number` int(20) NOT NULL,
  `tripId` int(20) NOT NULL,
  `privateItem` varchar(20) NOT NULL,
  `itemCount` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 資料表結構 `schedule`
--

CREATE TABLE `schedule` (
  `number` int(20) NOT NULL,
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
  `number` int(20) NOT NULL,
  `tripId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `sharedItem` varchar(20) NOT NULL,
  `itemCount` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `spotImg` longblob NOT NULL,
  `spotArea` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `tripchatboard`
--

CREATE TABLE `tripchatboard` (
  `number` int(20) NOT NULL,
  `tripId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `chatTime` datetime NOT NULL,
  `chatMessage` varchar(80) CHARACTER SET utf8 NOT NULL,
  `chatImgNum` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 資料表結構 `tripmembers`
--

CREATE TABLE `tripmembers` (
  `tripId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `positionState` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `trips`
--

CREATE TABLE `trips` (
  `tripId` int(20) NOT NULL,
  `createrId` int(20) NOT NULL,
  `tripName` varchar(20) NOT NULL,
  `spotId` int(20) NOT NULL,
  `tripStartDate` date NOT NULL,
  `tripEndDate` date NOT NULL,
  `tripDesc` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `trips`
--

INSERT INTO `trips` (`tripId`, `createrId`, `tripName`, `spotId`, `tripStartDate`, `tripEndDate`, `tripDesc`) VALUES
(1, 0, '不能刪', 0, '0000-00-00', '0000-00-00', '');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `userId` int(20) NOT NULL,
  `userName` varchar(20) NOT NULL,
  `userEmail` varchar(20) NOT NULL,
  `userPassword` varchar(15) NOT NULL,
  `userPhone` varchar(10) NOT NULL,
  `userExp` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPassword`, `userPhone`, `userExp`) VALUES
(1, '你好', '123@123', '123', '12345678', '你好'),
(4, 'abc', 'abc@abc', 'abc', '', '');

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
  `commentCount` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `userstats`
--

INSERT INTO `userstats` (`userId`, `leadership`, `teamwork`, `strength`, `heal`, `surriral`, `direction`, `commentCount`) VALUES
(1, 2, 3, 4, 5, 4, 4, '2');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `privateitems`
--
ALTER TABLE `privateitems`
  ADD PRIMARY KEY (`number`);

--
-- 資料表索引 `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`number`);

--
-- 資料表索引 `shareditems`
--
ALTER TABLE `shareditems`
  ADD PRIMARY KEY (`number`);

--
-- 資料表索引 `spotcomments`
--
ALTER TABLE `spotcomments`
  ADD PRIMARY KEY (`number`);

--
-- 資料表索引 `spots`
--
ALTER TABLE `spots`
  ADD PRIMARY KEY (`spotId`);

--
-- 資料表索引 `tripchatboard`
--
ALTER TABLE `tripchatboard`
  ADD PRIMARY KEY (`number`);

--
-- 資料表索引 `tripmembers`
--
ALTER TABLE `tripmembers`
  ADD PRIMARY KEY (`tripId`);

--
-- 資料表索引 `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`tripId`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

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
  MODIFY `number` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `schedule`
--
ALTER TABLE `schedule`
  MODIFY `number` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `shareditems`
--
ALTER TABLE `shareditems`
  MODIFY `number` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `spotcomments`
--
ALTER TABLE `spotcomments`
  MODIFY `number` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `spots`
--
ALTER TABLE `spots`
  MODIFY `spotId` int(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `trips`
--
ALTER TABLE `trips`
  MODIFY `tripId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
