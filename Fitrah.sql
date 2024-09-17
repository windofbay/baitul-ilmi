create table Accounts(
	Username varchar(20) primary key not null,
	Password varchar(300) not null
)
create table Histories(
	Code varchar(20) primary key not null,
	MuzakkiName varchar(50) not null,
	Address varchar(50) not null,
	Date datetime not null,
	Quantity int,
	FitrahMoney money,
	FitrahRice decimal(6,2),
	InfaqMoney money,
	InfaqRice decimal(6,2),
	FidiyaMoney money,
	FidiyaRice decimal(6,2),
	MaalMoney money,
	MaalRice decimal(6,2),
	AmilUsername varchar(20) not null,
	Note varchar(500),

	Constraint FK_Histories_Accounts foreign key (AmilUsername) references dbo.Accounts(Username)
)

select * from Accounts
select * from Histories 

insert into Accounts
values ('lukman','$2a$12$MALsu8YWSchieRn6pO9q1ej2oXQwtk7obkwRx0RmdEDYCxNIuE25i'),
('mahadir','$2a$12$XLdkg.wutWwa6iSxGQ75femlCGV.M39x9fBMPTTWfIUHI5CY.UzOq'),
('gilang','$2a$12$DOinxis0X9puQgUoJjsx8ueEBPKVEc6rz8t6ej1tF56NfpDs8GQ26'),
('eky','$2a$12$IJlAwBXbgA1CVTA6x5.WkuE26QJGkyStWvm2ZBQ346PU.G6kpBEgi'),
('ihsan','$2a$12$b3N0nyo77vk.2CB74iT/gOujQwSZz00nb2R8PFQG9lrwvZiL1fsfu'),
('rangga','$2a$12$uXtrrONAa4BsGHFF4T81wONV7JkcxxH1v876p3AiCzesPrLfmJhsO'),
('bayu','$2a$12$NFae1zuwdSo7W4Xwn/hO4OIh10GTgQv2JOIpTFaI6nVKcMQeWiHia');

insert into Accounts
values ('amil2','$2a$12$HCy9CQ5QMblOxJ1/MnHMA./EXZ8d/hgjmiDkwjeTkpvqQNooatrRy')
pw amil1 : amilZakat25
pw amil2 : 345


drop table Histories



select distinct YEAR(Date) from Histories 

INSERT INTO Histories VALUES 
('RAF20240501245', 'Budi', 'RT002/01', '2024-09-25', 6, 220000, 21, 180000, 1, NULL, 2.8, NULL, NULL, 'amil1', null),
('RAF20240501246', 'Citra', 'RT003/01', '2024-10-11', 7, 250000, NULL, 220000, NULL, NULL, NULL, NULL, NULL, 'amil2', null),
('RAF20240501247', 'Dewi', 'RT004/01', '2024-08-30', 8, 180000, NULL, 230000, NULL, NULL, 3.7, NULL, NULL, 'amil1', null),
('RAF20240501248', 'Endang', 'RT005/01', '2024-11-03', 9, 240000, NULL, 210000, NULL, 70000, NULL, NULL, NULL, 'amil2', null),
('RAF20240501249', 'Faisal', 'RT006/01', '2024-12-07', 10, 260000, NULL, 200000, NULL, NULL, 4.5, NULL, NULL, 'amil1', null),
('RAF20240501250', 'Gita', 'RT007/01', '2024-07-19', 11, 280000, NULL, 210000, NULL, NULL, 3.2, NULL, NULL, 'amil2', null),
('RAF20240501251', 'Hadi', 'RT008/01', '2024-09-22', 12, NULL, 28, 190000, NULL, NULL, NULL, NULL, NULL, 'amil1', null),
('RAF20240501252', 'Indra', 'RT009/01', '2024-10-17', 13, 220000, NULL, 240000, 21, NULL, 3.6, 300000, NULL, 'amil2', null),
('RAF20240501253', 'Joko', 'RT010/01', '2024-12-05', 14, 260000, NULL, 180000, NULL, NULL, 4.0, NULL, NULL, 'amil1', null),
('RAF20240501254', 'Kurnia', 'RT011/01', '2024-08-28', 15, 280000, NULL, 200000, NULL, NULL, 4.2, NULL, NULL, 'amil2', null),
('RAF20240501255', 'Lia', 'RT001/01', '2024-11-01', 16, 300000, 35, 220000, NULL, NULL, 3.8, NULL, NULL, 'amil1', null),
('RAF20240501256', 'Mega', 'RT002/01', '2024-12-18', 17, 240000, NULL, 210000, NULL, NULL, 3.2, NULL, NULL, 'amil2', null),
('RAF20240501257', 'Nina', 'RT003/01', '2024-09-30', 18, 260000, NULL, 190000, NULL, NULL, 4.1, NULL, NULL, 'amil1', null),
('RAF20240501258', 'Oscar', 'RT004/01', '2024-11-22', 19, 280000, NULL, 220000, 7, NULL, NULL, NULL, NULL, 'amil2', null),
('RAF20240501259', 'Putri', 'RT005/01', '2024-07-03', 20, 300000, 14, 230000, NULL, NULL, 4.3, NULL, NULL, 'amil1', null),
('RAF20240501260', 'Qori', 'RT006/01', '2024-10-09', 21, 240000, NULL, 200000, NULL, NULL, 3.5, NULL, NULL, 'amil2', null),
('RAF20240501261', 'Rizki', 'RT007/01', '2024-08-15', 22, 260000, NULL, 220000, NULL, NULL, 2.8, NULL, NULL, 'amil1', null),
('RAF20240501262', 'Santi', 'RT008/01', '2024-12-04', 23, 280000, 7, 210000, NULL, NULL, 3.6, NULL, NULL, 'amil2', null),
('RAF20240501263', 'Tono', 'RT009/01', '2024-11-10', 24, 300000, NULL, 190000, 14, NULL, 4.0, 2000000, NULL, 'amil1', null),
('RAF20240501264', 'Uci', 'RT010/01', '2024-09-13', 25, 240000, NULL, 240000, NULL, NULL, 4.2, NULL, NULL, 'amil2', null),
('RAF20240501265', 'Vina', 'RT011/01', '2024-07-27', 26, 260000, NULL, 200000, NULL, NULL, 3.7, NULL, NULL, 'amil1', null);


INSERT INTO Histories VALUES 
('RAF20220501223', 'Budi', 'RT002/01', '2022-09-25', 6, 220000, NULL, 180000, NULL, NULL, 2.8, NULL, NULL, 'amil1', null),
('RAF20220501224', 'Citra', 'RT003/01', '2022-10-11', 7, 250000, NULL, 220000, NULL, NULL, 3.1, NULL, NULL, 'amil2', null),
('RAF20220501225', 'Dewi', 'RT004/01', '2022-08-30', 8, 180000, NULL, 230000, NULL, NULL, 3.7, NULL, NULL, 'amil1', null),
('RAF20220501226', 'Endang', 'RT005/01', '2022-11-03', 9, 240000, NULL, 210000, NULL, NULL, 3.9, NULL, NULL, 'amil2', null),
('RAF20220501227', 'Faisal', 'RT006/01', '2022-12-07', 10, 260000, NULL, 200000, NULL, NULL, 4.5, NULL, NULL, 'amil1', null),
('RAF20220501228', 'Gita', 'RT007/01', '2022-07-19', 11, 280000, NULL, 210000, NULL, NULL, 3.2, NULL, NULL, 'amil2', null),
('RAF20220501229', 'Hadi', 'RT008/01', '2022-09-22', 12, 300000, NULL, 190000, NULL, NULL, 2.9, NULL, NULL, 'amil1', null),
('RAF20220501230', 'Indra', 'RT009/01', '2022-10-17', 13, 220000, NULL, 240000, NULL, NULL, 3.6, NULL, NULL, 'amil2', null),
('RAF20220501231', 'Joko', 'RT010/01', '2022-12-05', 14, 260000, NULL, 180000, NULL, NULL, 4.0, NULL, NULL, 'amil1', null),
('RAF20220501232', 'Kurnia', 'RT011/01', '2022-08-28', 15, 280000, NULL, 200000, NULL, NULL, 4.2, NULL, NULL, 'amil2', null),
('RAF20220501233', 'Lia', 'RT001/01', '2022-11-01', 16, 300000, NULL, 220000, NULL, NULL, 3.8, NULL, NULL, 'amil1', null),
('RAF20220501234', 'Mega', 'RT002/01', '2022-12-18', 17, 240000, NULL, 210000, NULL, NULL, 3.2, NULL, NULL, 'amil2', null),
('RAF20220501235', 'Nina', 'RT003/01', '2022-09-30', 18, 260000, NULL, 190000, NULL, NULL, 4.1, NULL, NULL, 'amil1', null),
('RAF20220501236', 'Oscar', 'RT004/01', '2022-11-22', 19, 280000, NULL, 220000, NULL, NULL, 3.0, NULL, NULL, 'amil2', null),
('RAF20220501237', 'Putri', 'RT005/01', '2022-07-03', 20, 300000, NULL, 230000, NULL, NULL, 4.3, NULL, NULL, 'amil1', null),
('RAF20220501238', 'Qori', 'RT006/01', '2022-10-09', 21, 240000, NULL, 200000, NULL, NULL, 3.5, NULL, NULL, 'amil2', null),
('RAF20220501239', 'Rizki', 'RT007/01', '2022-08-15', 22, 260000, NULL, 220000, NULL, NULL, 2.8, NULL, NULL, 'amil1', null),
('RAF20220501240', 'Santi', 'RT008/01', '2022-12-04', 23, 280000, NULL, 210000, NULL, NULL, 3.6, NULL, NULL, 'amil2', null),
('RAF20220501241', 'Tono', 'RT009/01', '2022-11-10', 24, 300000, NULL, 190000, NULL, NULL, 4.0, NULL, NULL, 'amil1', null),
('RAF20220501242', 'Uci', 'RT010/01', '2022-09-13', 25, 240000, NULL, 240000, NULL, NULL, 4.2, NULL, NULL, 'amil2', null),
('RAF20220501243', 'Vina', 'RT011/01', '2022-07-27', 26, 260000, NULL, 200000, NULL, NULL, 3.7, NULL, NULL, 'amil1', null);


INSERT INTO Histories VALUES 
('RAF20230501223', 'Yudi', 'RT002/01', '2023-10-11', 7, 250000, NULL, 220000, NULL, NULL, 3.1, NULL, NULL, 'amil2', null),
('RAF20230501224', 'Fitra', 'RT003/01', '2024-08-30', 8, 180000, NULL, 230000, NULL, NULL, 3.7, NULL, NULL, 'amil1', null),
('RAF20230501225', 'Dewi', 'RT004/01', '2023-11-03', 9, NULL, 3.5, 210000, NULL, NULL, 3.9, NULL, NULL, 'amil2', null),
('RAF20230501226', 'Endah', 'RT005/01', '2023-12-07', 10, 260000, NULL, 200000, NULL, NULL, 4.5, NULL, NULL, 'amil1', null),
('RAF20230501227', 'Faisal', 'RT006/01', '2023-07-19', 11, 280000, NULL, 210000, NULL, NULL, 3.2, NULL, NULL, 'amil2', null),
('RAF20230501228', 'Gita', 'RT007/01', '2023-09-22', 12, 300000, NULL, 190000, NULL, NULL, 2.9, NULL, NULL, 'amil1', null),
('RAF20230501229', 'Adi', 'RT008/01', '2023-10-17', 13, 220000, NULL, 240000, NULL, NULL, 3.6, NULL, NULL, 'amil2', null),
('RAF20230501230', 'Indra', 'RT009/01', '2023-12-05', 14, NULL,35, 180000, NULL, NULL, 4.0, NULL, NULL, 'amil1', null),
('RAF20230501231', 'Jaka', 'RT010/01', '2023-08-28', 15, 280000, NULL, 200000, NULL, NULL, 4.2, NULL, NULL, 'amil2', null),
('RAF20230501232', 'Kurnia', 'RT011/01', '2023-11-01', 16, 300000, NULL, 220000, NULL, NULL, NULL, NULL, NULL, 'amil1', null),
('RAF20230501233', 'Lita', 'RT001/01', '2023-12-18', 17, 240000, NULL, 210000, NULL, NULL, 3.2, NULL, NULL, 'amil2', null),
('RAF20230501234', 'Mega', 'RT002/01', '2023-09-30', 18, 260000, NULL, 190000, NULL, NULL, 4.1, NULL, NULL, 'amil1', null),
('RAF20230501235', 'Nina', 'RT003/01', '2023-11-22', 19, NULL, 21, 220000, NULL, NULL, NULL, NULL, NULL, 'amil2', null),
('RAF20230501236', 'Oscar', 'RT004/01', '2023-07-03', 20, 300000, NULL, 230000, NULL, NULL, 4.3, NULL, NULL, 'amil1', null),
('RAF20230501237', 'Putra', 'RT005/01', '2023-10-09', 21, 240000, NULL, 200000, NULL, NULL, 3.5, NULL, NULL, 'amil2', null),
('RAF20230501238', 'Qori', 'RT006/01', '2023-08-15', 22, 260000, NULL, 220000, NULL, NULL, 2.8, NULL, NULL, 'amil1', null),
('RAF20230501239', 'Rizki', 'RT007/01', '2023-12-04', 23, NULL, 7, 210000, NULL, NULL, 3.6, NULL, NULL, 'amil2', null),
('RAF20230501240', 'Santi', 'RT008/01', '2023-11-10', 24, 300000, NULL, 190000, NULL, NULL, NULL, NULL, NULL, 'amil1', null),
('RAF20230501241', 'Toni', 'RT009/01', '2023-09-13', 25, 240000, NULL, 240000, NULL, NULL, 4.2, NULL, NULL, 'amil2', null),
('RAF20230501242', 'Uci', 'RT010/01', '2023-07-27', 26, NULL, 17.5, 200000, NULL, NULL, 3.7, NULL, NULL, 'amil1', null),
('RAF20230501243', 'Vina', 'RT011/01', '2023-10-31', 27, 280000, NULL, 220000, NULL, NULL, 3.3, NULL, NULL, 'amil2', null),
('RAF20230501244', 'Wira', 'RT001/01', '2024-12-20', 28, 300000, NULL, 210000, NULL, NULL, 4.1, NULL, NULL, 'amil1', null),
('RAF20230501245', 'Avanza', 'RT002/01', '2024-06-06', 29, NULL, 14, 190000, NULL, NULL, NULL, NULL, NULL, 'amil2', null),
('RAF20230501246', 'Yuni', 'RT003/01', '2024-10-12', 30, 260000, NULL, 220000, NULL, NULL, 4.3, NULL, NULL, 'amil1', null);


select count(1) from histories

select 
	[Date], 
	sum(Quantity) totalJiwa,
	sum(FitrahMoney) totalUangFitrah,
	sum(FitrahRice) totalBerasFitrah,
	sum(InfaqMoney) totalUangInfaq,
	sum(InfaqRice) totalBerasInfaq,
	sum(FidiyaMoney) totalUangFidiyah,
	sum(FidiyaRice) totalBerasFidiyah,
	sum(MaalMoney) totalUangMaal
from histories
group by [Date]
order by [Date]

select 
	sum(totalJiwa),
	sum(totalUangFidiyah),
	sum(totalBerasFitrah),
	sum(totalUangFidiyah),
	sum(totalBerasFidiyah),
	sum(totalUangInfaq),
	sum(totalBerasInfaq),
	sum(totalUangMaal)
from (
	select 
		[Date], 
		sum(Quantity) totalJiwa,
		sum(FitrahMoney) totalUangFitrah,
		sum(FitrahRice) totalBerasFitrah,
		sum(InfaqMoney) totalUangInfaq,
		sum(InfaqRice) totalBerasInfaq,
		sum(FidiyaMoney) totalUangFidiyah,
		sum(FidiyaRice) totalBerasFidiyah,
		sum(MaalMoney) totalUangMaal
	from histories
	group by [Date]
) as Recaps

select * from Histories

delete from Histories
where MuzakkiName ='Raisa'

delete from Accounts
where Username ='amil2'

select * from Recaps

insert into Recaps
values 
('2024-04-02', null),
('2024-04-03', null),
('2024-04-04', null),
('2024-04-05', null)