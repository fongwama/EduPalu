--
-- Database: `edupalu_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tab_pharmacie`
--

CREATE TABLE `tab_pharmacie` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `ville` varchar(25) NOT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `quartier` varchar(50) NOT NULL,
  `numero` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tb_information`
--

CREATE TABLE `tb_information` (
  `id` bigint(20) NOT NULL,
  `sexe` varchar(25) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `date_symptomes` varchar(15) DEFAULT NULL,
  `consulter_medecin` varchar(5) DEFAULT NULL,
  `dianostiquer` varchar(200) DEFAULT NULL,
  `traitement` varchar(200) DEFAULT NULL,
  `jour_traitement` int(11) DEFAULT NULL,
  `lieu_traitement` varchar(100) DEFAULT NULL,
  `ville` varchar(15) DEFAULT NULL,
  `quartier_arrond` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tab_pharmacie`
--
ALTER TABLE `tab_pharmacie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_information`
--
ALTER TABLE `tb_information`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tab_pharmacie`
--
ALTER TABLE `tab_pharmacie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tb_information`
--
ALTER TABLE `tb_information`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
