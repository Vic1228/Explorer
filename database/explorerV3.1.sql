-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-03-05 15:15:36
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

--
-- 傾印資料表的資料 `schedule`
--

INSERT INTO `schedule` (`tripId`, `day`, `startTime`, `activity`) VALUES
(3, 1, '09:34:47', '起床'),
(3, 1, '19:34:47', '晚安'),
(3, 2, '09:00:00', '起床'),
(3, 3, '09:16:00', '早安');

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
(2, 1, 'tent4p', 50),
(2, 2, 'tent3p', 2),
(2, 3, 'tent3p', 1),
(2, 4, 'tent4p', 2);

-- --------------------------------------------------------

--
-- 資料表結構 `spotcomments`
--

CREATE TABLE `spotcomments` (
  `tripId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `tripMessageDate` datetime NOT NULL,
  `tripMessageText` varchar(255) DEFAULT NULL,
  `tripImgNum` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `spots`
--

CREATE TABLE `spots` (
  `spotId` int(20) NOT NULL,
  `spotName` varchar(20) NOT NULL,
  `Introduction` varchar(512) NOT NULL,
  `history` varchar(1024) NOT NULL,
  `geography` varchar(512) NOT NULL,
  `landscape` varchar(512) NOT NULL,
  `spotArea` varchar(20) DEFAULT NULL,
  `placeID` varchar(50) DEFAULT NULL,
  `coordinateX` float NOT NULL,
  `coordinateY` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `spots`
--

INSERT INTO `spots` (`spotId`, `spotName`, `Introduction`, `history`, `geography`, `landscape`, `spotArea`, `placeID`, `coordinateX`, `coordinateY`) VALUES
(1, '雪山', '雪山，最高峰雪山主峰位處台灣台中市和平區平等里與苗栗縣泰安鄉梅園村之間，屬於雪山山脈，為全台第二高峰，標高 3,886 公尺，僅次於玉山山脈的玉山（3,952 公尺）。雪山在日治時代被稱做次高山，是第二座超越日本富士山高度的台灣高山。在台灣百岳之中，雪山與玉山、秀姑巒山、南湖大山、北大武山合稱「五嶽」，為台灣最具代表性的五座高山。', '雪山地區是世居在此的泰雅族人的獵區。在志佳陽社（今 環山部落）的稱呼中，雪山泰雅語名為「B\'bu\' Hagay」，意為「石頭山」，描述雪山頂到處堆積的砂岩塊[1]；另有泰雅語稱為「Mahamayan」，譯作馬哈馬顏山；在泰雅語中的第三個稱法為「Sekoan」，意為「碎石與裂縫」。《台灣府志》描寫其積雪之景，稱為雪山、雪翁山，日人幣原坦認為「雪翁山」或「雪高翁山」為「Sekoan」的音譯。《淡水廳志》《苗栗廳志》《噶瑪蘭廳志》稱此山為玉山，《苗栗廳志》中「玉山霽雪」為苗栗八景之一，《噶瑪蘭廳志》中「玉山積雪」也為蘭陽勝景之一[a][3]。 1867年，英國軍艦Sylvia號行經台灣海域，據說船長以目視發現高聳的雪山，便將山以船命名為「Sylvia」，早期西方相關文獻便以Mt.Sylvia稱呼雪山[4]；1872年，馬偕博士曾入雪山山區活動。接著台灣進入日治時期，大正4年（1915年）7月10日，隸屬「蕃務本署」的測量員財津久平等人經埤亞南社（今南山村）越過埤亞南鞍部（今思源埡口），從雪山東峰稜線順利登上雪山主峰，並量出高度為12,972日尺，比日本本土最高峰富士山還高；1923年，裕仁親王（後為昭和天皇）訪台，', '雪山地區是世居在此的泰雅族人的獵區。在志佳陽社（今 環山部落）的稱呼中，雪山泰雅語名為「B\'bu\' Hagay」，意為「石頭山」，描述雪山頂到處堆積的砂岩塊[1]；另有泰雅語稱為「Mahamayan」，譯作馬哈馬顏山；在泰雅語中的第三個稱法為「Sekoan」，意為「碎石與裂縫」。《台灣府志》描寫其積雪之景，稱為雪山、雪翁山，日人幣原坦認為「雪翁山」或「雪高翁山」為「Sekoan」的音譯。《淡水廳志》《苗栗廳志》《噶瑪蘭廳志》稱此山為玉山，《苗栗廳志》中「玉山霽雪」為苗栗八景之一，《噶瑪蘭廳志》中「玉山積雪」也為蘭陽勝景之一[a][3]。 1867年，英國軍艦Sylvia號行經台灣海域，據說船長以目視發現高聳的雪山，便將山以船命名為「Sylvia」，早期西方相關文獻便以Mt.Sylvia稱呼雪山[4]；1872年，馬偕博士曾入雪山山區活動。接著台灣進入日治時期，大正4年（1915年）7月10日，隸屬「蕃務本署」的測量員財津久平等人經埤亞南社（今南山村）越過埤亞南鞍部（今思源埡口），從雪山東峰稜線順利登上雪山主峰，並量出高度為12,972日尺，比日本本土最高峰富士山還高；1923年，裕仁親王（後為昭和天皇）訪台，', '雪山主峰標高3,886公尺，峰頂地形平緩，設有一等三角點與石碑。雪山的地質構造以變質砂岩為主，在主峰周邊各處均可見變質砂岩的交疊構造出露，以及散落的風化砂岩碎塊。主峰東面為雪山一號圈谷，北面經埡口接上北稜角，西面稜脈接上翠池三叉山，南面則為斷崖崩壁。', 'middle', 'ChIJH0OLXIhfaDQRe2M3VHul_nY', 24.384, 121.23),
(2, '玉山', '玉山，絕頂最高峰玉山主峰位於臺灣嘉義縣阿里山鄉中山村、南投縣信義鄉東埔村與高雄市桃源區梅山里交界處，海拔3,952.43±0.045公尺[1]，為台灣最高峰，百岳之首[4][5]，鄒族稱為Patungkuonʉ（漢字以八通關、八同關、八童關等音譯）、布農族稱為Usaviah/Saviah/Savih/Tongku Saveq、卡那卡那富族稱為Tanungu\'incu、排灣族稱為Kanasi、清代方志也有稱為雪山、十九世紀後半葉西方人稱 Mt. Morrison（漢字音譯摩里遜山、馬禮遜山、磨利生山等，日文音譯「モリソン山」）、日治時稱為新高山。為保護玉山及周邊極為珍貴的自然景觀生態及歷史文化資產，在1985年設立玉山國家公園。在百岳中，代表布農的玉山與泰雅的雪山、阿美的秀姑巒山、南湖大山、排灣的北大武山合稱「五嶽」，為臺灣最具代表性的五座高山。', '玉山有紀錄的首次登頂是由德國登山家史德培博士（Dr. Karl Theodor Stöpel）及兩名東埔社布農嚮導虎松（Husung）、比勇（Biung）於1898年12月26日達成[2]:89-92。日本參謀本部陸地測量部於1917年在玉山主峰設立了一等三角點，而其於1924年的海拔高度測量為13,035日尺（3,950公尺）。另外，於1925年於山頂上設設有神社「新高祠」。', '玉山山貌高峻，最高峰玉山主峰四面皆是陡壁危崖，南北兩側是千仞峭壁，西側絕壑深溝，東側則是碎石陡坡。玉山無論山容或山勢皆在台灣為最具規模，除了是台灣五嶽之首、百岳之王外，更重要的是玉山蘊含著珍貴的生命寶藏。這裡有亞熱帶、暖溫帶、冷溫帶及高山寒原帶的不同氣候型態，衍生出多樣化的動物群種及植物林相，生態資源相當豐富。  除此，根據日治時期學者鹿野忠雄、佐佐保雄及近代齊士崢等人的研究，發現玉山保存有冰河地形遺跡。根據統計，包含「U形谷」、「冰斗」、「側冰磧」等，其中以玉山至八通關的冰河地形最為豐富[6][7]。  玉山山容氣勢磅礡、雄踞一方，四季景緻分明而優美；春天玉山杜鵑盛開、夏季雲海繚繞、秋季則遍布法國菊，冬季則雪白如玉；「玉山積雪」成為臺灣八景之一[8]，而在1929年亦發表了新高八景。1985年4月（民國74年），玉山群峰周邊劃入玉山國家公園中。玉山是布農族與鄒族共同的聖山之一，也是當代臺灣的象徵之一。', '沿線景點有觀峰、觀山、夫妻樹、塔塔加遊客中心、上東埔、石山，並有東埔山、鹿林山等山嶽。觀峰、觀山都是展望點，可在公路旁停車場下車，駐足觀賞遠方之玉山景觀[8]。夫妻樹是二株佇立於公路旁的紅檜，傳說是一對夫妻，因森林火災被燒死，又被雷擊給拆散，因而化身一對枯木[9]。塔塔加遊客中心是玉山國家公園管理處設立，提供遊客諮詢、導覽解說等服務，並設有公廁、展示間、視聽室；二樓則是餐飲場所，有提供合菜、簡餐、咖啡、飲料等熱食飲品[10][11]。上東埔是楠梓仙溪林道的起點，由此可通往玉山登山口，在停車場下方則有東埔山莊，提供106人床位入住[12][13]。東埔山海拔2,782公尺，其登山口就在公路旁，登頂路程約30～40分鐘，登頂後即有360°視野，能展望阿里山山脈、玉山山脈、中央山脈等群山百岳[8][14]。鹿林山海拔2,881公尺，從台18線92公里有石階山徑可入山，途中會經過鹿林山莊，路程來回約3小時[14][15]。', 'middle', 'ChIJ0aYLQg4hbzQRfg2EIaUay4M', 0, 0),
(3, '馬博拉斯山\n', '馬博拉斯山（布農語：Tapana[3]），布農語稱為烏拉孟山（布農語：Ulamun）[1][2]，位於臺灣南投縣信義鄉東埔村與花蓮縣卓溪鄉立山村交界處，標高3,785公尺，位在玉山國家公園園區內，為台灣百岳排名第7，「十峻」之一[1]，中央山脈第二高峰[1]，台灣第四高山，僅次於玉山、雪山、秀姑巒山（台灣前四高山玉山、雪山、秀姑巒山、馬博拉斯山都比富士山高）。  山名「馬博拉斯山」為以漢語音譯日治時期測繪地圖時誤植的日語山名「マボラス山 Maborasu-zan」[註 1]，而此日語山名轉寫自布農語：Mahudas。據鹿野忠雄的記載，此山在布農語稱為「烏拉孟山（Ulamun）」，而布農語「馬霍拉斯山（Mahudas）」是指今「秀姑巒山」[2]，但日本卻將日語與布農語Ulamun同音的「裏門山」（日語：裏門／うらもん Uramon，意為後門）定名在東北方十多公里外「丹大東郡橫斷」的另一座山。', '馬博拉斯山的山名，源於布農語Maborasu音譯而來，原意是「老人」，依據最早的布農族獵人的說法，指的是秀姑巒山，用以形容秀姑巒山冬季積雪時，整座山被白雪覆蓋，好像是老人滿頭的白髮。烏拉孟山(Wulamun)才是這座山最早的名稱，是布農語「後門」的意思，大概是指此山東西橫亙的主脊，不僅可東通玉里，又如屏障一方的後門駐防。後來，因為日人在繪製蕃地地形圖時，誤將「馬博拉斯」標註在應為烏拉孟山的山頭上，又將「烏拉孟」依日語音譯為「裡門」，搬移到哈伊拉羅溪對岸東郡山彙上的3335公尺(舊測3262公尺)平頂峰上，就這樣一連串張冠李戴的結果，演變成後人皆以馬博拉斯山取代烏拉孟山，而烏拉孟的名稱則只被用來稱呼此山東脊的斷崖而已。由於這種情形早在鹿野忠雄於昭和6年8月縱走秀姑巒山脈時，即已出現，也因無法挽回與更正，遂沿用至今。只是在我們登臨這座雄渾的大山時，似應該瞭解這麼一段複雜糾葛的山名演變史。', '《花蓮縣誌》卷四地形篇中記載：馬博拉斯山：拔海3805公尺，位于中央山脈脊嶺，跨花蓮南投兩縣。峰三角丘狀，兩翼平展，東北接塔比拉山，南連秀姑巒山。西側西北稜線降于郡大溪，對郡大山、望鄉山。東側當卓溪鄉中部，嶺下成斷崖，崖腳向北接馬博拉斯溪源頭傾斜，附於塔比拉山支脈。岩層為粘板岩類，土層屬高山腐植土，皆草生地。 　　縣誌中所提的塔比拉山即岳界熟悉的馬利加南山；馬博拉斯溪又稱作馬霍拉斯溪，是音譯差別所造成。關於岩層的描述，根據玉山國家公園的調查解說資料，應屬於始新世畢祿山層，主要岩石為板岩、千枚岩、石英岩互層及夾薄層變質岩。 　　山形磅礡雄峻的烏拉孟山，雖擁有中央山脈第二高峰的美名，但是因為緊臨第一高峰秀姑巒山(直線距離僅2.6公里)，風采與岳人的眼光都被秀姑巒山所吸引。不過，靜觀此山擁有的優越位置(中央脊樑的折轉軸點上)與龐大的山容，而且僅低於秀姑巒山20尺，實是一座足與秀姑巒山爭輝並相得益彰的巍峨大岳。', '本路線為1條難度高級的登山步道，在登山界亦有四大障礙之一的稱號，行經玉山國家公園園區最東北端，步道自南投縣東埔登山口入口到花蓮縣玉里林道玉林橋出口約96.3公里，可通達園區東、北側各山區，步道沿著中央山脈稜線而走，沿線自然資源豐富，除了因山高路陡，屏障性較大外，稜線上斷崖嶙峋，極富地形地質景觀與挑戰性；雖有步道系統，但步徑較差，必須有完整之登山裝備、充沛之體力、耐力，以及豐富登山知識，方可從此登山活動。 本路線沿著中央山脈稜線而走，途經中央山脈第1高峰秀姑巒山及第2高峰馬博拉斯山，且因中央山脈受地殼強力推擠，產生劇烈扭曲，形成多處險峻斷崖；馬博拉斯山至馬利亞文路山須經險惡的烏拉孟斷崖、馬利加南山附近更是危崖遍布，西有馬利亞文路斷崖、馬利加南東峰至馬布谷間有塔比拉斷崖等斷崖地質景觀。另馬布谷及太平谷，地勢廣大平坦，綠草如茵，兩側林木蒼翠，為臺灣高山中罕見的幽谷。', 'middle', 'ChIJwbqRiNgkbzQRlL8HhKymoT0', 0, 0),
(4, '秀姑巒山', '秀姑巒山（布農語：Halinpudu[1]），布農族稱為馬霍拉斯山（布農語：Mahudas）[2]，是台灣中央山脈中段最高山彙中心的一座高山，標高3,825公尺，為中央山脈最高峰，台灣第三高山，僅次於玉山和雪山[3]（台灣前四高山玉山、雪山、秀姑巒山、馬博拉斯山都比富士山還高），山頂設有二等三角點1691號，位於南投縣信義鄉東埔村與花蓮縣卓溪鄉立山村的交界，玉山國家公園範圍內。在著名的台灣百岳之中排名第6。秀姑巒山與百岳中的玉山、雪山、南湖大山、北大武山合稱「五嶽」，[4]為台灣最具代表性的五座高山，氣勢磅礡，雄霸一方。', '《花蓮縣志》：「秀姑巒」是阿美語Ci\'poran的台語音譯，其義為「在河口」，原指「秀姑巒溪出海口（大港口）的小島」獅球嶼，文獻中還有「芝波蘭」、「泗波闌」、「薛波闌」、「芝舞闌」、「繡孤鸞」、「秀孤鸞」、「秀姑蘭」等台語音譯寫法，在清治時此名也用做溪名指稱秀姑巒溪，與山名指稱此溪最高源頭高山、與八通關在後山相對、後山最高峰。[a]  秀姑巒山在當地的布農族稱作「馬霍拉斯山（布農語：Mahudas）」，意指「白髮蒼蒼的老人」，形容此山在冬季時分的積雪山頂有如白髮老人[2][b]。日治時期1896年陸軍步兵中尉長野義虎在中央山脈東西來回橫斷的探險報告中以漢字記載此山為「秀枯栾山」並以片假名標註「マホラス山 Mahorasu-zan」（發音馬霍拉斯近於布農語Mahudas）。[c]之後的測繪地圖都以漢字定名此山為秀姑巒山，而將北側犄角對峙原本布農語稱為「烏拉孟山（布農語：Ulamun）」的中央山脈第二高山誤植為「馬博拉斯山」，又將東北方十多公里外「丹大東郡橫斷」的另一座山定名為同音的「裏門山」（日語：裏門／うらもん Uramon，日語意為「後門」），連串錯誤沿用至今[2]。', '秀姑巒山北與馬博拉斯山對峙成犄角之狀，南接大水窟山的稜脈，鞍部是平緩寬廣的秀姑坪，此處原為茂密的玉山圓柏森林，因遭森林大火燒毀，殘留下一株株雪白枯木，形成台灣著名的三大白木林奇觀之一，另外兩處則分別在玉山西峰與雪山。秀姑巒山山容壯麗，南脊峽瘦而北脊寬闊，不論由玉山東望或由大水窟山北眺，其山勢都猶如高原上一座圓凸的高峰。', '八通關古道山徑相當開闊，蜿蜒緩昇於陳有蘭溪西北側山腰，視野相當狹窄無法觀玉山群巒全貌，地理景觀以古道4公里處壯闊的雲龍瀑布與8公里處秀麗的乙女瀑布是濁水溪上游支流的陳有蘭溪最著名的瀑布景觀。', 'South', 'ChIJDSGtGr8kbzQRAJad9ethhZw', 0, 0),
(5, '南湖大山', '南湖大山（泰雅語、太魯閣語：B\'bu\' Topuk 或 Rgyax Topuk），位於臺灣臺中市和平區平等里與花蓮縣秀林鄉和平村之間，處於中央山脈主稜線北段，在太魯閣國家公園，屬台中市和平區，海拔3,742公尺，為中央山脈第三高峰、主稜線北段的最高峰，設有一等三角點。在著名的台灣百岳之中」 南湖大山與玉山、雪山、秀姑巒山、北大武山合稱「五岳」，為台灣最具代表性的五座高山。山型端凝厚重，素有帝王之山、王者之山之稱；主山的山體，別號「帝王座」[1]。  南湖大山為現行流通的第五版新台幣貳仟圓背面之主題。', '「南湖大山」能夠有這樣的稱號，得自於其威儀厚重、氣勢偉岸的山型，不管從任何角度、任何距離看過去，南湖大山皆是一派端凝莊嚴之氣象。除此之外，南湖山區並不只有南湖大山這一座山，還有數座高低不等、有著各自獨特性格的山峰，有如眾星拱月般護衛著南湖大山主峰，因此更具帝王之相的意義啦！', '南湖山塊涵容的山峰很多，主要的山峰有主峰（3,742公尺）、南湖大山東峰（3,632公尺）、南湖大山東南峰、南湖大山中南峰、南湖大山南峰、巴巴山、巴巴山南峰、南湖大山北峰、南湖北山（3,536公尺），甚至還包括東稜的馬比杉山、西稜的審馬陣山、北稜的巴都服山與拔托諾服山，是整個中央山脈最北的高山區，南湖大山北峰也是宜蘭縣的最高峰。特有植物為南湖大山黃、南湖大山柳葉菜、岡本氏岩蕨、高山柳等。  南湖山塊最具特色的地形景觀是兩條U型谷，而圍繞著上、下U型谷的山頭即為南湖群峰。', '南湖山區有著台灣最完整多變的冰河地形（如壯麗的上、下圈谷）、台灣唯一的「寒漠」地質、台灣最長的冰封雪季、還有一些世界獨有的原生物種....甚至南湖山區似乎帶著某種鍾靈毓秀的天地靈氣，讓南湖大山成為許多愛山人魂牽夢縈的高山美地，總是一而再、再而三地多次拜訪，有些人認為必須春夏秋冬四季都走過一遍，才算是完整的登過南湖大山。', 'middle', 'ChIJ_QArHsZiaDQRxEAnX0PnwQc', 0, 0),
(6, '關山', '關山位於臺灣臺東縣海端鄉利稻村與高雄市桃源區梅山里及拉芙蘭里之間，南部橫貫公路（台20線）南側約3.5公里處，標高3,668公尺，隸屬玉山國家公園管轄，為台灣百岳名山的「十峻」之一。  關山是中央山脈秀姑巒山以南的最高峰，故有「南臺首岳」之稱。其山勢雄偉，南北觀之如金字塔聳立，自東望之，則如嶺雄峙，真正是「橫看成嶺側成峰」。', '關山鎮（郡群布農語：Kinalaungan，臺灣客家語四縣腔：guanˊ sanˊ ziinˋ，臺灣話：Koan-san-tìn），舊稱「里壟」，位於臺灣臺東縣北部。鎮內人口約有8千餘人，是全國人口最少且唯一少於一萬人的鎮[註 1]。  周邊鄉鎮方面，西隔為海端鄉，北接池上鄉，東臨東河鄉，南接鹿野鄉。相對位置為地處花東縱谷平原南段，境內有卑南溪流過，介於中央山脈與海岸山脈之間，氣候屬熱帶季風氣候，年雨量2,000公釐，平均溫度23.7度。', '關山鎮地理位置位於花東縱谷南段，東以海岸山脈與東河鄉為界，北與池上鄉接壤，西鄰中央山脈的海端鄉，南邊則是鹿野鄉，距臺東市約 42 公里，區位上居於花蓮縣與臺東縣交會處，為花蓮進入臺東縣的樞紐及 9 線北入 口，也是南橫公路東段出口，具有全縣北區重要的交通區位。 轄區土地面積約 58.735 平方公里。為由海岸山脈、中央山脈二面夾山而成的山城。土地利用上除了關山街區外，主要為農林使用。此地與池上鄉及鹿野鄉為鄰同為通谷地貌，地勢平坦適合農業發展。山麓地帶森林蓊鬱，草澤遍野。新武呂溪由大關山出海端，經由本鎮北端，貫流後向南會鹿野溪注入太平洋。行政區分為里壠里、中福里、月眉里、電光里、新福里、豐泉里及德高里等7里。', '關山為隆起珊瑚礁組成，根據研究顯示珊瑚礁岩層上升的速率每年大約5公厘，三萬年前關山還是在海面下，站在關山頂上頗令人有「滄海桑田」之感觸。 山頂上有一似偽裝的野戰巨型鋼盔之巨大礁岩，以前民間未知其來處，故稱為『飛來石』，從其組成及四周地形可知為隆起珊瑚礁經差異侵蝕而遺留，並非民間傳說係五百年前從菲律賓被巨風吹來的。', 'South', 'ChIJv2YdtvcJbzQR6NJ-AtqRcXE', 0, 0),
(7, '奇萊山', '奇萊山（太魯閣語：Dgiyaq Klbiyun[1]）的最高峰奇萊主山北峰，亦可稱奇萊北峰、奇萊山北峰，位於臺灣花蓮縣秀林鄉富世村，海拔高度3,607公尺，隸屬太魯閣國家公園管轄。因北、西、南三面為斷崖，因此在台灣百岳名山之中列入「五嶽三尖一奇」之一奇，以及被選為「十峻」之一，奇萊連稜上的最高峰，有一等三角點，位在中央山脈主脊往東伸出往太魯閣大山的支脈上。', '奇萊山的山名由來，依據邢天正的考證，奇萊係出於阿美族語，是東部海岸的地名和阿美族的社群名稱。 他說：「奇萊不是「(艹奇)萊」，奇萊原非山名，奇萊不是日本話，也不是泰雅族話，奇萊原在太平洋濱。」 根據光緒18年胡鐵花主修的《臺東州采訪冊》中記載：秀姑巒在水尾西五十餘里。 其山高聳，甲於臺東。', '奇萊山區除奇萊北峰外，尚由奇萊主峰（標高3,560公尺）、卡羅樓斷崖、屏風山稜線、大禹山等形成一系列綿延雄偉的山峰，北銜合歡群峰，南連能高群巒。從合歡山遠望奇萊稜脊，常因背對陽光而顯龐大、漆黑，山嶽氣勢懾人；再者，奇萊山素以險峻著名，氣候錯綜複雜，雲霧變幻莫測，是台灣發生最多山難的山區，所以有「黑色奇萊」的稱號。  但是，隨著太魯閣國家公園的成立以及合歡山景區的開發，越來越多人踏足這個山區，奇萊山也逐漸揭開了神祕的面紗。美麗巍峨的奇萊，成了許多愛山人流連忘返、一再拜訪的熱門山區。  其中山友最常走的，就是奇萊北峰與奇萊主山合走的「奇萊主北」行程。奇萊北峰是奇萊連峰中最高的山峰，山形尖銳險峭，因而被列為「十峻」之一。奇萊主山的山形亦俊秀雍容，雖高度比北峰略低，但其氣勢也毫不遜色，其綿延草原景色與奇萊山北峰猙獰之岩壁景觀呈現一大對比。  由於近年山徑與山屋的開發，使得奇萊主北的難度比起早年降低了許多，但本山區的氣候變化多端，午後常有雲霧風雨，加以攀上奇萊主稜的山路十分陡峭，仍是登山者須特別注意自身安全的一條路線。', '奇萊山位在南投縣與花蓮縣交界處，高度海拔3559公尺，景觀雄偉，峭壁連天。與名列五嶽三尖『一怪』標高3605公尺的奇萊主北峰，卡樓羅斷崖，屏風陵線，大禹山等形成一系列獨霸一方的綿延山峰。  奇萊山素以險峻最為著名，是台灣發生山難最多的一座山，得名黑色奇萊的稱號。可以看到裸露的地方，吋草皆出不生的岩壁、險峻陡峭的懸崖，若遇陰雨的天氣登頂景觀更為詭譎。', 'South', 'ChIJjyoIB2mUaDQRFibYsKd5Les', 0, 0),
(8, '合歡山', '合歡山（太魯閣語：Dgiyaq Bburaw[1]）是台灣中央山脈主脊北段的一座高山，主脊的部分位於南投縣仁愛鄉大同村、德鹿谷村、花蓮縣秀林鄉富世村的交界，而合歡山主峰的山頂位在中央山脈主脊往西岔出的支稜上，標高3417公尺，離花蓮縣的邊界約1公里，最高峰位在北合歡山，標高3422公尺。[2]周邊的山峰所串連合稱合歡群峰，當中有五座名列臺灣百岳，是著名的旅遊景點，在太魯閣國家公園的西南邊界，為合歡溪、濁水溪、北港溪和塔次基里溪的分水嶺。在遊客中心前立有「合歡山海拔3,158公尺」標示牌，這是台14甲線途經合歡山所顯示出標高。  合歡山冬季白雪皚皚，素有「雪鄉」之稱；春夏季玉山矮箭竹草原與玉山杜鵑、紅毛杜鵑花叢，景色宜人。林務局在此設立合歡山國家森林遊樂區，並於位在台14甲線32.855公里處提供合歡山遊客服務中心與松雪樓住宿服務，以及太魯閣國家公園管理處在小風口附近設立合歡山管理站。在合歡山遊客服務中心前的公路旁設有展望台可遠眺奇萊山，同時合歡山也是攀登合歡東峰、合歡尖山、石門山與中央山脈北三段的登山口。', '合歡山一名最早出現於1685年（康熙24年）的《臺灣府志》，1716–1717年編纂的《諸羅縣志》記載「中港溪發源於合歡大山」。來源如今已不可考，可能源於道卡斯語（今苗栗沿海仍留存有道卡斯族合歡石滬的地名）。也有調查認為可能與賽夏族有關，在1721年朱一貴事件之後，仿明鄭屯田時舊制所開始設立的土牛溝，清國與賽夏族的界石即設在「合歡路頭」，應位在中港溪下游的頭份尖山一帶，為漢原出入的重要據點，可能為台語「合番」的音轉，[註 1]賽夏族人認為「合歡」為當時居住在頭份氏族賽夏語：Hayawan（夏氏）的音譯。[3]:65-66《臺灣府志》與其後一些方志所記載的「合歡山」都位於現今新竹、苗栗東側的淺山，相當於雪山山脈西麓的區域，並非今日所指涉的合歡山。至1878年的《全臺前後山輿圖》，以及日治初期1895年的《臺灣蕃地圖》（即1888年《臺灣內山番社地輿全圖》的臨摹本）中，合歡山開始被描繪為臺灣中央地帶的山峰，標示在歧萊主山東北方、能高山東北方或西北方。歷史學家金尚德認為，鑑於當時臺灣內山仍是清廷與多數漢人不易進入的地帶，測繪此區域的工作受制於地形與技術，因此這些地圖所標示的合歡山是否就是現今所認知，位於中央山脈的合歡山，仍待商榷[4]。', '合歡山區地處中央山脈主脊北段，北連畢祿山，南接奇萊群峰，整個山區為濁水溪、大甲溪與立霧溪上游的分水嶺，豐沛的水汽經常造成山區嵐霧蒸騰或形成壯觀的雲海景觀。  　　合歡山區以合歡主峰（3416ｍ）為主，含括合歡北峰（3423M）、合歡西峰（3146M）、合歡東峰（3416ｍ）與石門山（3236ｍ）等五座名列台灣百岳的山岳組合而成合歡群峰。其間中橫公路、霧社支線道路循大禹嶺蜿蜒於山腰而行經清境農場至霧社。', '合歡群峰的峰巒主脊坡度均相當緩和，其東側山坡為立霧溪上游塔次基里溪發源地；西南側為濁水溪的發源地；西北側山坡為大甲溪上游流域；所以形成合歡山區溪谷縱，其秀巒疊嶂的地形景觀。  　　雖然各溪流水域挾其豐沛水汽經常造成山區嵐霧迷漫，但卻因此孕育了豐富的植被，將春、夏兩季粧演成繁花如夢，令人留連忘返的繽紛世界。', 'North', 'ChIJ782u6b6SaDQRtD-8c-mgPys', 0, 0),
(9, '桃山', '桃山，位於臺灣臺中市和平區平等里與新竹縣尖石鄉秀巒村之間，處於武陵農場北方，屬雪山山脈，海拔高度3,325公尺，為武陵四秀、台灣百岳之一，編號第48；稜線是臺中市與新竹縣分界點，山頂有三等三角點6327號。', '桃山，在泰雅語中稱「B\'bu Qba」[1]，意為「拳頭山」[2]，而山形自西南側展望狀似桃子，故名。', '安土桃山時代，又稱織豐時代，是1573年至1603年之間，織田信長與豐臣秀吉稱霸日本的時代。 起於織田信長上洛扶植最後一位室町幕府將軍足利義昭為其傀儡，終於德川家康建立江戶幕府。 以織田政權的安土城和豐臣政權的桃山城（又稱「伏見城」）為名。', '武陵四秀為位在武陵農場北側的四座百岳，登山口皆位於武陵農場內，分別為品田山、池有山、桃山及喀拉業山，其中又以桃山被公認為最秀麗的一座山。山形自西南側展望狀似桃子而得名。登山口位於武陵農場往桃山瀑布的路上，起初為松針之字型防火道，接下來視野漸開，接著是高山草坡，可俯視武農的廣闊視野。會被形容為百岳進階路線，是因雖然至桃山頂只有4.5公里的路程，但全程皆為上坡，需爬升1,400公尺 桃山上360度的視野無懈可擊，前方的雪山圈谷、直達大霸、小霸尖山的聖稜線、北一段的南湖大山、中央尖山環繞，', 'North', 'ChIJ3ZYGz95gaDQR08CvUzFwS1c', 0, 0),
(10, '品田山', '品田山位於臺灣臺中市和平區平等里與新竹縣尖石鄉秀巒村之間，雪霸國家公園東部，為台灣百岳名山的「十峻」之一，武陵四秀之首。標高3,524公尺，山頭巨大的岩脈縐褶露頭是品田山最大的特色，而台灣三大河川淡水河亦發源於此山，是淡水河與大甲溪之分水嶺。在天候良好的情況下，品田山稜線上即可清楚北望桃園都會區、東瞰蘭陽平原及龜山島，在山頂上可南眺玉山甚至關山（位於高雄市），視野開廣遼闊。', '品田山在泰雅語中，稱為「Babo Pochin Srion」，音譯為波秦西崙山，意為｢最後的水池｣；又稱「Babo Taragayun」[1]，品田山與池有山間的水池草原，有「Yaboran Simuta」之稱，意為群鹿委身之處；最大的水池稱為「Srion Simuta」，即為群鹿之池，今採音譯稱為新達池；品田山前的品田池，稱為「Siron Yaboran」。日本本州東北「田」為山中濕地，日語「品」為眾多，漢字「品田」意為眾多山中水池，日語發音為 しなた shina-da 與泰雅語 Simuta 相近。[2]', '品田山的山名由來，依據登山界耆老楊南郡先生的詮釋：「品田山的泰雅語原稱，是Babo Pochin Siron，Babo是山，Pochin指「最後的」，Siron是水池，意謂「位於最後水池的山」。泰雅族獵人將品田山至新達池一帶，泛稱為Yaboran Simuta──Yaboran的原義是『因寒冷而縮身蹲下』，後來指品田山；Simuta是「鹿多」之意。Siron Yaboran指品田山下的「品田池」；而SironSimuta即「群鹿之池」，中文譯為「新達池」。最初，日人以泰雅族原名Pochin Siron稱呼品田山，又稱為Yaboran。後來發現其山形與岩層酷似「品田」兩字，而且「品田」的日語讀音為Sinata，音近Simuta，因此改稱為品田山。依照泰雅族嚮導對日人所言，品田山又叫BaboTaragayun，原義不詳。」', '品田山山是東西狹長，南北極狹窄，且臨深谷。南面為「品田皺摺」，北側斷崖下，是塔克金溪的發源地，也是淡水河水系的最高源流。品田皺褶在西面參差錯斷，形成品田斷崖，為聖稜線上最具難度的關卡之一。東面，為與池有山相接的鞍部，有數座高山池遍佈在玉山箭竹草原之中；延東稜上攀會經過數座冷杉與箭竹混生林，並來到品田前峰（海拔3,442公尺）。前峰與主峰間隔著品田前峰斷崖。此斷崖即是品田山大皺摺的凹陷處，是登臨品田山前難度較高的障礙。', 'North', 'ChIJ-by_9ZxgaDQRl3Z4QSUjeQU', 0, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `tripchatboard`
--

CREATE TABLE `tripchatboard` (
  `number` int(11) NOT NULL,
  `spotId` int(20) NOT NULL,
  `userId` int(20) NOT NULL,
  `chatTime` datetime NOT NULL,
  `chatMessage` varchar(80) CHARACTER SET utf8 NOT NULL,
  `chatImgNum` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `tripchatboard`
--

INSERT INTO `tripchatboard` (`number`, `spotId`, `userId`, `chatTime`, `chatMessage`, `chatImgNum`) VALUES
(128, 1, 9, '2022-03-05 14:41:31', '', 128),
(129, 1, 9, '2022-03-05 17:10:53', '', 129),
(130, 9, 9, '2022-03-05 17:43:04', '大家好', 130),
(131, 9, 9, '2022-03-05 17:43:41', '', 131),
(132, 7, 8, '2022-03-05 17:49:46', '我狗', 132),
(133, 7, 8, '2022-03-05 17:49:54', '', 133),
(134, 1, 8, '2022-03-05 18:09:46', '', 134);

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
(2, 2, 1),
(2, 3, 1),
(2, 4, 1),
(2, 6, 2),
(2, 9, 0),
(3, 1, 1),
(3, 6, 1),
(3, 9, 2),
(4, 1, 2),
(4, 9, 0),
(5, 9, 2);

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
(2, '雪山攻頂', 8, '2022-03-01', '2022-03-03', '雪山攻頂！'),
(3, '雪山泡溫泉', 5, '2022-03-04', '2022-03-05', '雪山泡溫泉！'),
(4, '雪山打雪仗', 1, '2022-03-06', '2022-03-07', '雪山打雪仗！'),
(5, '3245345', 6, '2022-03-17', '2022-03-25', '54345345345');

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
(6, 'no', 'no@gmail.com', 'no', '0966666666', 'No!'),
(7, '一二三', 'a020202@gmail.com', '020202', NULL, NULL),
(8, '狗', '123@gmail.com', '123', NULL, NULL),
(9, '傅意涵', '0902@gmail.com', '0902', NULL, '林北阿含啦'),
(11, '呂學棋', '456@gmail.com', '456', NULL, NULL);

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
(6, 2.5, 2.7, 2.8, 2.9, 3, 5, 3),
(7, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  ADD PRIMARY KEY (`tripId`,`userId`,`tripMessageDate`) USING BTREE,
  ADD KEY `userId` (`userId`);

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
  ADD UNIQUE KEY `number` (`number`) USING BTREE;

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
  ADD UNIQUE KEY `userId` (`userId`),
  ADD UNIQUE KEY `userEmail` (`userEmail`);

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
-- 使用資料表自動遞增(AUTO_INCREMENT) `spots`
--
ALTER TABLE `spots`
  MODIFY `spotId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `tripchatboard`
--
ALTER TABLE `tripchatboard`
  MODIFY `number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `trips`
--
ALTER TABLE `trips`
  MODIFY `tripId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
-- 資料表的限制式 `spotcomments`
--
ALTER TABLE `spotcomments`
  ADD CONSTRAINT `spotcomments_ibfk_1` FOREIGN KEY (`tripId`) REFERENCES `trips` (`tripId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `spotcomments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

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
