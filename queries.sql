--CREATE DATABASE touristCapstone
--use touristCapstone

----------- TOURIST ATTRACTIONS

--CREATE TABLE Cities(CityID INT IDENTITY(1, 1) PRIMARY KEY, CityName NVARCHAR(MAX), CityRating DECIMAL(4, 2), StartMonthToVisit NVARCHAR(MAX), EndMonthToVisit NVARCHAR(MAX), 
--CityDesc NVARCHAR(MAX), CityImg VARBINARY(MAX), CityCoords NVARCHAR(MAX));

--CREATE TABLE Places(CityID INT FOREIGN KEY REFERENCES Cities(CityID), PlaceID INT IDENTITY(1, 1) PRIMARY KEY, PlaceName NVARCHAR(MAX), PlaceRating DECIMAL(4, 2), DistFromCity INT, 
--PlaceDesc NVARCHAR(MAX), PlaceImg VARBINARY(MAX), PlaceCoords NVARCHAR(MAX), OpeningHour TIME, ClosingHour TIME, Contact INT, Feedback NVARCHAR(MAX));

----------- USERS

--CREATE TABLE Users(UserID INT IDENTITY(1, 1) PRIMARY KEY, UserRole NVARCHAR(MAX), UserName NVARCHAR(MAX), UserRating DECIMAL(2, 1), Email NVARCHAR(MAX), Contact INT, [Password] NVARCHAR(MAX), AuthToken NVARCHAR(MAX));

--CREATE TABLE Bookings(UserEmail NVARCHAR(MAX), CityName NVARCHAR(MAX), 
--PlaceName NVARCHAR(MAX), PlaceRating DECIMAL(4, 2), PlaceImg VARBINARY(MAX), Contact INT, OpeningHour TIME, ClosingHour TIME, StartMonthToVisit NVARCHAR(MAX), 
--EndMonthToVisit NVARCHAR(MAX));
--drop table bookings;
-----------

--BULK INSERT Cities
--FROM 'C:\path\to\your\file.csv'
--WITH
--(
--    FORMAT = 'CSV',
--    FIRSTROW =  2, -- Assuming the first row contains column headers
--    FIELDTERMINATOR = ',', -- The character that separates fields in the CSV file
--    ROWTERMINATOR = '\n', -- The character that separates rows in the CSV file
--    TABLOCK -- Use a table lock during the bulk insert operation for better performance
--)

-----------