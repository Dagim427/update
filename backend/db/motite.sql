-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2025 at 05:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `motite`
--

-- --------------------------------------------------------

--
-- Table structure for table `contactmessage`
--

CREATE TABLE `contactmessage` (
  `ID` int(11) NOT NULL,
  `FullName` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Message` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_evalution`
--

CREATE TABLE `doctor_evalution` (
  `de_id` int(11) NOT NULL,
  `patient_id` varchar(50) NOT NULL,
  `hpi` varchar(255) DEFAULT NULL,
  `physical_exam` text NOT NULL,
  `lab_request` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `E_ID` int(11) NOT NULL,
  `First_name` char(25) DEFAULT NULL,
  `Last_name` char(25) DEFAULT NULL,
  `Sex` char(6) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `Role` char(25) DEFAULT NULL,
  `Phone_number` varchar(20) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `PASSWORD` varchar(100) DEFAULT NULL,
  `is_first_login` tinyint(1) DEFAULT 1,
  `status` enum('active','inactive') DEFAULT 'active',
  `otp_code` varchar(10) DEFAULT NULL,
  `otp_expiry` datetime DEFAULT NULL,
  `doctorSpecialties` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`E_ID`, `First_name`, `Last_name`, `Sex`, `DoB`, `Role`, `Phone_number`, `Email`, `PASSWORD`, `is_first_login`, `status`, `otp_code`, `otp_expiry`, `doctorSpecialties`) VALUES
(1, 'Dagim', 'Nega', 'Male', '2002-05-23', 'admin', '+251916456754', 'Dagi123@gmail.com', '$2b$10$7GWKCWThKi3IlSuKbjfyuu9o43q0zF.IBrz4NJHKQhCfSRHVZ4y22', 0, 'active', NULL, NULL, NULL),
(2, 'helen', 'alemu', 'female', '2001-01-12', 'clerk', '+251963434589', 'helen123@gmail.com', '$2b$10$WnRPzBc/0b.9mvipksJaIuI9Hl5qy9isixbGguiItH1dL/esCKsGG', 0, 'active', NULL, NULL, NULL),
(3, 'Abebe', 'kebede', 'male', '1970-01-01', 'triage room', '916835457', 'abe123@gmail.com', '$2b$10$hQlsfIsNOx/l5p.gmg6tiesk7EvXiKNOLOKEOnHSPiRQLrebkNXt.', 0, 'active', NULL, NULL, NULL),
(4, 'bereket', 'alemu', 'male', '1970-01-01', 'doctor', '912568792', 'beki123@gmail.com', '$2b$10$SiGjHDDnvsdLHTP6yvX/puNAvKbVaSKmU51fvIMvazOj6KQkw1ru2', 0, 'active', NULL, NULL, NULL),
(5, 'dada', 'baba', 'male', '2025-06-08', 'lab technician', '+251963434589', 'dagimnega1234@gmail.com', '$2b$10$SmOKge79kGqdtYooUdYYp.fqPEF2vVmlAzUqF.sDMGlaLawGp0AiK', 0, 'active', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lab`
--

CREATE TABLE `lab` (
  `lab_id` int(11) NOT NULL,
  `patient_id` varchar(50) NOT NULL,
  `lab_result` text NOT NULL,
  `additional_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lab_result_and_prescripiton`
--

CREATE TABLE `lab_result_and_prescripiton` (
  `lp_id` int(11) NOT NULL,
  `patient_id` varchar(50) NOT NULL,
  `diagnosis` text DEFAULT NULL,
  `medication` longtext DEFAULT NULL,
  `advice` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patient_address`
--

CREATE TABLE `patient_address` (
  `p_addr` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `city` char(25) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `patient_id` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patient_info`
--

CREATE TABLE `patient_info` (
  `patient_id` varchar(50) NOT NULL,
  `mrn` varchar(30) NOT NULL,
  `first_name` char(50) NOT NULL,
  `last_name` char(50) NOT NULL,
  `dob` date NOT NULL,
  `sex` enum('male','female') NOT NULL,
  `current_status` varchar(50) DEFAULT 'registered',
  `is_first_login` tinyint(1) DEFAULT 1,
  `otp_code` varchar(10) DEFAULT NULL,
  `otp_expiry` datetime DEFAULT NULL,
  `role` varchar(50) DEFAULT 'patient'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `symptoms`
--

CREATE TABLE `symptoms` (
  `sy_id` int(11) NOT NULL,
  `symptoms` varchar(255) NOT NULL,
  `duration_of_symptoms` varchar(50) NOT NULL,
  `pain_scale` int(11) NOT NULL,
  `vs_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `triage_assessment`
--

CREATE TABLE `triage_assessment` (
  `ta_id` int(11) NOT NULL,
  `level_of_consciousness` varchar(50) NOT NULL,
  `Priority_level` varchar(20) NOT NULL,
  `referred_to` varchar(50) NOT NULL,
  `sy_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `triage_initial_observations`
--

CREATE TABLE `triage_initial_observations` (
  `tio_id` int(11) NOT NULL,
  `allergies` varchar(150) NOT NULL,
  `Initial_observations` text DEFAULT NULL,
  `ta_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vital_signs`
--

CREATE TABLE `vital_signs` (
  `vs_id` int(11) NOT NULL,
  `patient_id` varchar(50) NOT NULL,
  `temperature` decimal(4,1) NOT NULL,
  `weight` decimal(4,1) NOT NULL,
  `blood_pressure` varchar(20) NOT NULL,
  `pulse_rate` int(11) DEFAULT NULL,
  `respiratory_rate` int(11) DEFAULT NULL,
  `blood_glucose_level` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contactmessage`
--
ALTER TABLE `contactmessage`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `doctor_evalution`
--
ALTER TABLE `doctor_evalution`
  ADD PRIMARY KEY (`de_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`E_ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `lab`
--
ALTER TABLE `lab`
  ADD PRIMARY KEY (`lab_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `lab_result_and_prescripiton`
--
ALTER TABLE `lab_result_and_prescripiton`
  ADD PRIMARY KEY (`lp_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `patient_address`
--
ALTER TABLE `patient_address`
  ADD PRIMARY KEY (`p_addr`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `patient_info`
--
ALTER TABLE `patient_info`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `symptoms`
--
ALTER TABLE `symptoms`
  ADD PRIMARY KEY (`sy_id`),
  ADD KEY `vs_id` (`vs_id`);

--
-- Indexes for table `triage_assessment`
--
ALTER TABLE `triage_assessment`
  ADD PRIMARY KEY (`ta_id`),
  ADD KEY `sy_id` (`sy_id`);

--
-- Indexes for table `triage_initial_observations`
--
ALTER TABLE `triage_initial_observations`
  ADD PRIMARY KEY (`tio_id`),
  ADD KEY `ta_id` (`ta_id`);

--
-- Indexes for table `vital_signs`
--
ALTER TABLE `vital_signs`
  ADD PRIMARY KEY (`vs_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contactmessage`
--
ALTER TABLE `contactmessage`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor_evalution`
--
ALTER TABLE `doctor_evalution`
  MODIFY `de_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `E_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `lab`
--
ALTER TABLE `lab`
  MODIFY `lab_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lab_result_and_prescripiton`
--
ALTER TABLE `lab_result_and_prescripiton`
  MODIFY `lp_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patient_address`
--
ALTER TABLE `patient_address`
  MODIFY `p_addr` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `symptoms`
--
ALTER TABLE `symptoms`
  MODIFY `sy_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `triage_assessment`
--
ALTER TABLE `triage_assessment`
  MODIFY `ta_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `triage_initial_observations`
--
ALTER TABLE `triage_initial_observations`
  MODIFY `tio_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vital_signs`
--
ALTER TABLE `vital_signs`
  MODIFY `vs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctor_evalution`
--
ALTER TABLE `doctor_evalution`
  ADD CONSTRAINT `doctor_evalution_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_info` (`patient_id`);

--
-- Constraints for table `lab`
--
ALTER TABLE `lab`
  ADD CONSTRAINT `lab_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_info` (`patient_id`);

--
-- Constraints for table `lab_result_and_prescripiton`
--
ALTER TABLE `lab_result_and_prescripiton`
  ADD CONSTRAINT `lab_result_and_prescripiton_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_info` (`patient_id`);

--
-- Constraints for table `patient_address`
--
ALTER TABLE `patient_address`
  ADD CONSTRAINT `patient_address_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_info` (`patient_id`);

--
-- Constraints for table `symptoms`
--
ALTER TABLE `symptoms`
  ADD CONSTRAINT `symptoms_ibfk_1` FOREIGN KEY (`vs_id`) REFERENCES `vital_signs` (`vs_id`);

--
-- Constraints for table `triage_assessment`
--
ALTER TABLE `triage_assessment`
  ADD CONSTRAINT `triage_assessment_ibfk_1` FOREIGN KEY (`sy_id`) REFERENCES `symptoms` (`sy_id`);

--
-- Constraints for table `triage_initial_observations`
--
ALTER TABLE `triage_initial_observations`
  ADD CONSTRAINT `triage_initial_observations_ibfk_1` FOREIGN KEY (`ta_id`) REFERENCES `triage_assessment` (`ta_id`);

--
-- Constraints for table `vital_signs`
--
ALTER TABLE `vital_signs`
  ADD CONSTRAINT `vital_signs_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient_info` (`patient_id`);
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
